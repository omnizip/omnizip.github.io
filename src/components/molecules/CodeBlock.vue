<template>
  <div class="code-block glass-card overflow-hidden">
    <div class="flex items-center justify-between px-4 py-2 border-b border-light-border dark:border-dark-border">
      <span class="text-sm font-medium text-light-muted dark:text-dark-muted">
        {{ language }}
      </span>
      <button
        class="copy-btn"
        :class="{ copied: isCopied }"
        @click="copyCode"
      >
        <span v-if="!isCopied">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
            <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
          </svg>
        </span>
        <span v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
    </div>
    <pre class="p-4 overflow-x-auto text-sm"><code :class="`language-${language}`"><slot /></code></pre>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  language: {
    type: String,
    default: 'ruby',
  },
})

const isCopied = ref(false)

const copyCode = async () => {
  const code = document.querySelector('.code-block code')?.textContent || ''
  try {
    await navigator.clipboard.writeText(code)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.code-block pre {
  @apply bg-dark-bg text-dark-text;
  font-family: 'JetBrains Mono', monospace;
}

.code-block code {
  @apply text-sm leading-relaxed;
}

.copy-btn {
  @apply p-1.5 rounded-md;
  @apply text-dark-muted hover:text-dark-text;
  @apply transition-all duration-200;
}

.copy-btn.copied {
  @apply text-accent-teal;
}
</style>
