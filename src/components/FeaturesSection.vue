<script setup>
import SpotlightCard from "./SpotlightCard.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
    <!-- Feature 1 -->
    <SpotlightCard spotlightColor="rgba(168, 85, 247, 1.0)">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-2xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/50 rounded-2xl p-8 transition-all duration-300"
      >
        <div
          class="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
        >
          ✍️
        </div>
        <h3 class="text-2xl font-bold text-white font-poppins mb-3">
          Rich Word Management
        </h3>
        <p class="text-gray-400 font-poppins">
          Add words with pronunciation, definitions, example sentences, and
          phonetic guides. Your complete vocabulary companion.
        </p>
        <div class="mt-6 flex gap-2">
          <span
            class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 font-poppins"
            >Phonetics</span
          >
          <span
            class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 font-poppins"
            >Examples</span
          >
        </div>
      </div>
    </SpotlightCard>

    <!-- Feature 2 -->
    <SpotlightCard spotlightColor="rgba(100, 149, 237, 1.0)">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover:from-blue-600/10 group-hover:to-purple-600/10 rounded-2xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-slate-800/50 backdrop-blur-xl border border-blue-500/20 group-hover:border-blue-400/50 rounded-2xl p-8 transition-all duration-300"
      >
        <div
          class="text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300"
        >
          🏷️
        </div>
        <h3 class="text-2xl font-bold text-white font-poppins mb-3">
          Smart Categorization
        </h3>
        <p class="text-gray-400 font-poppins">
          Organize words into custom categories. Create, edit, and manage your
          taxonomy of knowledge effortlessly.
        </p>
        <div class="mt-6 flex gap-2">
          <span
            class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300 font-poppins"
            >Custom Tags</span
          >
          <span
            class="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-sm text-blue-300 font-poppins"
            >Organize</span
          >
        </div>
      </div>
    </SpotlightCard>

    <!-- Feature 3 -->
    <SpotlightCard spotlightColor="rgba(236, 72, 153, 1.0)">
      <div
        class="absolute inset-0 bg-gradient-to-r from-pink-600/0 to-blue-600/0 group-hover:from-pink-600/10 group-hover:to-blue-600/10 rounded-2xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-slate-800/50 backdrop-blur-xl border border-pink-500/20 group-hover:border-pink-400/50 rounded-2xl p-8 transition-all duration-300"
      >
        <div
          class="text-5xl mb-6 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
        >
          🔍
        </div>
        <h3 class="text-2xl font-bold text-white font-poppins mb-3">
          Comprehensive Search
        </h3>
        <p class="text-gray-400 font-poppins">
          Instantly locate vocabulary by matching text within definitions and
          examples, not just the word itself.
        </p>
        <div class="mt-6 flex gap-2">
          <span
            class="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm text-pink-300 font-poppins"
            >Real-time</span
          >
          <span
            class="px-3 py-1 bg-pink-500/20 border border-pink-500/30 rounded-full text-sm text-pink-300 font-poppins"
            >Instant</span
          >
        </div>
      </div>
    </SpotlightCard>

    <!-- Feature 4 -->
    <SpotlightCard spotlightColor="rgba(139, 92, 246, 1.0)">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 rounded-2xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-slate-800/50 backdrop-blur-xl border border-purple-500/20 group-hover:border-purple-400/50 rounded-2xl p-8 transition-all duration-300"
      >
        <div
          class="text-5xl mb-6 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-300"
        >
          📊
        </div>
        <h3 class="text-2xl font-bold text-white font-poppins mb-3">
          Analytics & Insights
        </h3>
        <p class="text-gray-400 font-poppins">
          Track your learning journey with beautiful charts and statistics.
          Monitor growth, streaks, and achievements.
        </p>
        <div class="mt-6 flex gap-2">
          <span
            class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 font-poppins"
            >Charts</span
          >
          <span
            class="px-3 py-1 bg-purple-500/20 border border-purple-500/30 rounded-full text-sm text-purple-300 font-poppins"
            >Statistics</span
          >
        </div>
      </div>
    </SpotlightCard>
  </div>
</template>
