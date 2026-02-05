<template>
  <div
    class="flex flex-col pt-2"
    :class="isGuestEnabled ? 'pb-[4.125rem] sm:pb-[3.125rem]' : 'pb-2'"
  >
    <SFSwitch
      id="guest-switch"
      v-model="isGuestEnabled"
      :label="$t('auth_register_toggle_guest.label')"
      class="mb-4"
    />
    <div
      v-if="isGuestEnabled"
      class="flex items-center justify-between gap-2 rounded-lg bg-gray-200 px-3 py-2.5"
      data-testid="register-guest-info"
    >
      <span class="text-sm text-secondary">
        {{ $t('auth_register_toggle_guest.activation_hint') }}
      </span>
      <IconInfoOutlineSquare class="size-4 text-secondary" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { SFSwitch } from '#storefront-ui/components'

const isGuestEnabled = defineModel<boolean>()
</script>
