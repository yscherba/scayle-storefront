import { expect } from '@playwright/test'
import { test } from '../../fixtures/fixtures'
import { runLighthouseAudit } from '../../support/lighthouseAudit'
import {
  LIGHTHOUSE_AUDIT_PATHS,
  LIGHTHOUSE_THRESHOLDS,
  LIGHTHOUSE_VIEWPORT_SIZE,
} from '../../support/constants'

test.describe.configure({ mode: 'serial', timeout: 120000, retries: 0 })

test('C2139576: Lighthouse audit for PDP', async ({ baseURL }) => {
  const pdpUrl = new URL(LIGHTHOUSE_AUDIT_PATHS.pdp, baseURL)

  const averageScores = await runLighthouseAudit(
    pdpUrl,
    'pdp',
    LIGHTHOUSE_VIEWPORT_SIZE,
  )

  expect(averageScores.performance).toBeGreaterThanOrEqual(
    LIGHTHOUSE_THRESHOLDS.performance / 100,
  )
  expect(averageScores.accessibility).toBeGreaterThanOrEqual(
    LIGHTHOUSE_THRESHOLDS.accessibility / 100,
  )
  expect(averageScores.seo).toBeGreaterThanOrEqual(
    LIGHTHOUSE_THRESHOLDS.seo / 100,
  )
  expect(averageScores.bestPractices).toBeGreaterThanOrEqual(
    LIGHTHOUSE_THRESHOLDS.bestPractices / 100,
  )
})
