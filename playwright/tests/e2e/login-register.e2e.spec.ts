import { expect } from '@playwright/test'
import { test } from '../../fixtures/fixtures'
import { isMobile, verifySeoMetaTags } from '../../support/utils'
import {
  TEST_USERS,
  LOGIN_REGISTRATION,
  SIGNIN_URL,
  USER_ACCOUNT,
  ROUTES,
  TEST_PASSWORD_RESET_HASH,
} from '../../support/constants'

/**
 * @file Contains end-to-end tests related to user login and registration functionality.
 */

/**
 * Performs setup before each test case within this file.
 * It navigates to the homepage, waits for the network to be idle,
 * and closes the country detector modal if present.
 */
test.beforeEach(async ({ homePage, page, countryDetector }) => {
  await homePage.navigate(page, '/', 'networkidle')
  await page.waitForLoadState('networkidle')
  await countryDetector.closeModal()
})

/**
 * Verifies the user login and logout flow.
 *
 * Prerequisites for this test:
 * - A registered user account with valid credentials.
 * - The email address for this user must be defined via `TEST_USER_EMAIL1` environment variable
 * (e.g., "sfb.aqa1@testsystem.com").
 * - The password for this user must be defined via `TEST_USER_PASSWORD` environment variable.
 * The password should have a minimum length of 8 characters and include at least one
 * special character, one uppercase letter, one lowercase letter, and one number.
 */
test('C2130648 C2171377 Verify User login and log out', async ({
  signinPage,
  header,
  toastMessage,
  page,
  ordersPage,
  mobileNavigation,
}) => {
  await test.step('Log in', async () => {
    await header.headerLoginButton.click()
    await signinPage.fillLoginData(
      TEST_USERS.testUserEmail1,
      TEST_USERS.testUserPassword,
    )
    await signinPage.clickLoginButton()
    await toastMessage.assertToastInfoIsVisible()
    await toastMessage.clickToastMessageButton()
    await page.waitForLoadState('domcontentloaded')
    await header.headerLoginButton.click()
    await ordersPage.ordersHeadline.waitFor()
    expect(page.url()).toContain(USER_ACCOUNT.routeOrders)
  })
  await test.step('Log out', async () => {
    if (isMobile(page)) {
      await mobileNavigation.sideNavigationButton.click()
      await mobileNavigation.logoutButton.waitFor()
      await mobileNavigation.logoutButton.click()
    } else {
      await header.headerLoginButton.focus()
      await header.headerLoginButton.press('Space')
      await signinPage.userPopoverLogoutButton.click()
    }

    await page.waitForLoadState('domcontentloaded')
  })
})

/**
 * Verifies the user login with invalid credentials.
 *
 * Prerequisites for this test:
 * - The email address is defined in constant key `TEST_USERS.nonExistingEmail` as a correctly formatted dummy e-mail address.
 * - The password for this user must be defined via `TEST_USER_PASSWORD` environment variable.
 * The password should have a minimum length of 8 characters and include at least one
 * special character, one uppercase letter, one lowercase letter, and one number.
 */
test('C2130649 Verify User login with wrong credentials', async ({
  signinPage,
  header,
}) => {
  await expect(async () => {
    await header.headerLoginButton.click()
    await signinPage.fillLoginData(
      TEST_USERS.nonExistingEmail,
      TEST_USERS.wrongPassword,
    )

    await signinPage.clickLoginButton()
    await signinPage.loginErrorMessageContainer.waitFor()
    await expect(signinPage.loginErrorMessageContainer).toBeVisible()
  }).toPass()
})

/**
 * Verifies that attempting to register a user with an email
 * address that is already associated with an existing account displays
 * an error message and does not register the user.
 *
 * Prerequisites for this test:
 * - A registered user account with valid credentials.
 * - The email address for this user must be defined via `TEST_USER_EMAIL1` environment variable
 * (e.g., "sfb.aqa1@testsystem.com").
 * - The password for this user must be defined via `TEST_USER_PASSWORD` environment variable.
 * The password should have a minimum length of 8 characters and include at least one
 * special character, one uppercase letter, one lowercase letter, and one number.
 */
test('C2171373 Verify User registration with already registered user account', async ({
  signinPage,
  header,
  page,
}) => {
  await test.step('Open Signin page and switch to Register tab', async () => {
    await header.headerLoginButton.waitFor()
    await header.headerLoginButton.click()
    await signinPage.registerTab.waitFor()
    await signinPage.registerTab.click()
    await signinPage.registerForm.waitFor()
  })
  await test.step('Fill and submit register form', async () => {
    await signinPage.selectGender('f')
    await signinPage.fillRegistrationData(
      TEST_USERS.firstNameRegUser,
      TEST_USERS.lastNameRegUser,
      TEST_USERS.testUserEmail1,
      TEST_USERS.testUserPassword,
    )
    await signinPage.registerButton.click()
  })
  await test.step('Assert error banner is visible and user is not logged in', async () => {
    await signinPage.registerErrorMessageContainer.waitFor()
    await expect(signinPage.registerErrorMessageContainer).toBeVisible()
    await page.waitForLoadState('networkidle')
    await signinPage.loginTab.click()
    await expect(signinPage.loginButton).toBeVisible()
  })
})

/**
 * Verifies that the password toggle button on the registration
 * form correctly shows and hides the entered password, changing the input type.
 *
 * Prerequisites for this test:
 * - The password for this user must be defined via `TEST_USER_PASSWORD` environment variable.
 * The password should have a minimum length of 8 characters and include at least one
 * special character, one uppercase letter, one lowercase letter, and one number.
 */
test('C2171375 Verify User registration password toggle button', async ({
  signinPage,
  header,
}) => {
  await header.headerLoginButton.waitFor()
  await header.headerLoginButton.click()
  await signinPage.registerTab.waitFor()
  await signinPage.registerTab.click()
  await signinPage.registerForm.waitFor()

  await signinPage.regInputPassword.focus()
  await signinPage.regInputPassword.fill(TEST_USERS.testUserPassword)
  await expect(signinPage.passwordToggleShow).toBeVisible()
  await expect(signinPage.passwordToggleHide).not.toBeVisible()
  await expect(signinPage.regInputPassword).toHaveAttribute('type', 'password')

  await signinPage.passwordToggleShow.click()
  await expect(signinPage.passwordToggleShow).not.toBeVisible()
  await expect(signinPage.passwordToggleHide).toBeVisible()
  await expect(signinPage.regInputPassword).toHaveValue(
    TEST_USERS.testUserPassword,
  )
  await expect(signinPage.regInputPassword).toHaveAttribute('type', 'text')
})

/**
 * Verifies the functionality of the "Forgot Password" flow,
 * including opening the reset password flyout, handling empty and
 * incorrectly formatted email inputs, attempting to reset with a
 * non-existent email, and successfully requesting a reset link for
 * an existing user.
 *
 * Prerequisites for this test:
 * - A registered user account with valid credentials.
 * - The email address for this user must be defined via `TEST_USER_EMAIL1` environment variable
 * (e.g., "sfb.aqa1@testsystem.com").
 */
test('C2171379 Verify User login reset password flow', async ({
  signinPage,
  header,
  page,
  toastMessage,
}, testInfo) => {
  await test.step('Visit Login page and open Reset password flyout', async () => {
    await header.headerLoginButton.click()
    await signinPage.resetPasswordButton.waitFor()
    await signinPage.resetPasswordButton.click()
    await signinPage.resetPasswordHeadline.waitFor()
    await expect(signinPage.resetPasswordHeadline).toBeVisible()
    await expect(signinPage.resetPasswordEmailInput).toHaveValue('')
  })

  await test.step('Click Get Reset Link button while e-mail address input is empty', async () => {
    await signinPage.resetPasswordGetResetLinkButton.click()
    await expect(signinPage.resetPasswordEmailInput).toBeFocused()
    await expect(signinPage.resetPasswordHeadline).toBeVisible()
  })

  await test.step('Click Back to Login button and assert Flyout is closed', async () => {
    await signinPage.resetPasswordBackToLoginButton.waitFor()
    await signinPage.resetPasswordBackToLoginButton.focus()
    await signinPage.resetPasswordBackToLoginButton.click()
    await expect(signinPage.resetPasswordHeadline).not.toBeVisible()
  })

  await test.step('Enter incorrect format e-mail, open the Flyout and assert e-mail input is empty', async () => {
    await signinPage.emailInput.waitFor()
    await signinPage.emailInput.focus()
    await signinPage.emailInput.fill(TEST_USERS.emailInvalidFormat)
    await signinPage.resetPasswordButton.click()
    await signinPage.resetPasswordHeadline.waitFor()
    await expect(signinPage.resetPasswordEmailInput).toHaveValue('')
  })

  await test.step('Enter correct format non-existing e-mail and click Get Reset Link', async () => {
    await signinPage.resetPasswordEmailInput.clear()
    await signinPage.resetPasswordEmailInput.focus()
    await signinPage.resetPasswordEmailInput.fill(TEST_USERS.nonExistingEmail)
    await signinPage.resetPasswordGetResetLinkButton.click()
    await page.waitForTimeout(500)
    await expect(signinPage.forgotPasswordErrorMessageContainer).toBeVisible()
  })

  if (testInfo.project.name === 'firefox') {
    await signinPage.closePasswordResetFlyoutButton.click()
    console.warn(
      'Skipping this step in Firefox due to the potential Firefox specific error - Target page, context or browser has been closed',
    )
  } else {
    await test.step('Enter correct format existing e-mail and click Get Reset Link', async () => {
      await signinPage.resetPasswordEmailInput.clear()
      await page.waitForTimeout(300)
      await signinPage.resetPasswordEmailInput.focus()
      await signinPage.resetPasswordEmailInput.fill(TEST_USERS.testUserEmail1)
      await signinPage.resetPasswordGetResetLinkButton.click()
      await signinPage.emailInput.waitFor()
      await page.waitForLoadState('networkidle')
      await toastMessage.toastInfo.waitFor()
      await expect(toastMessage.toastInfo).toBeVisible()
      await expect(signinPage.resetPasswordHeadline).not.toBeVisible()
    })
  }

  await test.step('Open the Flyout and assert Close button', async () => {
    if (isMobile(page)) {
      console.warn(
        'Skipping assert Flyout close button because it is not used on mobile devices',
      )
      return
    }

    await signinPage.resetPasswordButton.click()
    await signinPage.closePasswordResetFlyoutButton.waitFor()
    await signinPage.closePasswordResetFlyoutButton.click()
    await page.waitForTimeout(500)
    await expect(signinPage.resetPasswordHeadline).not.toBeVisible()
  })
})

/**
 * Verifies the process of setting a new password, including
 * handling incorrectly formatted passwords and successfully submitting
 * a correctly formatted password (even though the test hash might lead to an error).
 * Any hash can be used for the testing purposes to verify that the new password flyout loads correctly.
 *
 * Prerequisites for this test:
 * - The password for this user must be defined via `TEST_USER_PASSWORD` environment variable.
 * The password should have a minimum length of 8 characters and include at least one
 * special character, one uppercase letter, one lowercase letter, and one number.
 */
test('C2171786 Verify setting the new password', async ({
  signinPage,
  page,
  countryDetector,
}) => {
  await test.step('Open new password flyout and enter incorrectly formatted password', async () => {
    await signinPage.navigate(
      page,
      ROUTES.signin + TEST_PASSWORD_RESET_HASH,
      'networkidle',
    )
    await countryDetector.closeModal()
    await signinPage.newPasswordInput.waitFor()
    await signinPage.newPasswordInput.focus()
    await signinPage.newPasswordInput.fill('test')
    await expect(signinPage.validationErrorText).toBeVisible()
  })

  await test.step('Enter correctly formatted password', async () => {
    // Error message is expected because the test hash is used.
    await signinPage.newPasswordInput.clear()
    await signinPage.newPasswordInput.focus()
    await signinPage.newPasswordInput.fill(TEST_USERS.testUserPassword)
    await signinPage.submitNewPasswordButton.click()
    await page.waitForTimeout(500)
    await expect(signinPage.validationErrorText).not.toBeVisible()
    await expect(signinPage.resetPasswordErrorMessageContainer).toBeVisible()
  })
})

/**
 * Verifies the guest user registration flow, including
 * toggling the guest registration option, asserting the visibility of
 * relevant elements, and ensuring the guest user is successfully logged in.
 *
 * Prerequisites for this test:
 * - The email address for this user must be defined via `TEST_USER_GUEST` environment variable
 * (e.g., "guest.user@testsystem.com").
 * - The password for this user must be defined via `TEST_USER_PASSWORD` environment variable.
 * The password should have a minimum length of 8 characters and include at least one
 * special character, one uppercase letter, one lowercase letter, and one number.
 */
test('C2171374 Verify User registration guest flow', async ({
  signinPage,
  page,
  header,
  toastMessage,
}, testInfo) => {
  // Test skipped only for Firefox due to the timeouts occurring in the Gitlab CI execution.
  // This is the known issue with .hover() failing in Linux Firefox: https://github.com/microsoft/playwright/issues/27969
  // Feel free to remove the line below and try to execute the test locally or in CI to check if the timeouts are encountered.
  test.skip(
    testInfo.project.name === 'firefox',
    'Potential Gitlab CI execution issues in Firefox',
  )
  await test.step('Open Registration page and assert Password input is visible', async () => {
    await header.headerLoginButton.waitFor()
    await header.headerLoginButton.click()
    await signinPage.registerTab.waitFor()
    await signinPage.registerTab.click()
    await signinPage.registerForm.waitFor()
    await expect(signinPage.regInputPassword).toBeVisible()
  })
  await test.step('Enter correctly formatted user data', async () => {
    await signinPage.selectGender('m')
    await signinPage.fillRegistrationData(
      TEST_USERS.firstNameRegUser,
      TEST_USERS.lastNameRegUser,
      TEST_USERS.testUserGuest,
      TEST_USERS.testUserPassword,
    )
    await expect(signinPage.registerGuestInfo).not.toBeVisible()
  })
  await test.step('Click Continue as Guest toggle and assert guest info box is displayed', async () => {
    await signinPage.registerGuestSwitch.click()
    await page.waitForLoadState('domcontentloaded')
    await expect(signinPage.passwordInput).not.toBeVisible()
    await expect(signinPage.registerGuestInfo).toBeVisible()
  })
  await test.step('Click Register button and assert guest user is logged in', async () => {
    await signinPage.registerButton.click()
    await expect(toastMessage.toastInfo).toBeVisible()
    await toastMessage.toastInfoButton.click()
    await expect(toastMessage.toastInfo).not.toBeVisible()
    if (!isMobile(page)) {
      await page.waitForLoadState('domcontentloaded')
      await header.headerLoginButton.hover()
      await page.waitForLoadState('domcontentloaded')
      await expect(signinPage.greetingUserFirstName).toBeVisible()
      await expect(signinPage.userPopoverEmail).toBeVisible()
      await expect(signinPage.userPopoverLogoutButton).toBeVisible()
    }
  })
})

/**
 * Verifies the presence and correctness of specific SEO meta tags
 * (robots and canonical) on the user login and registration pages.
 */
test('C2171377 Verify User login and registration SEO data', async ({
  signinPage,
  header,
  page,
  baseURL,
}) => {
  await header.headerLoginButton.waitFor()
  await header.headerLoginButton.click()
  await signinPage.loginTab.waitFor()
  const pageTitle = (await signinPage.pageTitle.nth(0).textContent()) as string

  await verifySeoMetaTags(page, {
    robots: LOGIN_REGISTRATION.seoRobots,
    canonical: baseURL + ROUTES.homepageDefault + SIGNIN_URL,
  })
  await expect(signinPage.h1).toBeAttached()
  await expect(signinPage.h1).toHaveText(pageTitle)
})

/**
 * Verifies the functionality of the "Create an account" link on
 * the login page, ensuring it navigates to the registration form.
 * Verifies the functionality of the links on the registration
 * page (Terms of Service and Privacy Policy) and the "Log in" link back to the login form.
 */
test('C2171381 C2171376 Verify User Login and Register page links', async ({
  signinPage,
  header,
  page,
}) => {
  await test.step('Verify Login page links', async () => {
    await header.headerLoginButton.click()
    await signinPage.createAccountLabel.waitFor()
    await signinPage.signinPageLink.click()
    await signinPage.registerForm.waitFor()
    await expect(signinPage.registerButton).toBeVisible()
    await expect(signinPage.createAccountLabel).not.toBeVisible()
    expect(page.url()).toContain(LOGIN_REGISTRATION.regUrlParam)
  })
  await test.step('Verify Registration page links', async () => {
    await signinPage.privacyDisclaimerInfo.waitFor()
    await expect(signinPage.privacyDisclaimerInfo).toBeVisible()
    await expect(signinPage.termsOfServiceLink).toHaveAttribute(
      'target',
      '_blank',
    )
    await expect(signinPage.privacyPolicyLink).toHaveAttribute(
      'target',
      '_blank',
    )
    await signinPage.loginPageLink.click()
    await signinPage.loginForm.waitFor()
    await expect(signinPage.loginButton).toBeVisible()
    expect(page.url()).not.toContain(LOGIN_REGISTRATION.regUrlParam)
  })
})
