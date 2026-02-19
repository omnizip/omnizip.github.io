<template>
  <span
    :class="badgeClasses"
    :title="tooltip"
  >
    <slot>{{ format }}</slot>
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  format: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: 'default',
    validator: (v) => ['default', 'read', 'write', 'rw'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  tooltip: {
    type: String,
    default: '',
  },
})

const badgeClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center',
    'font-mono font-medium rounded-md',
    'transition-all duration-200',
  ]

  const variants = {
    default: [
      'bg-light-surface text-light-text border border-light-border',
      'dark:bg-dark-surface dark:text-dark-text dark:border-dark-border',
      'hover:border-brand-primary dark:hover:border-brand-primary',
    ],
    read: [
      'bg-accent-teal/20 text-accent-teal',
      'border border-accent-teal/30',
    ],
    write: [
      'bg-accent-gold/20 text-accent-gold',
      'border border-accent-gold/30',
    ],
    rw: [
      'bg-brand-primary/20 text-brand-primary',
      'border border-brand-primary/30',
    ],
  }

  const sizes = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
    lg: 'px-4 py-1.5 text-base',
  }

  return [...base, ...variants[props.variant], sizes[props.size]]
})
</script>
