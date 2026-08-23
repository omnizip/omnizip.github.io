<template>
  <div ref="root" class="nav-dropdown relative">
    <button
      class="nav-link dropdown-trigger"
      :class="{ active: active }"
      :aria-expanded="open ? 'true' : 'false'"
      aria-haspopup="true"
      @click="toggle"
      @keydown.escape.stop="close"
    >
      {{ label }}
      <svg class="chevron" :class="{ rotated: open }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <transition name="fade-slide">
      <div v-if="open" class="dropdown-panel" role="menu" :aria-label="label + ' menu'">
        <template v-for="(item, i) in items" :key="i">
          <div v-if="item.divider" class="dropdown-divider" role="separator" />
          <router-link
            v-else-if="item.to"
            :to="item.to"
            class="dropdown-item"
            role="menuitem"
            @click="close"
          >
            <span class="dropdown-item-title">{{ item.label }}<span v-if="item.hint" class="sr-only"> — {{ item.hint }}</span></span>
            <span v-if="item.hint" class="dropdown-item-hint">{{ item.hint }}</span>
          </router-link>
          <a
            v-else
            :href="item.href"
            :target="item.external ? '_blank' : undefined"
            :rel="item.external ? 'noopener' : undefined"
            class="dropdown-item"
            role="menuitem"
            @click="close"
          >
            <span class="dropdown-item-title">{{ item.label }}</span>
            <span v-if="item.hint" class="dropdown-item-hint">{{ item.hint }}</span>
            <span v-if="item.external" class="external-mark">↗</span>
          </a>
        </template>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  label: { type: String, required: true },
  active: { type: Boolean, default: false },
  items: { type: Array, required: true },
})

const route = useRoute()
const root = ref(null)
const open = ref(false)

const toggle = () => { open.value = !open.value }
const close = () => { open.value = false }

const onDocClick = (e) => {
  if (root.value && !root.value.contains(e.target)) close()
}

watch(() => route.fullPath, close)

onMounted(() => document.addEventListener('click', onDocClick))
onUnmounted(() => document.removeEventListener('click', onDocClick))
</script>

<style scoped>
.dropdown-trigger {
  @apply inline-flex items-center gap-1;
}

.chevron {
  @apply w-3.5 h-3.5 transition-transform duration-200;
}

.chevron.rotated {
  transform: rotate(180deg);
}

.dropdown-panel {
  @apply absolute left-0 top-full pt-2 z-50;
  @apply min-w-64 p-2 rounded-xl;
  @apply bg-light-bg dark:bg-dark-bg;
  @apply border border-light-border dark:border-dark-border;
  @apply shadow-lg;
}

.dropdown-item {
  @apply flex flex-col px-3 py-2 rounded-lg transition-colors;
  @apply hover:bg-light-surface dark:hover:bg-dark-surface;
}

.dropdown-item-title {
  @apply text-sm font-medium text-light-text dark:text-dark-text;
}

.dropdown-item-hint {
  @apply text-xs text-light-muted dark:text-dark-muted;
}

.external-mark {
  @apply ml-auto self-center text-[10px] opacity-60 text-light-muted dark:text-dark-muted;
}

.dropdown-divider {
  @apply my-2 h-px;
  @apply bg-light-border dark:bg-dark-border;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 150ms ease, transform 150ms ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
