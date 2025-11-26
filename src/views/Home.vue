<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden"
  >
    <!-- Animated-->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-0 left-0 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute top-0 right-0 w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute -bottom-8 left-20 w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <!-- Hero Section -->
    <section class="relative max-w-7xl mx-auto px-6 py-32 z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <!-- Left Content -->
        <div class="space-y-8">
          <div class="space-y-4">
            <div
              class="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-poppins"
            >
              ✨ Master Your Vocabulary
            </div>
            <h1
              class="text-6xl md:text-7xl font-bold font-poppins leading-tight"
            >
              Unlock Your
              <span
                class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse"
              >
                Linguistic Power
              </span>
            </h1>
          </div>
          <p class="text-xl text-gray-300 font-poppins leading-relaxed">
            Dive into a mystical journey of language discovery. Build, organize,
            and master your vocabulary with an elegant dictionary crafted for
            learners who dare to grow.
          </p>

          <div class="flex gap-4 pt-8">
            <router-link
              to="/dictionary"
              class="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins rounded-lg font-semibold overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span class="relative z-10 flex items-center gap-2">
                Begin Your Quest →
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </router-link>
            <button
              @click="scrollToFeatures"
              class="cursor-pointer px-8 py-4 border-2 border-purple-500/50 text-purple-300 font-poppins rounded-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm"
            >
              Explore Features
            </button>
          </div>

          <!-- Trust Stats -->
          <div
            class="grid grid-cols-3 gap-4 pt-8 border-t border-purple-500/20"
          >
            <div>
              <div class="text-3xl font-bold text-purple-400 font-poppins">
                2.5K+
              </div>
              <p class="text-gray-400 text-sm font-poppins">Words Tracked</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-pink-400 font-poppins">
                15
              </div>
              <p class="text-gray-400 text-sm font-poppins">Categories</p>
            </div>
            <div>
              <div class="text-3xl font-bold text-blue-400 font-poppins">
                85%
              </div>
              <p class="text-gray-400 text-sm font-poppins">Growth Rate</p>
            </div>
          </div>
        </div>

        <!-- Right Visual Card -->
        <div class="relative group">
          <div
            class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"
          ></div>
          <div
            class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 rounded-2xl p-8 backdrop-blur-xl hover:border-purple-400/50 transition-all duration-300"
          >
            <div class="space-y-6">
              <!-- Card 1 -->
              <div
                class="group/card flex items-start gap-4 p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 hover:border-purple-400/50 transition-all duration-300 cursor-pointer"
              >
                <div
                  class="text-4xl group-hover/card:scale-110 transition-transform duration-300"
                >
                  📚
                </div>
                <div>
                  <p class="font-bold text-white font-poppins">
                    Smart Organization
                  </p>
                  <p class="text-sm text-gray-400 font-poppins">
                    Auto-categorize your words
                  </p>
                </div>
              </div>

              <!-- Card 2 -->
              <div
                class="group/card flex items-start gap-4 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20 hover:border-blue-400/50 transition-all duration-300 cursor-pointer"
              >
                <div
                  class="text-4xl group-hover/card:scale-110 transition-transform duration-300"
                >
                  ⚡
                </div>
                <div>
                  <p class="font-bold text-white font-poppins">
                    Lightning Fast Search
                  </p>
                  <p class="text-sm text-gray-400 font-poppins">
                    Find any word instantly
                  </p>
                </div>
              </div>

              <!-- Card 3 -->
              <div
                class="group/card flex items-start gap-4 p-4 bg-gradient-to-r from-pink-500/10 to-blue-500/10 rounded-xl border border-pink-500/20 hover:border-pink-400/50 transition-all duration-300 cursor-pointer"
              >
                <div
                  class="text-4xl group-hover/card:scale-110 transition-transform duration-300"
                >
                  📈
                </div>
                <div>
                  <p class="font-bold text-white font-poppins">
                    Visual Progress Tracking
                  </p>
                  <p class="text-sm text-gray-400 font-poppins">
                    Watch your growth unfold
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section
      ref="featuresSection"
      class="relative max-w-7xl mx-auto px-6 py-32 z-10"
    >
      <div class="text-center mb-20">
        <h2 class="text-5xl md:text-6xl font-bold text-white font-poppins mb-4">
          Mystical Features
        </h2>
        <p class="text-xl text-gray-400 font-poppins max-w-2xl mx-auto">
          Powerful tools designed to elevate your vocabulary mastery
        </p>
      </div>

      <FeaturesSection />
    </section>

    <!-- Stats Section -->
    <section class="relative max-w-7xl mx-auto px-6 py-32 z-10">
      <div
        class="bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/30 rounded-3xl backdrop-blur-xl p-12"
      >
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <!-- Stat 1 -->
          <div class="text-center group cursor-pointer">
            <div
              class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 font-poppins group-hover:scale-110 transition-transform duration-300"
            >
              10K+
            </div>
            <p class="text-gray-400 font-poppins mt-2">Active Learners</p>
            <div
              class="w-12 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mt-4 scale-0 group-hover:scale-100 transition-transform duration-300"
            ></div>
          </div>

          <!-- Stat 2 -->
          <div class="text-center group cursor-pointer">
            <div
              class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-poppins group-hover:scale-110 transition-transform duration-300"
            >
              500K+
            </div>
            <p class="text-gray-400 font-poppins mt-2">Words Mastered</p>
            <div
              class="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mt-4 scale-0 group-hover:scale-100 transition-transform duration-300"
            ></div>
          </div>

          <!-- Stat 3 -->
          <div class="text-center group cursor-pointer">
            <div
              class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-400 font-poppins group-hover:scale-110 transition-transform duration-300"
            >
              99.9%
            </div>
            <p class="text-gray-400 font-poppins mt-2">Uptime</p>
            <div
              class="w-12 h-1 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mx-auto mt-4 scale-0 group-hover:scale-100 transition-transform duration-300"
            ></div>
          </div>

          <!-- Stat 4 -->
          <div class="text-center group cursor-pointer">
            <div
              class="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400 font-poppins group-hover:scale-110 transition-transform duration-300"
            >
              24/7
            </div>
            <p class="text-gray-400 font-poppins mt-2">Support</p>
            <div
              class="w-12 h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mx-auto mt-4 scale-0 group-hover:scale-100 transition-transform duration-300"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative max-w-7xl mx-auto px-6 py-32 z-10">
      <div class="relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-2xl"
        ></div>
        <div
          class="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-16 text-center hover:border-purple-400/50 transition-all duration-300"
        >
          <h2
            class="text-5xl md:text-6xl font-bold text-white font-poppins mb-6"
          >
            Ready to Master Your
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
            >
              Vocabulary?
            </span>
          </h2>
          <p class="text-xl text-gray-300 font-poppins mb-10 max-w-2xl mx-auto">
            Join thousands of language learners who have transformed their
            vocabulary journey. Start your mystical adventure today.
          </p>
          <div class="flex gap-4 justify-center flex-wrap">
            <router-link
              to="/dictionary"
              class="group relative px-10 py-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins rounded-lg font-semibold overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span class="relative z-10 flex items-center gap-2">
                Begin Your Journey Now →
              </span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </router-link>
            <button
              class="px-10 py-5 border-2 border-purple-500/50 text-purple-300 font-poppins rounded-lg hover:bg-purple-500/10 hover:border-purple-400 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import FeaturesSection from "../components/FeaturesSection.vue";
import Footer from "../components/Footer.vue";
const featuresSection = ref(null);

const scrollToFeatures = () => {
  featuresSection.value?.scrollIntoView({ behavior: "smooth" });
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
