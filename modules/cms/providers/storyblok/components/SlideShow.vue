<template>
  <div v-editable="blok" :class="marginClasses">
    <SFHeadline v-if="blok.h1" tag="h1" is-uppercase>{{ blok.h1 }}</SFHeadline>
    <Swiper
      v-if="blok.slides?.length"
      ref="sliderRef"
      class
      loop
      navigation
      :modules="[SwiperAutoplay, SwiperNavigation, SwiperPagination]"
      :autoplay="{ delay: 8000, disableOnInteraction: false }"
      :pagination="{ clickable: true }"
      :wrapper-class="isDark ? 'dark-mode' : ''"
    >
      <SwiperSlide
        v-for="(slide, index) in blok.slides"
        :key="`cms-slide-${slide._uid}`"
      >
        <CMSSlide :blok="slide" :preload="index === 0" />
      </SwiperSlide>
    </Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Autoplay as SwiperAutoplay,
  Navigation as SwiperNavigation,
  Pagination as SwiperPagination,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import type { CMSSlideShowProps } from '../types'
import { useStoryblokMargins } from '../composables/useStoryblokMargins'
import CMSSlide from './Slide.vue'
import { SFHeadline } from '#storefront-ui/components'

const { blok } = defineProps<CMSSlideShowProps>()

const sliderRef = ref()

const isDark = ref(true)

const { marginClasses } = useStoryblokMargins(blok)

defineOptions({ name: 'CMSSlideShow' })
</script>
