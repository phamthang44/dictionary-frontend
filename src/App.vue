<script setup>
import Footer from "./components/Footer.vue";
</script>
<!-- filepath: src/App.vue -->
<template>
  <div id="app">
    <!-- Navigation Bar -->
    <nav
      class="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-lg sticky top-0 z-40"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <router-link
            to="/"
            class="text-2xl font-bold font-poppins hover:text-blue-100 transition"
          >
            📚 Dictionary
          </router-link>
          <ul class="flex gap-8 items-center">
            <li>
              <router-link
                to="/"
                active-class="text-yellow-300"
                class="hover:text-blue-100 transition font-poppins"
              >
                Home
              </router-link>
            </li>
            <li>
              <router-link
                to="/dictionary"
                active-class="text-yellow-300"
                class="hover:text-blue-100 transition font-poppins"
              >
                My Dictionary
              </router-link>
            </li>
            <li>
              <router-link
                to="/statistics"
                active-class="text-yellow-300"
                class="hover:text-blue-100 transition font-poppins"
              >
                Statistics
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Page Content -->
    <main class="min-h-screen">
      <router-view />
    </main>

    <!-- Footer -->
    <Footer />
  </div>
</template>

<script setup></script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

html {
  scroll-behavior: smooth;
}
</style>
