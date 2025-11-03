<!-- filepath: src/components/SpinnerLoading.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 bg-opacity-40 flex items-center justify-center z-50"
  >
    <div
      class="bg-white rounded-lg shadow-2xl p-8 flex flex-col items-center gap-4"
    >
      <!-- Spinner Animation -->
      <div class="relative w-16 h-16">
        <div
          class="absolute inset-0 rounded-full border-4 border-gray-200 border-t-blue-500 border-r-blue-500 animate-spin"
        ></div>
      </div>

      <!-- Loading Text -->
      <p class="text-gray-700 font-poppins font-semibold text-center">
        {{ message }}
      </p>

      <!-- Optional: Progress Text -->
      <p v-if="showProgress" class="text-sm text-gray-500 font-poppins">
        Please wait...
      </p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  message: {
    type: String,
    default: "Loading...",
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
