<template>
  <div class="flex w-full items-center justify-between">
    <SFHeadline
      class="my-2 md:text-lg"
      data-testid="reset-password-headline"
      size="xl"
      tag="h3"
    >
      {{ $t('auth_forgot_password.title') }}
    </SFHeadline>
    <SFButton
      class="group my-2 -mr-2 hover:bg-gray-200 max-lg:hidden md:bg-transparent"
      fab
      variant="raw"
      :aria-label="$t('auth_close_password_modal')"
      data-testid="close-forgot-password-slide-in"
      @click.prevent="$emit('close')"
    >
      <template #icon>
        <IconClose class="size-4 text-secondary group-hover:text-primary" />
      </template>
    </SFButton>
  </div>
  <p class="text-md text-secondary">
    {{ $t('auth_forgot_password.description') }}
  </p>
</template>

<script setup lang="ts">
import { SFButton, SFHeadline } from '#storefront-ui/components'

defineEmits<{ close: [] }>()
</script>
