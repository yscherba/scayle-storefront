<template>
  <div class="space-y-5 bg-white" role="listbox">
    <SFCategorySuggestionList
      v-if="categories.length"
      :category-suggestions="categories"
      @click-result="$emit('clickResult', $event)"
    />
    <SFProductSuggestionList
      v-if="products.length"
      :product-suggestions="products"
      @click-result="$emit('clickResult', $event)"
    />
    <SFNavigationItemSuggestionList
      v-if="navigationItems.length"
      :search-term="searchTerm"
      :navigation-item-suggestions="navigationItems"
      @click-result="$emit('clickResult', $event)"
    />
    <SFShowAllResultsLink
      :search-term="searchTerm"
      role="option"
      @click="$emit('clickResult', 'show_all')"
    />
  </div>
</template>

<script setup lang="ts">
import type {
  CategorySearchSuggestion,
  ProductSearchSuggestion,
  NavigationItemSuggestion as NavigationItemSuggestionType,
  SearchEntity,
} from '@scayle/storefront-nuxt'
import SFProductSuggestionList from './products/SFProductSuggestionList.vue'
import SFNavigationItemSuggestionList from './navigationItem/SFNavigationItemSuggestionList.vue'
import SFCategorySuggestionList from './categories/SFCategorySuggestionList.vue'
import SFShowAllResultsLink from './SFShowAllResultsLink.vue'

defineProps<{
  products: ProductSearchSuggestion[]
  categories: CategorySearchSuggestion[]
  navigationItems: NavigationItemSuggestionType[]
  searchTerm: string
}>()

defineEmits<{
  clickResult: [result: SearchEntity | 'show_all']
  close: []
}>()
</script>
