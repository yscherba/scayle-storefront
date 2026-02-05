import type { Locator, Page } from '@playwright/test'
import { Base } from '../base/base'

/**
 * Page Object Model for the Filters component on Product Listing Pages (PLP).
 * Encapsulates locators and methods for interacting with various filter options
 * like price, color, size, and applying/resetting filters.
 */
export class Filters extends Base {
  // --- Filter Control & State Locators ---
  readonly filterButton: Locator
  readonly filterToggleCounter: Locator
  readonly closeFiltersButton: Locator
  readonly filterSectionHeadline: Locator
  readonly filterApplyButton: Locator
  readonly filterResetButton: Locator

  // --- Specific Filter Type Locators ---
  readonly filterColorChip: Locator
  readonly filterPriceInput: Locator
  readonly filterSizeCheckbox: Locator
  readonly filterSaleSwitch: Locator

  /**
   * Initializes the Filters Page Object.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    super(page)

    // Filter Controls
    this.closeFiltersButton = page.getByTestId('close-filters')
    this.filterApplyButton = page.getByTestId('apply-filter-button')
    this.filterResetButton = page.getByTestId('reset-filter-button')
    this.filterButton = page.getByTestId('filter-toggle-button')
    this.filterToggleCounter = page.getByTestId('filter-toggle-counter')

    // Specific Filters
    this.filterColorChip = page.getByTestId('filter-color-chip')
    this.filterSectionHeadline = page.getByTestId('headline')
    this.filterPriceInput = page.getByTestId('price-input')
    this.filterSizeCheckbox = page.getByTestId('checkbox-chip')
    this.filterSaleSwitch = page.getByRole('switch')
  }

  // --- Private Helper Locators ---

  /**
   * Returns a locator for a specific size checkbox filter based on its value.
   * This is a helper method used internally for selecting specific size options.
   * @param value - The value of the size filter (e.g., 40, S, M).
   * @returns A Playwright Locator for the specific size checkbox.
   */
  private filterSizeCheckboxValue(value: number): Locator {
    return this.page.locator(
      `input[data-testid='checkbox-chip'][value="${value}"]`,
    )
  }

  // --- Action Methods ---

  /**
   * Opens the filters flyout by clicking the filter toggle button.
   * Handles selection of the correct button for mobile or desktop.
   */
  async openFilters() {
    const targetFilterButton = this.filterButton.nth(
      this.responsiveElementIndex,
    )

    await targetFilterButton.waitFor({ timeout: 2000 })
    await targetFilterButton.click()
    await this.page.waitForLoadState('domcontentloaded')
  }
}
