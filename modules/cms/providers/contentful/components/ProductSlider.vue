<template>
  <div v-if="blok && status !== 'pending'" :class="marginClasses">
    <div class="flex w-full justify-between px-5 sm:px-14">
      <SFHeadline v-if="blok?.fields.headline" tag="p" size="md" is-uppercase>
        {{ blok.fields.headline }}
      </SFHeadline>

      <CMSContentfulLink
        v-if="blok?.fields.ctaUrl && blok.fields.ctaLabel"
        :to="blok.fields.ctaUrl"
        :raw="false"
      >
        {{ blok.fields.ctaLabel }}
      </CMSContentfulLink>
    </div>

    <SFItemsSlider
      class="mt-4"
      with-arrows
      hide-disabled-arrows
      data-testid="horizontal-product-slider"
    >
      <CMSProduct
        v-for="(product, index) in products"
        :key="`product-slider-item-${product.id}`"
        class="box-content w-1/2 shrink-0 snap-start snap-always px-2 first:pl-5 last:pr-5 sm:w-1/5 sm:first:pl-14 sm:last:pr-14"
        :product="product"
        @click-product="trackProductClick({ product: $event, index })"
        @intersect-product="trackIntersection({ product: $event, index })"
      />
    </SFItemsSlider>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { type Product, getLatestCategory } from '@scayle/storefront-nuxt'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import { useStorefrontBreakpoints } from '../../../composables/storefront/useStorefrontBreakpoints'
import type { CMSProductSliderProps } from '../types'
import { useContentfulMargins } from '../composables/useContentfulMargins'
import CMSProduct from './Product.vue'
import CMSContentfulLink from './ContentfulLink.vue'
import { useProductsByIds } from '#storefront/composables'
import { usePageState } from '~/composables/usePageState'
import { useRoute } from '#app/composables/router'
import { SFHeadline, SFItemsSlider } from '#storefront-ui/components'

const { blok } = defineProps<CMSProductSliderProps>()

const listingMetaData = {
  name: `ProductSlider-${blok?.fields.headline}`,
  id: 'PS',
}

const { marginClasses } = useContentfulMargins(blok?.fields.marginTop)

const storefrontBreakpoints = useStorefrontBreakpoints()
const route = useRoute()
const { pageState } = usePageState()

const storefrontTracking = useStorefrontTracking()

const productIds = computed(() => {
  return blok?.fields.productIds?.split(',').map(Number).filter(Boolean)
})

const { data, status } = await useProductsByIds(
  {
    params: {
      ids: productIds.value || [],
      with: {
        attributes: {
          withKey: ['color', 'brand', 'name'],
        },
        variants: {
          attributes: {
            withKey: ['price', 'size'],
          },
          lowestPriorPrice: true,
        },
        images: {
          attributes: {
            withKey: ['imageType', 'imageView', 'imageBackground', 'imageKind'],
          },
        },
        priceRange: true,
        lowestPriorPrice: true,
      },
    },
  },
  `productSlider-${blok?.fields.uid}`,
)

const trackingCollector = ref<Product[]>([])
const products = computed(() => data.value)
const columns = computed(() =>
  storefrontBreakpoints && storefrontBreakpoints.isGreaterOrEqual('md') ? 5 : 2,
)

const trackingSource = computed(() => {
  const routePath = String(route.fullPath === '/' ? 'home' : route.name)
  return `${routePath}|ProductSlider|${blok?.fields.headline}`
})

const trackProductClick = (payload: { product: Product; index: number }) => {
  const { product, index } = payload
  const category = getLatestCategory(product.categories)

  if (!category || !storefrontTracking) {
    return
  }

  if (storefrontTracking) {
    storefrontTracking.trackSelectItem({
      product,
      category: {
        name: category?.categoryName || '',
        id: category?.categoryId,
      },
      listingMetaData,
      index,
      source: trackingSource.value,
      pagePayload: {
        content_name: route.fullPath,
        page_type: pageState.value.type,
        page_type_id: route.params.id?.toString() || '',
      },
    })
  }
}

const trackIntersection = (payload: { product: Product; index: number }) => {
  const { product, index } = payload
  const isTracked =
    trackingCollector.value.findIndex((p) => p.id === product.id) !== -1
  const isFirstItemInRow = index % columns.value === 0
  // Treat slider as a special case of product list, track all intersected items at once
  // But instead of checking is row tracked, check per product
  if (!isFirstItemInRow || isTracked) {
    return
  }

  const itemsInSliderRow = [...(data.value || [])]
    .slice(index, index + columns.value)
    .map((item, idx) => ({ ...item, index: index + idx }))

  if (storefrontTracking) {
    storefrontTracking.trackViewItemList({
      items: itemsInSliderRow,
      listingMetaData,
      source: trackingSource.value,
    })
  }
  trackingCollector.value.push(...itemsInSliderRow)
}

defineOptions({ name: 'CMSProductSlider' })
</script>
