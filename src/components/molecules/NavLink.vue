<template>
  <component
    :is="as"
    :to="to"
    :href="href"
    :class="linkClasses"
    class="nav-link"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'

const props = defineProps({
  as: {
    type: [String, Object],
    default: 'a',
  },
  to: {
    type: [String, Object],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  active: {
    type: Boolean,
    default: false,
  },
})

const linkClasses = computed(() => [
  'px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200',
  props.active
    ? 'text-brand-primary bg-brand-primary/10'
    : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:bg-light-surface dark:hover:bg-dark-surface',
])
</script>
