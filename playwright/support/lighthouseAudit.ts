/**
 * Utilities for running Lighthouse audits within Playwright E2E tests.
 * Handles launching a Chromium instance, running Lighthouse multiple times for stability,
 * and saving a cleaned report for further analysis or CI artifacts.
 */
import fs from 'node:fs'
import lighthouse from 'lighthouse/core/index.cjs'
import { chromium } from 'playwright'
import type { OutputMode } from '../fixtures/fixtures'

/** Number of times to run Lighthouse to reduce flakiness from single-run outliers */
const LIGHTHOUSE_AUDIT_RUN_COUNT = 3
/** Viewport width threshold to determine mobile vs desktop emulation */
const LIGHTHOUSE_MOBILE_VIEWPORT_THRESHOLD = 480
const LIGHTHOUSE_VIEWPORT_HEIGHT = 800

/**
 * Runs a Lighthouse audit against a given URL using Playwright's Chromium instance.
 * Aggregates results over several runs for more stable metrics, and saves a report for the first run.
 *
 * @param url - The base URL to audit (should include protocol and host)
 * @param auditedPage - A string identifier for the page, used in the report filename
 * @param viewportWidth - The viewport width to use for emulation (determines mobile/desktop)
 * @returns An object with average scores for performance, accessibility, SEO, and best practices
 */
export const runLighthouseAudit = async (
  url: URL,
  auditedPage: string,
  viewportWidth: number,
) => {
  // Store scores for each run to later calculate averages
  const scores: {
    performance: number[]
    accessibility: number[]
    seo: number[]
    bestPractices: number[]
  } = {
    performance: [],
    accessibility: [],
    seo: [],
    bestPractices: [],
  }

  // Launch the browser only once for all runs
  const browser = await chromium.launch({
    headless: true,
    args: ['--remote-debugging-port=9015'], // Required for Lighthouse to connect
  })

  try {
    for (let i = 0; i < LIGHTHOUSE_AUDIT_RUN_COUNT; i++) {
      // Create a new context for each run to avoid state leakage
      const browserContext = await browser.newContext({
        viewport: {
          width: viewportWidth,
          height: LIGHTHOUSE_VIEWPORT_HEIGHT,
        },
      })
      const page = await browserContext.newPage()

      // Configure Lighthouse options for this run
      const lhOptions = {
        port: 9015, // Must match the debugging port above
        output: ['json', 'html'] as OutputMode[],
        chromeFlags: ['--incognito'], // Avoids caching and cookies
        extraHeaders: {
          // Bypass Vercel protection for CI environments
          'x-vercel-protection-bypass':
            process.env.VERCEL_AUTOMATION_BYPASS_SECRET ?? '',
          'x-vercel-set-bypass-cookie': 'true',
        },
        emulatedFormFactor:
          viewportWidth <= LIGHTHOUSE_MOBILE_VIEWPORT_THRESHOLD
            ? 'mobile'
            : 'desktop',
        screenEmulation: {
          width: viewportWidth,
          height: LIGHTHOUSE_VIEWPORT_HEIGHT,
          deviceScaleFactor: 1,
          disabled: false,
        },
      }

      // Clone the URL and add query params to bypass Vercel protection
      const fullAuditUrl = new URL(url)
      fullAuditUrl.searchParams.append(
        'x-vercel-protection-bypass',
        process.env.VERCEL_AUTOMATION_BYPASS_SECRET || '',
      )
      fullAuditUrl.searchParams.append('x-vercel-set-bypass-cookie', 'true')

      // Navigate to the page and wait for the initial commit
      await page.goto(fullAuditUrl.toString(), { waitUntil: 'commit' })
      // Run Lighthouse against the loaded page
      const runnerResult = await lighthouse(page.url(), lhOptions)

      // Only save the report for the first run to avoid redundant files
      if (i === 0) {
        try {
          const filename = `./lighthouse-reports/lighthouse-report-${auditedPage}.json`

          // Ensure the output directory exists (important for CI and fresh environments)
          fs.mkdirSync('./lighthouse-reports', { recursive: true })

          // Remove large artifacts to keep the report file size manageable
          const cleanedResult = JSON.parse(JSON.stringify(runnerResult))
          delete cleanedResult.artifacts

          fs.writeFileSync(filename, JSON.stringify(cleanedResult, null, 2))
        } catch (err) {
          // Log but do not fail the test if report saving fails
          console.error('Error saving Lighthouse report:', err)
        }
      }

      if (runnerResult && runnerResult.lhr) {
        // Lighthouse scores are between 0 and 1; collect for averaging
        scores.performance.push(
          runnerResult.lhr.categories.performance.score as number,
        )
        scores.accessibility.push(
          runnerResult.lhr.categories.accessibility.score as number,
        )
        scores.seo.push(runnerResult.lhr.categories.seo.score as number)
        scores.bestPractices.push(
          runnerResult.lhr.categories['best-practices'].score as number,
        )
      } else {
        // Fail fast if Lighthouse did not return a valid result
        console.error(
          'Lighthouse audit failed or did not return a valid result.',
        )
        throw new Error('Lighthouse audit failed')
      }

      await browserContext.close()
    }
  } catch (error) {
    // Propagate errors to fail the test, but ensure browser is closed
    console.error('Error running Lighthouse audit:', error)
    throw error
  } finally {
    await browser.close()
  }

  // Return the average scores across all runs for stability
  return {
    performance: calculateAverage(scores.performance),
    accessibility: calculateAverage(scores.accessibility),
    seo: calculateAverage(scores.seo),
    bestPractices: calculateAverage(scores.bestPractices),
  }
}

/**
 * Calculates the average of an array of numbers.
 * Returns 0 if the array is empty (should not happen in normal use).
 *
 * @param scores - Array of numeric scores
 * @returns The average value
 */
function calculateAverage(scores: number[]): number {
  if (scores.length === 0) {
    return 0
  }

  const sum = scores.reduce((a, b) => a + b, 0)

  return sum / scores.length
}
