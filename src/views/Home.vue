<!-- filepath: src/views/Home.vue -->
<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
  >
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-6 py-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <!-- Left Content -->
        <div class="space-y-6">
          <h1
            class="text-5xl md:text-6xl font-bold text-gray-800 font-poppins leading-tight"
          >
            Build Your
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600"
            >
              Vocabulary
            </span>
          </h1>
          <p class="text-xl text-gray-600 font-poppins">
            Master new words, track your learning progress, and expand your
            knowledge with our beautiful dictionary application.
          </p>
          <div class="flex gap-4 pt-4">
            <router-link
              to="/dictionary"
              class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-poppins py-4 px-8 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
            >
              Get Started →
            </router-link>
            <button
              @click="scrollToFeatures"
              class="cursor-pointer border-2 border-blue-600 text-blue-600 font-poppins py-4 px-8 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>

        <!-- Right Image -->
        <div class="relative">
          <div
            class="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur-3xl opacity-20"
          ></div>
          <div
            class="relative bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform"
          >
            <div class="space-y-4">
              <div class="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <span class="text-3xl">📚</span>
                <div>
                  <p class="font-bold text-gray-800 font-poppins">
                    2,450 Words
                  </p>
                  <p class="text-sm text-gray-600 font-poppins">
                    Added to collection
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 bg-indigo-50 rounded-lg">
                <span class="text-3xl">🎯</span>
                <div>
                  <p class="font-bold text-gray-800 font-poppins">
                    15 Categories
                  </p>
                  <p class="text-sm text-gray-600 font-poppins">
                    Organized by topic
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-4 bg-purple-50 rounded-lg">
                <span class="text-3xl">📈</span>
                <div>
                  <p class="font-bold text-gray-800 font-poppins">
                    85% Progress
                  </p>
                  <p class="text-sm text-gray-600 font-poppins">
                    Learning goals achieved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section ref="featuresSection" class="max-w-7xl mx-auto px-6 py-20">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-800 font-poppins mb-4">
          Powerful Features
        </h2>
        <p class="text-xl text-gray-600 font-poppins">
          Everything you need to master your vocabulary
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Feature Card 1 -->
        <div
          class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow hover:translate-y-[-4px]"
        >
          <div class="text-4xl mb-4">✏️</div>
          <h3 class="text-2xl font-bold text-gray-800 font-poppins mb-3">
            Add & Edit Words
          </h3>
          <p class="text-gray-600 font-poppins">
            Easily add new words with pronunciation, definitions, and examples
            to build your personal dictionary.
          </p>
        </div>

        <!-- Feature Card 2 -->
        <div
          class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow hover:translate-y-[-4px]"
        >
          <div class="text-4xl mb-4">🏷️</div>
          <h3 class="text-2xl font-bold text-gray-800 font-poppins mb-3">
            Organize by Category
          </h3>
          <p class="text-gray-600 font-poppins">
            Categorize words by subject, difficulty level, or any custom
            category that works for you.
          </p>
        </div>

        <!-- Feature Card 3 -->
        <div
          class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow hover:translate-y-[-4px]"
        >
          <div class="text-4xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-800 font-poppins mb-3">
            Quick Search
          </h3>
          <p class="text-gray-600 font-poppins">
            Find any word instantly with our powerful search functionality and
            filtering options.
          </p>
        </div>

        <!-- Feature Card 4 -->
        <div
          class="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow hover:translate-y-[-4px]"
        >
          <div class="text-4xl mb-4">📊</div>
          <h3 class="text-2xl font-bold text-gray-800 font-poppins mb-3">
            Track Progress
          </h3>
          <p class="text-gray-600 font-poppins">
            Monitor your learning progress with detailed statistics and insights
            about your vocabulary growth.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section
      class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20"
    >
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div class="text-5xl font-bold font-poppins mb-2">10K+</div>
            <p class="text-blue-100 font-poppins">Active Users</p>
          </div>
          <div>
            <div class="text-5xl font-bold font-poppins mb-2">100K+</div>
            <p class="text-blue-100 font-poppins">Words Added</p>
          </div>
          <div>
            <div class="text-5xl font-bold font-poppins mb-2">50+</div>
            <p class="text-blue-100 font-poppins">Languages</p>
          </div>
          <div>
            <div class="text-5xl font-bold font-poppins mb-2">99.9%</div>
            <p class="text-blue-100 font-poppins">Uptime</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="max-w-7xl mx-auto px-6 py-20">
      <div
        class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12 text-center border-2 border-blue-200"
      >
        <h2 class="text-4xl font-bold text-gray-800 font-poppins mb-4">
          Ready to Expand Your Vocabulary?
        </h2>
        <p class="text-xl text-gray-600 font-poppins mb-8">
          Start building your dictionary today and track your learning journey.
        </p>
        <router-link
          to="/dictionary"
          class="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-poppins py-4 px-10 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          Launch Dictionary →
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";

const featuresSection = ref(null);

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
