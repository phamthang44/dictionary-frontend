<!-- filepath: src/App.vue -->
<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const mobileMenuOpen = ref(false);
const route = useRoute();

// ✅ FIXED: Use useRoute() to reactively track current page
const currentPage = computed(() => {
  const path = route.path;

  if (path.includes("/dictionary")) {
    return "dictionary";
  } else if (path.includes("/statistics")) {
    return "statistics";
  } else {
    return "home";
  }
});

// ✅ Check if a page is active
const isPageActive = (pageName) => {
  return currentPage.value === pageName;
};

// ✅ Get active link class
const getNavLinkClass = (pageName) => {
  return isPageActive(pageName)
    ? "text-white font-bold"
    : "text-gray-300 hover:text-white transition duration-300";
};
</script>

<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav
      class="fixed top-0 w-full z-50 backdrop-blur-xl bg-gradient-to-r from-slate-900/80 via-purple-900/80 to-slate-900/80 border-b border-purple-500/50 shadow-2xl shadow-purple-500/10"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <router-link
            to="/"
            class="group flex items-center gap-3 font-poppins"
          >
            <div class="relative">
              <div
                class="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"
              ></div>
              <div class="relative px-3 py-2 bg-slate-900 rounded-lg">
                <span
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
                >
                  📚
                </span>
              </div>
            </div>
            <span
              class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 group-hover:from-purple-300 group-hover:to-blue-300 transition duration-300"
            >
              Vocabulary Master
            </span>
          </router-link>

          <!-- Desktop Menu -->
          <ul class="hidden md:flex gap-12 items-center text-lg font-semibold">
            <!-- Home Link -->
            <li>
              <router-link
                to="/"
                class="group relative font-poppins transition duration-300"
                :class="[
                  isPageActive('home')
                    ? 'text-white font-bold'
                    : 'text-gray-300 hover:text-white',
                ]"
              >
                <span class="relative z-10 flex items-center gap-2">
                  🏠 Home
                  <!-- ✅ Active indicator dot -->
                  <span
                    v-if="isPageActive('home')"
                    class="inline-block w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse"
                  ></span>
                </span>
                <!-- ✅ Active underline -->
                <div
                  :class="[
                    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300',
                    isPageActive('home') ? 'w-full' : 'w-0 group-hover:w-full',
                  ]"
                ></div>
              </router-link>
            </li>

            <!-- Dictionary Link -->
            <li>
              <router-link
                to="/dictionary"
                class="group relative font-poppins transition duration-300"
                :class="[
                  isPageActive('dictionary')
                    ? 'text-white font-bold'
                    : 'text-gray-300 hover:text-white',
                ]"
              >
                <span class="relative z-10 flex items-center gap-2">
                  📚 My Dictionary
                  <!-- ✅ Active indicator dot -->
                  <span
                    v-if="isPageActive('dictionary')"
                    class="inline-block w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"
                  ></span>
                </span>
                <!-- ✅ Active underline -->
                <div
                  :class="[
                    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300',
                    isPageActive('dictionary')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full',
                  ]"
                ></div>
              </router-link>
            </li>

            <!-- Statistics Link -->
            <li>
              <router-link
                to="/statistics"
                class="group relative font-poppins transition duration-300"
                :class="[
                  isPageActive('statistics')
                    ? 'text-white font-bold'
                    : 'text-gray-300 hover:text-white',
                ]"
              >
                <span class="relative z-10 flex items-center gap-2">
                  📊 Statistics
                  <!-- ✅ Active indicator dot -->
                  <span
                    v-if="isPageActive('statistics')"
                    class="inline-block w-2 h-2 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full animate-pulse"
                  ></span>
                </span>
                <!-- ✅ Active underline -->
                <div
                  :class="[
                    'absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300',
                    isPageActive('statistics')
                      ? 'w-full'
                      : 'w-0 group-hover:w-full',
                  ]"
                ></div>
              </router-link>
            </li>
          </ul>

          <!-- CTA Button -->
          <div class="hidden md:block">
            <router-link
              to="/dictionary"
              class="group relative px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins rounded-lg font-semibold overflow-hidden hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105"
            >
              <span class="relative z-10">Get Started</span>
              <div
                class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
              ></div>
            </router-link>
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 group cursor-pointer"
          >
            <span
              :class="[
                'w-6 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300',
                mobileMenuOpen ? 'rotate-45 translate-y-2' : '',
              ]"
            ></span>
            <span
              :class="[
                'w-6 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300',
                mobileMenuOpen ? 'opacity-0' : '',
              ]"
            ></span>
            <span
              :class="[
                'w-6 h-0.5 bg-gradient-to-r from-pink-400 to-blue-400 transition-all duration-300',
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : '',
              ]"
            ></span>
          </button>
        </div>

        <!-- Mobile Menu -->
        <transition
          enter-active-class="transition duration-300 ease-out"
          enter-from-class="opacity-0 -translate-y-4"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 -translate-y-4"
        >
          <div
            v-if="mobileMenuOpen"
            class="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-purple-500/20 mt-2 rounded-b-2xl overflow-hidden"
          >
            <ul class="flex flex-col gap-1 p-6">
              <!-- Mobile Home Link -->
              <li>
                <router-link
                  to="/"
                  @click="mobileMenuOpen = false"
                  :class="[
                    'group block px-4 py-3 rounded-lg transition duration-300 font-poppins font-semibold',
                    isPageActive('home')
                      ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 text-white border-l-4 border-purple-500'
                      : 'text-gray-300 hover:text-white hover:bg-purple-500/10',
                  ]"
                >
                  🏠 Home
                  <!-- ✅ Active indicator -->
                  <span
                    v-if="isPageActive('home')"
                    class="ml-2 inline-block text-purple-400"
                  >
                    ●
                  </span>
                </router-link>
              </li>

              <!-- Mobile Dictionary Link -->
              <li>
                <router-link
                  to="/dictionary"
                  @click="mobileMenuOpen = false"
                  :class="[
                    'group block px-4 py-3 rounded-lg transition duration-300 font-poppins font-semibold',
                    isPageActive('dictionary')
                      ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border-l-4 border-blue-500'
                      : 'text-gray-300 hover:text-white hover:bg-purple-500/10',
                  ]"
                >
                  📚 My Dictionary
                  <!-- ✅ Active indicator -->
                  <span
                    v-if="isPageActive('dictionary')"
                    class="ml-2 inline-block text-blue-400"
                  >
                    ●
                  </span>
                </router-link>
              </li>

              <!-- Mobile Statistics Link -->
              <li>
                <router-link
                  to="/statistics"
                  @click="mobileMenuOpen = false"
                  :class="[
                    'group block px-4 py-3 rounded-lg transition duration-300 font-poppins font-semibold',
                    isPageActive('statistics')
                      ? 'bg-gradient-to-r from-pink-600/30 to-blue-600/30 text-white border-l-4 border-pink-500'
                      : 'text-gray-300 hover:text-white hover:bg-purple-500/10',
                  ]"
                >
                  📊 Statistics
                  <!-- ✅ Active indicator -->
                  <span
                    v-if="isPageActive('statistics')"
                    class="ml-2 inline-block text-pink-400"
                  >
                    ●
                  </span>
                </router-link>
              </li>

              <li class="pt-4 border-t border-purple-500/20">
                <router-link
                  to="/dictionary"
                  @click="mobileMenuOpen = false"
                  class="block px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-poppins font-semibold text-center hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300"
                >
                  Get Started
                </router-link>
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="min-h-screen">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

html {
  scroll-behavior: smooth;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
