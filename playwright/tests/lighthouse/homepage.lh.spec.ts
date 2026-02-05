import { expect } from '@playwright/test'
import { test } from '../../fixtures/fixtures'
import { runLighthouseAudit } from '../../support/lighthouseAudit'
import {
  LIGHTHOUSE_THRESHOLDS,
  LIGHTHOUSE_VIEWPORT_SIZE,
} from '../../support/constants'

test.describe.configure({ mode: 'serial', timeout: 120000, retries: 0 })

test('C2139574: Lighthouse audit for Homepage', async ({ baseURL }) => {
  const homepageUrl = new URL('/', baseURL)

  const averageScores = await runLighthouseAudit(
    homepageUrl,
    'homepage',
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
