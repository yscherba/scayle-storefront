<template>
  <component
    :is="componentName"
    v-bind="{ to, ...(to && { raw: true }) }"
    :class="{
      'h-13 px-6 py-4': !isRaw && isSize('xl'),
      'h-12 px-10': !isRaw && isSize('lg'),
      'h-11 px-10': !isRaw && isSize('md'),
      'h-9 px-6': !isRaw && isSize('sm'),
      'rounded-xl bg-primary font-semibold text-white hover:bg-accent':
        isPrimary,
      'rounded-xl border border-gray-400 bg-white font-medium text-secondary hover:bg-gray-200 hover:text-secondary':
        isSecondary,
      'rounded-xl border border-gray-500 bg-transparent font-semibold text-primary hover:bg-gray-100 hover:text-primary':
        isTertiary,
      'rounded-lg bg-accent font-semibold text-white hover:text-white supports-hover:hover:bg-accent/75':
        isAccent,
      'text-primary hover:text-primary': isRaw,
      'w-full': isFullWidth,
      'animate-pulse cursor-not-allowed': loading,
      '!rounded-full !p-2': fab,
      'text-sm': isSize('sm') && !isRaw,
      'text-md': (isSize('md') || isSize('lg') || isSize('xl')) && !isRaw,
    }"
    class="group inline-flex items-center justify-center gap-2 truncate whitespace-nowrap transition duration-100 ease-linear disabled:border disabled:border-gray-300 disabled:bg-gray-100 disabled:text-secondary"
  >
    <slot
      name="icon"
      :_class="{
        'size-10': isSize('xl'),
        'size-8': isSize('lg'),
        'size-6': isSize('md'),
        'size-4': isSize('sm'),
      }"
    />
    <slot />
    <slot
      name="append-icon"
      :_class="{
        'size-10': isSize('xl'),
        'size-8': isSize('lg'),
        'size-6': isSize('md'),
        'size-4': isSize('sm'),
      }"
    />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ButtonVariant, Size } from '#storefront-ui'
import type { RouteLocationRaw } from '#vue-router'
import { SFLink } from '#storefront-ui/components'

const {
  variant = ButtonVariant.PRIMARY,
  size: currentSize = Size.MD,
  fab = false,
  to,
} = defineProps<{
  /**
   * Determines the visual style and emphasis of the button. Primary is used for main actions, while other variants provide different levels of emphasis.
   */
  variant?: ButtonVariant
  /**
   * Controls the button's dimensions and padding.
   */
  size?: Size
  /**
   * When provided, the button behaves as a router link. Useful for navigation actions within the application.
   */
  to?: RouteLocationRaw
  /**
   * Whether the button is a fab. If set to true, the button will have a circular shape and a fixed size with padding.
   */
  fab?: boolean
  /**
   * Whether the button is full width.
   */
  isFullWidth?: boolean
  /**
   * Shows a loading state of the button and disables the button. Use during async operations to prevent multiple submissions.
   */
  loading?: boolean
}>()

const isPrimary = computed(() => variant === ButtonVariant.PRIMARY)
const isSecondary = computed(() => variant === ButtonVariant.SECONDARY)
const isTertiary = computed(() => variant === ButtonVariant.TERTIARY)
const isRaw = computed(() => variant === ButtonVariant.RAW)
const isAccent = computed(() => variant === ButtonVariant.ACCENT)

const isSize = (size?: Size): boolean => size === currentSize

const componentName = computed(() => (to ? SFLink : 'button'))
</script>
