import type { Locator, Page } from '@playwright/test'
import { expect } from '@playwright/test'
import { Base } from './base/base'

/**
 * Page Object Model for the Product Detail Page (PDP).
 * Encapsulates locators and methods for interacting with and asserting states on
 * individual product pages, including variant selection, basket/wishlist actions,
 * and store availability.
 */
export class ProductDetailPage extends Base {
  // --- Core Product Information Locators ---
  readonly productImage: Locator
  readonly productBrand: Locator
  readonly productName: Locator
  readonly priceRegular: Locator
  readonly taxInfo: Locator
  readonly h1: Locator
  readonly pageTitle: Locator

  // --- Variant Selection Locators ---
  readonly variantPicker: Locator
  readonly itemStatus: Locator

  // --- Quantity Selector Locators ---
  readonly quantityValue: Locator
  readonly quantityMinus: Locator
  readonly quantityPlus: Locator

  // --- Basket / Wishlist Actions Locators ---
  readonly addToBasketButton: Locator
  readonly addToBasketButtonMobile: Locator
  readonly buttonAddToWishlist: Locator
  readonly buttonRemoveFromWishlist: Locator

  // --- Subscription Service Locators ---
  readonly subscriptionService: Locator
  readonly addToBasketButtonSubscribe: Locator

  // --- Store Availability / Store Selector Locators ---
  readonly variantAvailabilityComponent: Locator
  readonly storeAvailabilityHeadline: Locator
  readonly storeAvailabilitySubline: Locator
  readonly buttonOpenStoreFlyout: Locator
  readonly storeSelectorSlideIn: Locator
  readonly storeInput: Locator
  readonly buttonSearchStore: Locator
  readonly locationStoreList: Locator
  readonly locationStoreListItem: Locator
  readonly buttonChooseStore: Locator
  readonly storeName: Locator

  /**
   * Initializes the ProductDetailPage Page Object.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    super(page)

    // Core Product Information
    this.addToBasketButton = page.getByTestId('add-item-to-basket-button')
    this.productImage = page.getByTestId('product-image')
    this.productBrand = page.getByTestId('pdp-product-brand')
    this.productName = page.getByTestId('pdp-product-name')
    this.priceRegular = page.getByTestId('price')
    this.taxInfo = page.getByTestId('tax-info')
    this.h1 = page.locator('h1')
    this.pageTitle = page.getByTestId('pdp-product-brand')

    // Variant Selection
    this.variantPicker = page.getByTestId('variant-picker').getByRole('button')
    this.itemStatus = page.getByTestId('item-status')

    // Quantity Selector
    this.quantityValue = page.getByTestId('quantity-value')
    this.quantityMinus = page.getByTestId('quantity-minus')
    this.quantityPlus = page.getByTestId('quantity-plus')

    // Basket / Wishlist Actions
    this.addToBasketButtonMobile = page.getByTestId(
      'add-to-basket-button-mobile',
    )
    this.buttonAddToWishlist = page.getByTestId('add-item-to-wishlist-button')
    this.buttonRemoveFromWishlist = page.getByTestId(
      'remove-item-from-wishlist-button',
    )

    // Subscription Service
    this.subscriptionService = page.getByTestId('subscription-service')
    this.addToBasketButtonSubscribe = page.getByTestId(
      'add-item-to-basket-button-subscribe',
    )

    // Store Availability / Store Selector
    this.variantAvailabilityComponent = page.getByTestId(
      'store-variant-availability-component',
    )
    this.storeAvailabilityHeadline = page.getByTestId(
      'store-availability-headline',
    )
    this.storeAvailabilitySubline = page.getByTestId(
      'store-availability-subline',
    )
    this.buttonOpenStoreFlyout = page.getByTestId('button-open-store-flyout')
    this.storeSelectorSlideIn = page.getByTestId('slide-in-overflow')
    this.storeInput = page.getByTestId('store-input')
    this.buttonSearchStore = page.getByTestId('search-store-button')
    this.locationStoreList = page.getByTestId('location-store-list')
    this.locationStoreListItem = page.getByTestId('location-store-list-item')
    this.buttonChooseStore = page.getByTestId('choose-store-button')
    this.storeName = page.getByTestId('store-name')
  }

  // --- Private Helper Methods ---

  /**
   * Returns a Locator for a specific product variant option (e.g., a size).
   * @param variantId - Optional: The data-testid of the specific variant option (e.g., 'variant-option-123').
   * If not provided, selects the first non-disabled variant option.
   * @returns A Playwright Locator for the product variant option.
   */
  getVariant(variantId?: string): Locator {
    const selector = variantId
      ? `button[data-testid="variant-option-${variantId}"]`
      : 'button[data-testid^="variant-option-"]:not([disabled])'

    return this.page.locator(selector).first()
  }

  /**
   * Returns the correct "Add to Wishlist" button Locator based on device type.
   * @returns A Playwright Locator for the Add to Wishlist button.
   */
  private getAddToWishlistButton(): Locator {
    const index = this.responsiveElementIndex === 1 ? 0 : 1
    return this.buttonAddToWishlist.nth(index)
  }

  /**
   * Returns the correct "Remove from Wishlist" button Locator based on device type.
   * @returns A Playwright Locator for the Remove from Wishlist button.
   */
  private getRemoveFromWishlistButton(): Locator {
    const index = this.responsiveElementIndex === 1 ? 0 : 1
    return this.buttonRemoveFromWishlist.nth(index)
  }

  // --- Action Methods ---

  /**
   * Adds the currently displayed product to the basket via UI interaction.
   * Chooses the appropriate "Add to Basket" button based on device type.
   */
  async addProductToBasket() {
    const targetButton = this.isMobileViewport
      ? this.addToBasketButtonMobile
      : this.addToBasketButton

    await targetButton.waitFor()
    await targetButton.click()
  }

  /**
   * Adds the current product to the wishlist.
   */
  async addProductToWishlist() {
    await this.getAddToWishlistButton().click()
  }

  /**
   * Removes the current product from the wishlist.
   */
  async removeProductFromWishlist() {
    await this.getRemoveFromWishlistButton().click()
  }

  /**
   * Types a store name into the store search input field within the store selector flyout.
   * @param store - The name of the store to type.
   */
  async typeStoreName(store: string) {
    await this.storeInput.waitFor()
    await this.storeInput.focus()
    await this.storeInput.fill(store)
    await this.page.waitForTimeout(100)
  }

  /**
   * Determines and selects a product variant based on the state of the variant picker.
   * If the variant picker is disabled (implying a single, pre-selected variant like one-size),
   * no action is taken. If it's enabled, the method clicks the picker to open the dropdown
   * and selects the first available (non-disabled) product variant.
   */
  async chooseProductVariant() {
    const isVariantPickerDisabled = await this.variantPicker.isDisabled()

    if (!isVariantPickerDisabled) {
      await this.variantPicker.click({ force: true })
      await this.getVariant().click()
    }
  }

  // --- Assertion Methods ---

  /**
   * Asserts the visibility of the "Add to Wishlist" icon and the non-visibility
   * of the "Remove from Wishlist" icon, based on device type.
   */
  async assertAddToWishlistIconVisibility() {
    const targetAddButton = this.getAddToWishlistButton()
    const targetRemoveButton = this.getRemoveFromWishlistButton()

    await targetAddButton.waitFor()
    await expect(targetAddButton).toBeVisible()
    await expect(targetRemoveButton).not.toBeVisible()
  }

  /**
   * Asserts the visibility of the "Remove from Wishlist" icon and the non-visibility
   * of the "Add to Wishlist" icon, based on device type.
   */
  async assertRemoveFromWishlistIconVisibility() {
    const targetRemoveButton = this.getRemoveFromWishlistButton()
    const targetAddButton = this.getAddToWishlistButton()

    await targetRemoveButton.waitFor()
    await expect(targetRemoveButton).toBeVisible()
    await expect(targetAddButton).not.toBeVisible()
  }

  /**
   * Asserts the visibility of the main store selector component.
   * @param visible - True if the component is expected to be visible, false otherwise.
   */
  async assertStoreSelectorIsVisible(visible: boolean) {
    await expect(this.variantAvailabilityComponent).toBeVisible({ visible })
  }

  /**
   * Asserts the visibility of the store selector flyout/slide-in panel.
   * @param visible - True if the flyout is expected to be visible, false otherwise.
   */
  async assertStoreSelectorFlyoutIsVisible(visible: boolean) {
    await this.storeSelectorSlideIn.first().waitFor()
    await expect(this.storeSelectorSlideIn.first()).toBeVisible({ visible })
  }
}
