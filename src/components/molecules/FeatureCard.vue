<template>
  <div class="feature-card interactive-card p-6">
    <div class="icon-wrapper mb-4" :style="{ color: iconColor }">
      <slot name="icon">
        <component :is="icon" v-if="icon" class="w-8 h-8" />
      </slot>
    </div>
    <h3 class="text-lg font-semibold mb-2 text-light-text dark:text-dark-text">
      {{ title }}
    </h3>
    <p class="text-light-muted dark:text-dark-muted text-sm leading-relaxed">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  icon: {
    type: Object,
    default: null,
  },
  color: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'gold', 'purple', 'teal'].includes(v),
  },
})

const iconColor = computed(() => {
  const colors = {
    primary: '#c5505c',
    gold: '#f2a764',
    purple: '#b274e2',
    teal: '#58bab7',
  }
  return colors[props.color]
})
</script>

<style scoped>
.feature-card {
  position: relative;
  overflow: hidden;
}

.feature-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-color, #c5505c), transparent);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.feature-card:hover::before {
  opacity: 1;
}

.icon-wrapper {
  --accent-color: v-bind(iconColor);
}
</style>
