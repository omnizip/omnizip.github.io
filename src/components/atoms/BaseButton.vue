<template>
  <component
    :is="as"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  as: {
    type: String,
    default: 'button',
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (v) => ['primary', 'secondary', 'ghost'].includes(v),
  },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg'].includes(v),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['click'])

const buttonClasses = computed(() => {
  const base = [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2',
    'dark:focus:ring-offset-dark-bg',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ]

  const variants = {
    primary: [
      'bg-brand-primary text-white',
      'hover:bg-brand-dark',
      'active:animate-compress',
    ],
    secondary: [
      'bg-light-surface text-light-text border border-light-border',
      'dark:bg-dark-surface dark:text-dark-text dark:border-dark-border',
      'hover:border-brand-primary dark:hover:border-brand-primary',
      'active:animate-compress',
    ],
    ghost: [
      'text-light-text dark:text-dark-text',
      'hover:bg-light-surface dark:hover:bg-dark-surface',
      'active:animate-compress',
    ],
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return [...base, ...variants[props.variant], sizes[props.size]]
})

const handleClick = (event) => {
  if (!props.disabled) {
    emit('click', event)
  }
}
</script>
