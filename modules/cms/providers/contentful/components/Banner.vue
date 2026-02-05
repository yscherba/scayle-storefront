<template>
  <component
    :is="baseTag"
    v-if="isActive && shouldBeVisible"
    v-bind="bindings"
    id="banner"
    class="sticky text-sm"
  >
    <slot :close="close">
      <Transition
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
        leave-active-class="transform transition ease-out duration-300 "
      >
        <div
          v-if="isOpen"
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
                <CMSText :blok="blok?.fields.body ?? null" />
                <SFCountdown
                  v-if="blok?.fields.countdownUntil"
                  :time-until="blok?.fields.countdownUntil"
                  class="my-4 md:ml-5"
                  @finished="close"
                />
                <CMSScrollableLinkList
                  v-if="hasScrollableLinks"
                  class="ml-5"
                  :links="[...blok?.fields.links]"
                />
              </div>
            </slot>

            <slot name="action" :close="close">
              <SFButton
                size="sm"
                variant="raw"
                class="absolute right-6"
                @click="close"
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
import { vElementVisibility } from '@vueuse/components'
import type { CMSBannerProps } from '../types'
import { useBanner } from '../../../composables/useBanner'
import CMSText from './Text.vue'
import CMSScrollableLinkList from './ScrollableLinkList.vue'
import { useTrackingEvents } from '~/composables/useTrackingEvents'
import { SFButton, SFCountdown } from '#storefront-ui/components'

const { blok, type, publishedAt } = defineProps<CMSBannerProps>()

const hasBeenVisible = ref(false)

const { close, isOpen, shouldBeVisible: _shouldBeVisible } = useBanner()

const { trackPromotion } = useTrackingEvents()

const isActive = computed(() => {
  return Object.values(blok || {}).length === 0 ? true : blok?.fields.isActive
})

const shouldBeVisible = computed(() => _shouldBeVisible(publishedAt))

const is = (value: string | string[]) => {
  return (
    (type && value.includes(type)) ||
    (blok?.fields.type && value.includes(blok?.fields.type))
  )
}

const hasScrollableLinks = computed(() => {
  return Object.values(blok?.fields.links || {}).length !== 0
})

const cachedUrl = computed(() => blok?.fields.ctaUrl)

const baseTag = computed(() => {
  return cachedUrl.value ? resolveComponent('CMSContentfulLink') : 'div'
})

const bindings = computed(() => {
  return cachedUrl.value ? { to: cachedUrl.value } : {}
})

const onVisible = (state: boolean) => {
  if (
    !blok?.fields.tracking?.fields.promotion_id ||
    !state ||
    hasBeenVisible.value
  ) {
    return
  }

  hasBeenVisible.value = true

  trackPromotion('view_promotion', blok.fields.tracking.fields)
}

defineOptions({ name: 'CMSBanner' })
</script>
