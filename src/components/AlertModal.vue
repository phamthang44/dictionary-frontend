<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
  >
    <div class="bg-white p-6 rounded-xl shadow-lg text-center w-72">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <p class="text-gray-600 mt-2">{{ message }}</p>
      <button
        @click="$emit('close')"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        OK
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
  message: String,
});
</script>
