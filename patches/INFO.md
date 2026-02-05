# SCAYLE Storefront Boilerplate - /patches

The `patches/` directory is utilized in conjunction with the [`patch-package`](https://www.npmjs.com/package/patch-package) tool, which allows developers to make and maintain modifications to node modules directly. This directory stores patch files that patch-package generates, capturing changes made to the node modules. Each patch file within this directory corresponds to a specific npm package that has been modified locally, preserving these alterations across reinstalls and updates by applying the patches after each install. This approach is particularly valuable for implementing urgent fixes, custom adjustments, or temporary workarounds in third-party dependencies without waiting for official updates. By using the `patches/` directory, developers ensure that their modifications are consistently applied, thereby maintaining stability and functionality in their application's dependencies.

The Storefront Boilerplate currently includes the following local patches:

- `@gtm-support/vue-gtm` Backport [property augmentation fix](https://github.com/gtm-support/vue-gtm/pull/467) to 2.x
