<template>
  <section class="products-section section-padding">
    <div class="container-wide">
      <div class="text-center mb-12">
        <h2 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">
          The Omnizip Suite
        </h2>
        <p class="text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
          Four specialized libraries designed to handle all your compression needs,
          from common archives to Microsoft-specific formats to recursive extraction —
          now with a pure Rust codec family for production-grade speed.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <!-- Omnizip -->
        <ProductCard
          title="Omnizip"
          subtitle="The Complete Solution"
          description="Comprehensive compression library with full bidirectional support for 15+ formats. Create and extract 7z, ZIP, RAR4/5, TAR, ISO, XAR, RPM, OLE, XZ, GZIP, BZIP2, CPIO, PAR2."
          emoji="📦"
          accent-color="#c5505c"
          :formats="['7z', 'ZIP', 'RAR4', 'RAR5', 'TAR', 'ISO', 'XAR', 'RPM', 'OLE', 'XZ', 'GZIP', 'BZIP2']"
          :docs-link="config.docs.omnizip"
          :github-link="config.github.omnizip"
        />

        <!-- omnizip-rs -->
        <ProductCard
          title="omnizip-rs"
          subtitle="Pure Rust Codecs"
          description="31 pure Rust crates: codecs at reference parity (LZMA, ZSTD, Brotli, bzip2…) plus the full archive-container layer — ZIP, 7z, RAR, TAR, ISO, RPM — and ozip, one deterministic binary for them all."
          emoji="🦀"
          accent-color="#b274e2"
          :formats="['LZMA', 'ZSTD', 'ZIP', '7z', 'RAR', 'TAR', 'ISO', 'RPM', 'ozip']"
          docs-link="/rust"
          :github-link="config.github.rust"
        />

        <!-- Cabriolet -->
        <ProductCard
          title="Cabriolet"
          subtitle="Microsoft Formats"
          description="Specialized library for Microsoft cabinet and help formats. Complete bidirectional support for CAB, CHM, SZDD, KWAJ, HLP, LIT, and OAB. Exclusive Windows Help support."
          emoji="🚗"
          accent-color="#58bab7"
          :formats="['CAB', 'CHM', 'SZDD', 'KWAJ', 'HLP', 'LIT', 'OAB']"
          :docs-link="config.docs.cabriolet"
          :github-link="config.github.cabriolet"
        />

        <!-- Excavate -->
        <ProductCard
          title="Excavate"
          subtitle="Recursive Extraction"
          description="Unified extraction interface for nested archives. Extract archives within archives with a single command. Supports MSI, RPM, PKG, and all common formats. Built on Omnizip & Cabriolet."
          emoji="⛏️"
          accent-color="#f2a764"
          :formats="['ZIP', '7z', 'TAR', 'GZIP', 'XZ', 'CAB', 'MSI', 'RPM', 'PKG', 'CPIO']"
          :docs-link="config.docs.excavate"
          :github-link="config.github.excavate"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import ProductCard from '../molecules/ProductCard.vue'
import config from '../../config'
</script>
