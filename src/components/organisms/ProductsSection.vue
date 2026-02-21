<template>
  <section class="products-section section-padding">
    <div class="container-wide">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          Our Products
        </h2>
        <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Two specialized libraries designed to handle all your compression needs,
          from common archives to Microsoft-specific formats.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Omnizip - 60% -->
        <div class="lg:col-span-3">
          <ProductCard
            title="Omnizip"
            subtitle="The Complete Solution"
            description="Comprehensive compression library with full bidirectional support for 15+ formats. Create and extract 7z, ZIP, RAR4/5, TAR, ISO, XAR, RPM, OLE, XZ, GZIP, BZIP2, CPIO, PAR2. Features encryption, multi-volume, solid compression, and error correction."
            emoji="📦"
            accent-color="#c5505c"
            :formats="['7z', 'ZIP', 'RAR4', 'RAR5', 'TAR', 'ISO', 'XAR', 'RPM', 'OLE', 'XZ', 'GZIP', 'BZIP2', 'CPIO', 'PAR2']"
            :docs-link="config.docs.omnizip"
            :github-link="config.github.omnizip"
          />
        </div>

        <!-- Cabriolet - 40% -->
        <div class="lg:col-span-2">
          <ProductCard
            title="Cabriolet"
            subtitle="Microsoft Formats"
            description="Specialized library for Microsoft cabinet and help formats. Complete bidirectional support for CAB, CHM, SZDD, KWAJ, HLP (QuickHelp & WinHelp - exclusive!), LIT, and OAB. 1225+ tests, exceeds libmspack coverage."
            emoji="🚗"
            accent-color="#58bab7"
            :formats="['CAB', 'CHM', 'SZDD', 'KWAJ', 'HLP', 'LIT', 'OAB']"
            :docs-link="config.docs.cabriolet"
            :github-link="config.github.cabriolet"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../molecules/ProductCard.vue'
import config from '../../config'
</script>
