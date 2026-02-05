import type { Locator, Page } from '@playwright/test'
import { Base } from './base/base'

/**
 * Page Object Model for the Sign-In and Registration Page.
 * Encapsulates locators and methods for interacting with user login,
 * new user registration, and password reset functionalities.
 */
export class SignInPage extends Base {
  // --- Login Form Locators ---
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly loginErrorMessageContainer: Locator
  readonly loginTab: Locator
  readonly loginForm: Locator

  // --- Registration Form Locators ---
  readonly registerTab: Locator
  readonly regGenderSelector: Locator
  readonly regInputFirstName: Locator
  readonly regInputLastName: Locator
  readonly regInputEmailAddress: Locator
  readonly regInputPassword: Locator
  readonly registerButton: Locator
  readonly registerForm: Locator
  readonly registerErrorMessageContainer: Locator
  readonly registerGuestSwitch: Locator
  readonly registerGuestInfo: Locator

  // --- Password Toggle Locators ---
  readonly passwordToggleShow: Locator
  readonly passwordToggleHide: Locator

  // --- Password Reset / Forgot Password Locators ---
  readonly resetPasswordButton: Locator
  readonly closePasswordResetFlyoutButton: Locator
  readonly resetPasswordEmailInput: Locator
  readonly resetPasswordBackToLoginButton: Locator
  readonly resetPasswordGetResetLinkButton: Locator
  readonly resetPasswordHeadline: Locator
  readonly forgotPasswordErrorMessageContainer: Locator
  readonly newPasswordInput: Locator
  readonly validationErrorText: Locator
  readonly resetPasswordErrorMessageContainer: Locator
  readonly submitNewPasswordButton: Locator

  // --- User Popover / Header Elements (after login) ---
  readonly greetingUserFirstName: Locator
  readonly userPopoverEmail: Locator
  readonly userPopoverLogoutButton: Locator

  // --- Generic Page Elements / Links ---
  readonly h1: Locator
  readonly pageTitle: Locator
  readonly createAccountLabel: Locator
  readonly signinPageLink: Locator
  readonly privacyDisclaimerInfo: Locator
  readonly termsOfServiceLink: Locator
  readonly privacyPolicyLink: Locator
  readonly loginPageLink: Locator

  /**
   * Initializes the SignInPage Page Object.
   * @param page - The Playwright Page object.
   */
  constructor(page: Page) {
    super(page)

    // Login Form
    this.emailInput = page.getByTestId('login-email')
    this.passwordInput = page.getByTestId('login-password')
    this.loginButton = page.getByTestId('login-submit')
    this.loginErrorMessageContainer = page.getByTestId(
      'login-error-message-container',
    )
    this.loginTab = page.getByTestId('login-form-tab-0')
    this.loginForm = page.getByTestId('login-form')

    // Registration Form
    this.registerTab = page.getByTestId('login-form-tab-1')
    this.regGenderSelector = page.getByTestId('gender-selection')
    this.regInputFirstName = page.getByTestId('reg-input-first-name')
    this.regInputLastName = page.getByTestId('reg-input-last-name')
    this.regInputEmailAddress = page.getByTestId('reg-input-email-address')
    this.regInputPassword = page.getByTestId('reg-input-password')
    this.registerButton = page.getByTestId('register-submit')
    this.registerForm = page.getByTestId('register-form')
    this.registerErrorMessageContainer = page.getByTestId(
      'register-error-message-container',
    )
    this.registerGuestSwitch = page.getByTestId('register-guest-switch')
    this.registerGuestInfo = page.getByTestId('register-guest-info')

    // Password Toggle
    this.passwordToggleShow = page.getByTestId('password-toggle-show')
    this.passwordToggleHide = page.getByTestId('password-toggle-hide')

    // Password Reset / Forgot Password
    this.resetPasswordButton = page.getByTestId('reset-password-button')
    this.closePasswordResetFlyoutButton = page.getByTestId(
      'close-forgot-password-slide-in',
    )
    this.resetPasswordEmailInput = page.getByTestId('forgot-password-email')
    this.resetPasswordBackToLoginButton = page.getByTestId(
      'back-to-login-button',
    )
    this.resetPasswordGetResetLinkButton = page.getByTestId(
      'get-reset-password-link-button',
    )
    this.resetPasswordHeadline = page.getByTestId('reset-password-headline')
    this.forgotPasswordErrorMessageContainer = page.getByTestId(
      'forgot-password-error-message-container',
    )
    this.newPasswordInput = page.getByTestId('new-password')
    this.validationErrorText = page.getByTestId('validation-error-text')
    this.resetPasswordErrorMessageContainer = page.getByTestId(
      'reset-password-error-message-container',
    )
    this.submitNewPasswordButton = page.getByTestId('submit-new-password')

    // User Popover / Header Elements
    this.greetingUserFirstName = page.getByTestId('greeting-user-firstname')
    this.userPopoverEmail = page.getByTestId('user-popover-email')
    this.userPopoverLogoutButton = page.getByTestId(
      'user-popover-logout-button',
    )

    // Generic Page Elements / Links
    this.h1 = page.locator('h1')
    this.pageTitle = page.getByTestId('headline')
    this.createAccountLabel = page.getByTestId('create-account-label')
    this.signinPageLink = page.getByTestId('signin-page-link')
    this.privacyDisclaimerInfo = page.getByTestId('privacy-disclaimer-info')
    this.termsOfServiceLink = page.getByTestId('terms-of-service-link')
    this.privacyPolicyLink = page.getByTestId('privacy-policy-link')
    this.loginPageLink = page.getByTestId('login-page-link')
  }

  // --- Private Helper Methods ---

  /**
   * Returns a Locator for a specific gender option within the gender selection component.
   * This is a helper method used internally by `selectGender`.
   * @param gender - The gender code (e.g., 'f' for female, 'm' for male).
   * @returns A Playwright Locator for the specific gender option.
   */
  private genderOption(gender: string): Locator {
    return this.page.getByTestId(`gender-option-${gender}`)
  }

  // --- Action Methods ---

  /**
   * Fills in the email and password fields on the login form.
   * @param email - The email address to enter.
   * @param password - The password to enter.
   */
  async fillLoginData(email: string, password: string) {
    await this.emailInput.focus()
    await this.emailInput.fill(email)
    await this.passwordInput.focus()
    await this.passwordInput.fill(password)
  }

  /**
   * Clicks the login button and waits for the page to load.
   * Includes a short timeout to allow for potential asynchronous operations.
   */
  async clickLoginButton() {
    await this.loginButton.click()
    await this.page.waitForTimeout(500)
    await this.page.waitForLoadState('domcontentloaded')
  }

  /**
   * Selects a gender option during registration.
   * @param gender - The gender code to select (e.g., 'f' for female, 'm' for male).
   */
  async selectGender(gender: string) {
    await this.regGenderSelector.waitFor()
    await this.regGenderSelector.click()
    await this.genderOption(gender).waitFor()
    await this.genderOption(gender).click()
  }

  /**
   * Fills in the registration form fields for a new user.
   * @param firstName - The first name for registration.
   * @param lastName - The last name for registration.
   * @param emailAddress - The email address for registration.
   * @param password - The password for registration.
   */
  async fillRegistrationData(
    firstName: string,
    lastName: string,
    emailAddress: string,
    password: string,
  ) {
    await this.regInputFirstName.waitFor()
    await this.regInputFirstName.focus()
    await this.regInputFirstName.fill(firstName)

    await this.regInputLastName.focus()
    await this.regInputLastName.fill(lastName)

    await this.regInputEmailAddress.focus()
    await this.regInputEmailAddress.fill(emailAddress)

    await this.regInputPassword.focus()
    await this.regInputPassword.fill(password)
  }
}
