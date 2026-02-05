# @scayle/storefront-application-nuxt

<div align="center">
  <img src="https://cdn-prod.scayle.com/public/media/general/SCAYLE-Commerce-Engine-header.png" alt="SCAYLE Commerce Engine" />
</div>

<div align="center">
  <br />
  <h1>SCAYLE Storefront Application</h1>
</div>

<div align="center">
  <h4><a href="https://scayle.dev/en/storefront">SCAYLE Storefront</a> | <a href="https://scayle.dev">SCAYLE Documentation</a> | <a href="https://www.scayle.com/">SCAYLE Website</a></h4>
</div>

<div align="center">
    A <a href="https://nuxt.com/docs/getting-started/introduction" target="_blank" >Nuxt 3</a>-based Boilerplate to kick-start your SCAYLE Storefront Application development.
    <br />
    <br />
    <a href="https://scayle.dev/en/storefront-guide/developer-guide/getting-started/what-is-storefront"><strong>Explore the Development Guide »</strong></a>
    <br />
</div>

<hr

<div align="center">
  <br />
  <a href="https://nuxt.com/docs/getting-started/introduction"><img src="https://img.shields.io/badge/Nuxt-002E3B?style=for-the-badge&logo=nuxtdotjs&logoColor=#00DC82" alt="Nuxt" /></a> <a href="https://vuejs.org/guide/introduction.html"><img src="https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D" alt="Vue" /></a> <a href="https://tailwindcss.com/docs/installation"><img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" /></a>

</div>

## About SCAYLE Storefront

**SCAYLE Storefront Application** is an all-in-one starter kit for building high-performance e-commerce shops for the SCAYLE Commerce Engine. It makes it quick and easy to build a best-in-class shop frontend. The latest version of the Storefront application is based on _Nuxt_ and _Vue 3_ and consists of two parts:

- **Storefront SDKs:** the headless storefront that provides design-agnostic business logic, feature packages, composables, and several helpers and utilities to simplify the development of Nuxt-based e-commerce applications on top of the SCAYLE Commerce Engine
- **Storefront Application:** This is the complete starter Nuxt application, which includes the Storefront SDKs along with all the features and pages required for a modern e-commerce frontend.

The **Storefront Application** is built to make it easy to change or extend the shop design. This approach drastically reduces the effort required to launch a new e-commerce shop, as you only have to focus on customizing the UI and design layer to your specific needs.

## Getting Support

While the Storefront Applications aims to reduce complexity where possible, we understand that questions and issues may still arise. For technical assistance, to raise issues, or to exchange with other developers using the SCAYLE Storefront Application, please visit our [GitHub Discussions page](https://github.com/scayle/storefront-application/discussions).

To access the repository and participate in discussions, you'll need to be granted access. Please get in touch with your SCAYLE Representative and your Github Username, who will be able to facilitate access for you, and don't forget to provide your Github username.

We encourage you to utilize the GitHub Discussions as your primary resource for:

- **Technical Helpdesk:** Find answers to common questions and troubleshoot issues.
- **Raising Issues:** Report bugs or unexpected behavior.
- **Asking Questions:** Get clarification on features or implementation details.
- **Community Exchange:** Connect with other developers, share insights, and learn best practices.

## Getting Started

The following outline should provide you with an overview of how to get your
local development environment using the Storefront Boilerplate up and running.
For more in-depth explanations and How-to guides, please consult the [SCAYLE Resource Center](https://scayle.dev/en/storefront-guide/developer-guide/getting-started/setup-your-storefront).

This guide provides instructions to set up your local development environment using SCAYLE Storefront.

For more details, consult the [SCAYLE Resource Center](https://scayle.dev/en/storefront-guide/developer-guide/technical-foundation/configuration).

### Prerequisites

For a proper local setup of SCAYLE Storefront, ensure to follow the latest
["Setup your Storefront"-Guide](https://scayle.dev/en/storefront-guide/developer-guide/getting-started/setup-your-storefront)
in the SCAYLE Resource Center.

#### Docker Compose

Suppose you don't need to develop and make changes to the application;
we provide a simple docker-compose setup to run the application without
installing the dependencies locally on your machine.

```sh
# Without SSL setup
docker compose --profile node up --build

# With SSL setup
SSL_CERT=$(cat ./localhost.crt) SSL_KEY=$(cat ./localhost.pem) docker compose --profile node up --build
```

Depending on your SSL setup open either <http://localhost:3000> or <https://localhost:3000>

## Local HTTPS

### How to turn on local HTTPS

To generate a certificate and key, we recommend using the [mkcert](https://github.com/FiloSottile/mkcert) tool.
Follow the [mkcert installation instructions (Github)](https://github.com/FiloSottile/mkcert/blob/master/README.md#installation) and afterward run:

```sh
mkcert --key-file localhost.pem --cert-file localhost.crt localhost
```

After generating the local key and certificate file, add both to your `.env`-file as follows

```yaml
HTTPS_KEY=localhost.pem
HTTPS_CERT=localhost.crt
```

Your project will now be served on <https://localhost:3000>.
Please keep in mind that the shop accessed through <http://localhost:3000> might not be reachable anymore.

### How to turn off local HTTPS

As the local HTTPS encryption is directly coupled to the `HTTPS_KEY` and `HTTPS_CERT`,
simply remove or comment out the entries in your `.env`-file, like this:

```ini
# HTTPS_KEY=localhost.key
# HTTPS_CERT=localhost.crt
SOME_OTHER_ACTIVE_KEY=someValue
```

Use <http://localhost:3000/> to open the shop

## Running a production-like preview

Run `pnpm build` to build the latest changes and followed by `pnpm preview`.
Keep in mind that a `redis-server` needs to be running.
This will run the generated nuxt application from the `.output/` directory,
similar to how the application will be deployed on a production server.
The only difference here is that all relevant `NUXT_` runtimeConfig override values
are sourced from the local `.env` file.

## Testing

For testing with Nuxt 3, we provide a [@nuxt/test-utils](https://github.com/nuxt/test-utils) integration.
It allows us to use a Nuxt environment in [vitest](https://vitest.dev/).
For ease of use we use `.nuxt.test.ts` or `.nuxt.spec.ts` file suffix for our tests to use nuxt env.

## Viewing Storefront API calls for debugging

Depending on the task at hand its necessary to intercept and debug API calls from SFC.
For this purpose it is recommended to use an interactive HTTP(S) proxy that allows to inspect the made API calls.

## Patches

In some cases, patches to third-party packages are required. The Storefront Boilerplate
uses [`patch-package`](https://www.npmjs.com/package/patch-package) to manage patching.
The tool will run in `postinstall` and apply any patches present in the `patches/` directory.

An overview of the currently included patches can be found [here](./patches/INFO.md).

## OpenTelemetry

The Storefront Boilerplate includes an experimental integration with OpenTelemetry.

To enable OpenTelemetry, set the buildtime environment variable `OTEL_ENABLED` to true.
This will inject additional code into your application's entrypoint which will
initialize the OpenTelemetry SDK. Automatic instrumentations as well as instrumentations
from `storefront-nuxt` will be captured and exported via the OTLP protocol.

Currently, Vercel and Node are the only supported platforms for the OpenTelemetry integration.
Setting `OTEL_ENABLED` to true when building for other platforms will have no effect.

You should also set the runtime variable `OTEL_SERVICE_NAME` to configure the
service name used in traces. e.g. `OTEL_SERVICE_NAME=storefront-boilerplate`

Note: this variable is used directly by the OpenTelemetry libraries and is not available in the Nuxt `runtimeConfiguration`.

## Explicit Imports

With the release of the SCAYLE Storefront Boilerplate `v1.2.0`, we have disabled
the [Nuxt autoImport feature](https://nuxt.com/docs/guide/concepts/auto-imports#disabling-auto-imports)
or composables, utils and other dependencies.

With the change we have included a custom local Nuxt module `modules/eslint-auto-explicit-import`,
based on [`antfu/nuxt-eslint-auto-explicit-import`](https://github.com/antfu/nuxt-eslint-auto-explicit-import).
This module aims to insert more explicit import statement automatically where possible,
based on Nuxt internal import resolution using `eslint --fix`.

### Vue Compiler Macros

Some functions from Vue are considered compiler macros and do not need to be imported manually,
as they will be resolved during the component build time:

- `defineProps`

The following compiler macros will currently still be manually imported but might
throw a warning during build time:

- `defineOptions`
- `defineModel`

### Manual Import Paths

As the automatic import path resolution won't work for every case,
manual checking and tweaking of import paths might be required.
Following some common cases that should be considered while adding manual imports:

- Use `#nuxt` instead of `nuxt/app` or `#app/nuxt`
- Use `#vue-router` for router utilities instead of `vue-router`
- Use `#i18n` for composables instead of `@nuxtjs/i18n`
- Use `#storefront/composables` for composables instead of `@scayle/storefront-nuxt`
- Use `#app/composables/{name}` for composables instead of `#imports`
  - e.g. `import { clearError, useError } from '#app/composables/error'`
- Use `#imports` for imports within a pure server context
  - e.g server or nitro plugins (`server/plugins/*` or `modules/opentelemetry/src/runtime/nitro/plugins/*`)

### Barrel file imports

Even though we're providing barrel files (`index.ts`) for `~/utils` and `~/constants`,
we recommend to make your imports as explicit as possible.
This helps to avoid confusion in regards to import locations and potential naming collisions.
