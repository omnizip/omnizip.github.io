<template>
  <div class="magic-plate" :class="{ ascii: tokens.length === 1 && tokens[0].length > 2 }">
    <span v-if="label" class="plate-label">{{ label }}</span>
    <div class="plate-bytes">
      <span v-for="(t, i) in tokens" :key="i" class="byte" :class="byteClasses[accent]">{{ t }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: '' },
  // Byte tokens in hex ("37", "7A") or a single ASCII magic ("MSCF").
  tokens: { type: Array, required: true },
  accent: {
    type: String,
    default: 'red',
    validator: (v) => ['red', 'teal', 'gold', 'purple'].includes(v),
  },
})

const byteClasses = {
  red: 'bg-brand-primary/10 text-brand-primary border-brand-primary/20',
  teal: 'bg-accent-teal/10 text-accent-teal border-accent-teal/20',
  gold: 'bg-accent-gold/10 text-accent-gold border-accent-gold/20',
  purple: 'bg-accent-purple/10 text-accent-purple border-accent-purple/20',
}
</script>

<style scoped>
.magic-plate {
  @apply inline-flex flex-col gap-1 p-2.5 rounded-lg;
  @apply bg-light-surface/80 dark:bg-dark-surface/80;
  @apply border border-light-border dark:border-dark-border;
}

.plate-label {
  @apply text-[10px] font-mono uppercase tracking-widest;
  @apply text-light-muted dark:text-dark-muted;
}

.plate-bytes {
  @apply flex gap-1;
}

.byte {
  @apply px-1.5 py-0.5 rounded font-mono text-xs leading-none border;
}

.magic-plate.ascii .byte {
  @apply px-2 py-1 text-sm font-bold tracking-[0.2em];
}
</style>
