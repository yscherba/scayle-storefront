<template>
  <component
    :is="baseTag"
    v-if="isActive && shouldBeVisible"
    v-bind="bindings"
    id="banner"
    v-editable="blok"
    class="sticky text-sm"
  >
    <slot :close="storefrontBanner && storefrontBanner.close">
      <Transition
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
        leave-active-class="transform transition ease-out duration-300 "
      >
        <div
          v-if="storefrontBanner?.isOpen"
          v-element-visibility="[onVisible, { threshold: 0.5 }]"
          class="relative z-20 flex w-full items-center"
          :class="{
            'bg-status-info text-black': is('info'),
            'bg-status-error text-white': is('sale'),
            'bg-status-success text-black': is('highlight'),
            'bg-black text-white': is('alert'),
          }"
        >
          <section
            class="container flex flex-col items-center justify-center gap-2 text-center sm:relative sm:flex-row"
            :class="{ 'sm:flex-col': hasScrollableLinks }"
          >
            <slot name="body">
              <div class="md:flex md:w-full md:items-center md:justify-center">
                <CMSText
                  :blok="{
                    body: blok.body,
                    _uid: blok._uid,
                    component: 'CmsText',
                  }"
                />
                <SFCountdown
                  v-if="blok.countdown_until"
                  :time-until="blok.countdown_until"
                  class="my-4 md:ml-5"
                  @finished="storefrontBanner && storefrontBanner.close"
                />
                <CMSScrollableLinkList
                  v-if="hasScrollableLinks"
                  class="ml-5"
                  :links="[...blok.links]"
                />
              </div>
            </slot>

            <slot
              name="action"
              :close="storefrontBanner && storefrontBanner.close"
            >
              <SFButton
                size="md"
                variant="raw"
                class="absolute right-6"
                @click="storefrontBanner && storefrontBanner.close"
              >
                <template #icon="{ _class }">
                  <IconClose :class="_class" />
                </template>
              </SFButton>
            </slot>
          </section>
        </div>
      </Transition>
    </slot>
  </component>
</template>

<script setup lang="ts">
import { computed, ref, resolveComponent } from 'vue'
import { useStorefrontTracking } from '../../../composables/storefront/useStorefrontTracking'
import type { CMSBannerProps } from '../types'
import { useBanner } from '../../../composables/useBanner'
import CMSText from './Text.vue'
import CMSScrollableLinkList from './ScrollableLinkList.vue'
import { SFButton, SFCountdown } from '#storefront-ui/components'

const { type = '', blok, publishedAt } = defineProps<CMSBannerProps>()

const storefrontBanner = useBanner()
const storefrontTracking = useStorefrontTracking()
const hasBeenVisible = ref(false)

const isActive = computed(() => {
  return Object.values(blok || {}).length === 0 ? true : blok.is_active
})

const shouldBeVisible = computed(() => {
  return storefrontBanner && storefrontBanner.shouldBeVisible(publishedAt)
})

const is = (value: string | string[]) => {
  return (
    (type && value.includes(type)) || (blok.type && value.includes(blok.type))
  )
}

const hasScrollableLinks = computed(() => {
  return Object.values(blok?.links || {}).length !== 0
})

const cachedUrl = computed(() => blok.cta_url?.cached_url)

const baseTag = computed(() => {
  return cachedUrl.value ? resolveComponent('CMSStoryblokLink') : 'div'
})

const bindings = computed(() => {
  return cachedUrl.value ? { to: cachedUrl.value } : {}
})

const onVisible = (state: boolean) => {
  if (!blok.promotion_id || !state || hasBeenVisible.value) {
    return
  }

  hasBeenVisible.value = true

  if (storefrontTracking) {
    storefrontTracking.trackPromotion('view_promotion', blok)
  }
}

defineOptions({ name: 'CMSBanner' })
</script>
