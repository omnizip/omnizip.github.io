<template>
  <div class="home-page">
    <AnnouncementBanner />
    <HeroSection />
    <FeaturesSection />
    <ProductsSection />
    <CodeSection />
    <FormatsSection />
    <QuickStartSection />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useScrollAnimation } from '../composables/useScrollAnimation'
import AnnouncementBanner from '../components/organisms/AnnouncementBanner.vue'
import HeroSection from '../components/organisms/HeroSection.vue'
import FeaturesSection from '../components/organisms/FeaturesSection.vue'
import ProductsSection from '../components/organisms/ProductsSection.vue'
import CodeSection from '../components/organisms/CodeSection.vue'
import FormatsSection from '../components/organisms/FormatsSection.vue'
import QuickStartSection from '../components/organisms/QuickStartSection.vue'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>
