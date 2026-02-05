import { createConsola } from 'consola'
import { CMSProvider } from './config'

export const moduleName = '@scayle/storefront-cms'
export const logger = createConsola({
  formatOptions: {
    colors: true,
  },
  level: process.env.NUXT_DEBUGGING_ENABLED ? 3 : -1,
  defaults: {
    tag: moduleName,
  },
})

export function isStringURL(string: string) {
  let url

  try {
    url = new URL(string)
  } catch {
    return false
  }

  return url.protocol === 'http:' || url.protocol === 'https:'
}

export function getComponentName(name?: string, prefix: string = 'CMS') {
  if (!name) {
    return null
  }

  if (name.toLowerCase().startsWith('cms')) {
    return name.replace(/cms/gi, (match) => match.toUpperCase())
  }

  const pascalCaseName = name
    .split(/[\s_.-]+|(?=[A-Z][a-z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('')

  return `${prefix}${pascalCaseName}`
}

export const formatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
})

export const formattedProvidersKeys = formatter.format(
  Object.values(CMSProvider),
)

export const EMAIL_REGEX_PATTERN =
  // eslint-disable-next-line sonarjs/slow-regex,sonarjs/regex-complexity
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/

// This utility is needed because of the SB/contentful cannot have page/element with the
// empty slug and home route needs to have empty slug since home route path is "/".
// As a workaround, we use "home" slug keyword and resolve it here to the correct path
export const normalizeHomeLink = (link?: string): string | undefined => {
  if (!link) {
    return
  }
  return link === 'home' ? '/' : link
}

export const normalizePathRoute = (path: string) => {
  return path.startsWith('/') ? path : `/${path}`
}

export const hasLocalePrefix = (path: string, prefix?: string) => {
  const components = normalizePathRoute(path).split('/')
  return components[1] && components[1] === prefix
}

export const isExternalLink = (link: string): boolean => {
  return typeof link === 'string' && link.startsWith('http')
}
