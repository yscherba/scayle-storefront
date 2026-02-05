<template>
  <div v-editable="blok" :class="marginClasses">
    <div class="flex w-full justify-between px-5 md:px-14">
      <SFHeadline v-if="blok.headline" tag="p" size="md" is-uppercase>
        {{ blok.headline }}
      </SFHeadline>
      <CMSStoryblokLink
        v-if="blok.cta_url && blok.cta_label"
        :to="blok.cta_url"
        :raw="false"
      >
        {{ blok.cta_label }}
      </CMSStoryblokLink>
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
import { useStoryblokMargins } from '../composables/useStoryblokMargins'
import CMSProduct from './Product.vue'
import CMSStoryblokLink from './StoryblokLink.vue'
import {
  useProductsByIds,
  useProductsByReferenceKeys,
} from '#storefront/composables'
import { usePageState } from '~/composables/usePageState'
import { useRoute } from '#app/composables/router'
import { SFHeadline, SFItemsSlider } from '#storefront-ui/components'

const { blok } = defineProps<CMSProductSliderProps>()

const listingMetaData = {
  name: `ProductSlider-${blok.headline}`,
  id: 'PS',
}

const { marginClasses } = useStoryblokMargins(blok)

const storefrontBreakpoints = useStorefrontBreakpoints()
const route = useRoute()
const { pageState } = usePageState()

const storefrontTracking = useStorefrontTracking()

const productIds = computed(() => {
  return blok.product_ids?.split(',').map(Number).filter(Boolean)
})

const productReferenceKeys = computed(() => {
  return blok.products
    ?.map((product) => product.referenceKey)
    .filter(Boolean) as string[]
})

const productSliderWithParams = {
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
}

const isUsingReferenceKeys = computed(() => {
  return blok.products && blok.products.length > 0
})

const { data } = isUsingReferenceKeys.value
  ? await useProductsByReferenceKeys(
      {
        params: {
          referenceKeys: productReferenceKeys.value || [],
          with: productSliderWithParams,
        },
      },
      `productSlider-${blok._uid}`,
    )
  : await useProductsByIds(
      {
        params: {
          ids: productIds.value || [],
          with: productSliderWithParams,
        },
      },
      `productSlider-${blok._uid}`,
    )

const trackingCollector = ref<Product[]>([])
const products = computed(() => {
  if (isUsingReferenceKeys.value) {
    // If products are fetched by reference keys, maintain the same order
    return productReferenceKeys.value
      ?.map(
        (referenceKey) =>
          data.value?.find((product) => product.referenceKey === referenceKey),
      )
      .filter(Boolean) as Product[]
  }

  return data.value
})

const columns = computed(() =>
  storefrontBreakpoints && storefrontBreakpoints.isGreaterOrEqual('md') ? 5 : 2,
)

const trackingSource = computed(() => {
  const routePath = String(route.fullPath === '/' ? 'home' : route.name)
  return `${routePath}|ProductSlider|${blok.headline}`
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
  // Threat slider as a special case of product list, track all intersected items at once
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
