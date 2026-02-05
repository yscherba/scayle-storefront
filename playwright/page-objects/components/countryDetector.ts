import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { Base } from '../base/base'

/**
 * Page Object Model for the Country Detector modal.
 * Encapsulates locators and methods for interacting with and asserting states of
 * the country/shop selection popup that might appear on first visit.
 */
export class CountryDetector extends Base {
  // --- Country Detector Elements ---
  readonly closeButton: Locator
  readonly switchShopButton: Locator
  readonly stayInShopButton: Locator

  /**
   * Initializes the CountryDetector Page Object.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    super(page)

    this.closeButton = page.getByTestId('close-button')
    this.switchShopButton = page.getByTestId('button-switch-shop')
    this.stayInShopButton = page.getByTestId('button-stay-in-shop')
  }

  // --- Action Methods ---

  /**
   * Attempts to close the Country Detector modal if it is visible.
   * Waits for the page to be stable before checking for the button.
   * Handles cases where the modal might not be present by continuing execution.
   */
  async closeModal() {
    try {
      await this.page.waitForLoadState('networkidle')

      if (await this.closeButton.first().isVisible()) {
        await this.closeButton.first().click()
        await expect(this.closeButton.first()).toBeHidden()
        await this.page.waitForLoadState('networkidle')
      }
    } catch (error) {
      console.error('Error closing modal:', error)
    }
  }
}
