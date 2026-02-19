<template>
  <section class="features-section section-padding bg-light-surface dark:bg-dark-surface">
    <div class="container-wide">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          Why Omnizip?
        </h2>
        <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Built from the ground up in pure Ruby, Omnizip provides comprehensive
          compression support without the complexity of native extensions.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureCard
          title="Universal Compatibility"
          description="Works on JRuby, TruffleRuby, and any platform where Ruby runs. No compilation or native dependencies required."
          color="teal"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Zero Dependencies"
          description="Pure Ruby implementation means no C extensions to compile, no system libraries to install. Just add the gem and go."
          color="gold"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Comprehensive Support"
          description="Support for 10+ archive formats and 8+ compression algorithms. More comprehensive than libarchive, libmspack, or 7-zip."
          color="purple"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Full Read & Write"
          description="Complete bidirectional support for most formats. Create and extract archives with the same library."
          color="primary"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Microsoft Formats"
          description="Cabriolet provides complete support for CAB, CHM, SZDD, KWAJ, HLP, LIT, and OAB formats."
          color="teal"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </template>
        </FeatureCard>

        <FeatureCard
          title="Enterprise Ready"
          description="3406 tests with 100% pass rate. PAR2 error correction, AES-256 encryption, and parallel processing support."
          color="purple"
        >
          <template #icon>
            <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </template>
        </FeatureCard>
      </div>
    </div>
  </section>
</template>

<script setup>
import FeatureCard from '../molecules/FeatureCard.vue'
</script>
