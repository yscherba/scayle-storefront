import { FetchError } from 'ofetch'
import type { Composer } from '#i18n'
import type { AuthTrackingEvent } from '~~/types/tracking'

const getGenericErrorMessage = (status: number, i18n: Composer): string => {
  switch (status) {
    case 400:
      return i18n.t('authentication.notification.error.generic.400')
    case 401:
      return i18n.t('authentication.notification.error.generic.401')
    case 403:
      return i18n.t('authentication.notification.error.generic.403')
    case 404:
      return i18n.t('authentication.notification.error.generic.404')
    case 406:
      return i18n.t('authentication.notification.error.generic.406')
    case 409:
      return i18n.t('authentication.notification.error.generic.409')
    case 422:
      return i18n.t('authentication.notification.error.generic.422')
    case 500:
      return i18n.t('authentication.notification.error.generic.500')
    default:
      return i18n.t('authentication.notification.error.generic.500')
  }
}

const getGuestLoginErrorMessage = (status: number, i18n: Composer): string => {
  if (status === 409) {
    return i18n.t('authentication.notification.error.guest_login.409')
  }

  return getGenericErrorMessage(status, i18n)
}

const getForgotPasswordErrorMessage = (
  status: number,
  i18n: Composer,
): string => {
  if (status === 404) {
    return i18n.t('authentication.notification.error.forgot_password.404')
  }

  return getGenericErrorMessage(status, i18n)
}

const getResetPasswordErrorMessage = (
  status: number,
  i18n: Composer,
): string => {
  if (status === 404) {
    return i18n.t('authentication.notification.error.reset_password.404')
  }

  return getGenericErrorMessage(status, i18n)
}

export const resolveErrorMessage = (
  error: unknown,
  event: AuthTrackingEvent,
  i18n: Composer,
): string => {
  if (!(error instanceof FetchError) || !error.response?.status) {
    return i18n.t('authentication.notification.error.generic.500')
  }

  if (event === 'guest_login') {
    return getGuestLoginErrorMessage(error.response.status, i18n)
  } else if (event === 'forgot_password') {
    return getForgotPasswordErrorMessage(error.response.status, i18n)
  } else if (event === 'reset_password') {
    return getResetPasswordErrorMessage(error.response.status, i18n)
  }

  return getGenericErrorMessage(error.response.status, i18n)
}
