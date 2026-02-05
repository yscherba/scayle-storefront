# CMS module

---

## Live Preview setup

### Storyblok

In order to enable the live preview in the storyblok editor, you need to provide an access token with the access level `Preview`.

- [SCAYLE Storefront - Integration Guide for Storyblok](https://scayle.dev/en/storefront-guide/developer-guide/integrations/cms/storyblok)

### Contentful

To enable the live preview in contentful editor, you need to provide an preview access token (`NUXT_PUBLIC_CMS_PREVIEW_TOKEN`) additionally to the normal access token (`NUXT_PUBLIC_CMS_ACCESS_TOKEN`).

If your content is available via custom domains you can change them using with the `NUXT_PUBLIC_CMS_HOST` and `NUXT_PUBLIC_CMS_PREVIEW_HOST` env variables.

When configuring the preview URL's inside contentful you need to add a the query param `?_editorMode={entry.sys.updatedAt}` to the preview URL.

- [SCAYLE Storefront - Integration Guide for Contentful](https://scayle.dev/en/storefront-guide/developer-guide/integrations/cms/contentful)

---

## Storyblok Scripts

As part of the Storefront Boilerplate `package.json`, some additional scripts are included to interact with Storyblok.

To interact with Storyblok, a `STORYBLOK_PERSONAL_TOKEN` and the `STORYBLOK_SPACE_ID` need to be set as part of a dedicated `.env.storyblok` file.
Check [Storefront Developer Guide / Integrations / CMS / Storyblok](https://scayle.dev/en/storefront-guide/developer-guide/integrations/cms/storyblok) for more details.

- `storyblok:download`
  - Downloads the latest components from the respective Storyblok space using Storyblok CLI
- `storyblok:generate`
  - Uses the downloaded components JSON schema and transforms it into TypeScript types
- `storyblok:login`
  - Authenticates local development environment with Storyblok CLI
- `storyblok:unused`
  - Outputs overview of used and unused Storyblok components

While `storyblok:download` and `storyblok:login` are directly utilizing the Storyblok CLI,
`storyblok:generate` and `storyblok:unused` are executing dedicated `.cjs` scripts.

### Script: storyblok:generate

The `storyblok:generate` script, located at `scripts/storyblok-generate.cjs`, creates a TypeScript type definition based on the local Storyblok components JSON schema.
The JSON schema needs to be downloaded before running this command.

The generated TypeScript type definition will be located at `storyblok/types/storyblok.gen.d.ts`.

To create the generated type definition, the script uses a NPM package called `storyblok-generate-ts`, which provides a configurable transformation function `storyblokToTypescript()`.This function facilitates the actual transformation of the JSON schema and outputs the type definition based on the passed configuration object, which is pre-configured for usage with the SCAYLE Storefront Boilerplate.

### Script: storyblok:unused

The `storyblok:unused` script, located at `scripts/storyblok-unused.cjs`, creates a list of all unused components of a space by utilizing the Storyblok management API.

The script is taken from <https://www.storyblok.com/faq/how-to-get-all-unused-components>.
