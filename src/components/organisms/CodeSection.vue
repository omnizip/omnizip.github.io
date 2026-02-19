<template>
  <section class="code-section section-padding bg-light-surface dark:bg-dark-surface">
    <div class="container-narrow">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          Simple to Use
        </h2>
        <p class="text-light-muted dark:text-dark-muted">
          Clean, intuitive APIs make working with archives a breeze.
        </p>
      </div>

      <!-- Tabs -->
      <div class="flex justify-center gap-2 mb-6">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab-btn"
          :class="{ active: activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Code panels -->
      <transition name="fade" mode="out-in">
        <CodeBlock
          :key="activeTab"
          :language="currentTab.language"
        >
          {{ currentTab.code }}
        </CodeBlock>
      </transition>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import CodeBlock from '../molecules/CodeBlock.vue'

const activeTab = ref('omnizip')

const tabs = [
  { id: 'omnizip', label: 'Omnizip', language: 'ruby' },
  { id: 'cabriolet', label: 'Cabriolet', language: 'ruby' },
]

const codeExamples = {
  omnizip: `# Install the gem
gem install omnizip

# Read a 7z archive
require 'omnizip'

archive = Omnizip::Archive.open('example.7z')
archive.entries.each do |entry|
  puts entry.name
  content = entry.read
end

# Create a new archive
Omnizip::Archive.create('output.zip') do |zip|
  zip.add_file('document.pdf', '/path/to/document.pdf')
  zip.add_directory('images/', '/path/to/images/')
end

# Extract specific files
archive.extract('document.pdf', '/output/path/')`,

  cabriolet: `# Install the gem
gem install cabriolet

# Read a CAB file
require 'cabriolet'

cab = Cabriolet::Cabinet.open('example.cab')
cab.files.each do |file|
  puts file.name
  content = file.read
end

# Read CHM help file
chm = Cabriolet::Chm.open('documentation.chm')
chm.entries.each do |entry|
  puts entry.path
end

# Extract from OAB (Offline Address Book)
oab = Cabriolet::Oab.open('offline.oab')
oab.extract_all('/output/directory/')`,
}

const currentTab = computed(() => {
  const tab = tabs.find(t => t.id === activeTab.value)
  return {
    ...tab,
    code: codeExamples[tab.id],
  }
})
</script>

<style scoped>
.tab-btn {
  @apply px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200;
  @apply text-light-muted dark:text-dark-muted;
  @apply hover:text-light-text dark:hover:text-dark-text;
  @apply hover:bg-light-bg dark:hover:bg-dark-bg;
}

.tab-btn.active {
  @apply bg-brand-primary/10 text-brand-primary;
}
</style>
