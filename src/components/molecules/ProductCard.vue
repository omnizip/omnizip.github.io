<template>
  <div class="product-card glass-card overflow-hidden">
    <div class="p-6 sm:p-8">
      <div class="flex items-start gap-4 mb-6">
        <div
          class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center"
          :style="{ backgroundColor: `${accentColor}20` }"
        >
          <span class="text-2xl">{{ emoji }}</span>
        </div>
        <div class="flex-grow">
          <h3 class="text-xl font-bold text-light-text dark:text-dark-text mb-1">
            {{ title }}
          </h3>
          <p class="text-sm text-light-muted dark:text-dark-muted">
            {{ subtitle }}
          </p>
        </div>
      </div>

      <p class="text-light-text dark:text-dark-text mb-6 leading-relaxed">
        {{ description }}
      </p>

      <div class="mb-6">
        <h4 class="text-xs font-semibold uppercase tracking-wider text-light-muted dark:text-dark-muted mb-3">
          Supported Formats
        </h4>
        <div class="flex flex-wrap gap-2">
          <FormatBadge
            v-for="format in formats"
            :key="format"
            :format="format"
            size="sm"
          />
        </div>
      </div>

      <slot name="actions">
        <div class="flex gap-3">
          <BaseButton
            :as="docsLink ? 'a' : 'router-link'"
            :href="docsLink"
            :to="docsLink ? null : '#'"
            variant="primary"
            size="sm"
          >
            Documentation
          </BaseButton>
          <BaseButton
            as="a"
            :href="githubLink"
            target="_blank"
            rel="noopener"
            variant="secondary"
            size="sm"
          >
            GitHub
          </BaseButton>
        </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
import FormatBadge from '../atoms/FormatBadge.vue'
import BaseButton from '../atoms/BaseButton.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    required: true,
  },
  emoji: {
    type: String,
    default: '📦',
  },
  accentColor: {
    type: String,
    default: '#c5505c',
  },
  formats: {
    type: Array,
    default: () => [],
  },
  docsLink: {
    type: String,
    default: '',
  },
  githubLink: {
    type: String,
    default: '',
  },
})
</script>

<style scoped>
.product-card {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
