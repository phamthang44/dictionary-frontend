<!-- filepath: src/components/CategoryModal.vue -->
<template>
  <div
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
  >
    <div class="bg-white rounded-lg shadow-2xl max-w-md w-full my-8">
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-4 flex justify-between items-center"
      >
        <h2 class="text-2xl font-bold text-white font-poppins">Add Category</h2>
        <button
          @click="$emit('close')"
          class="text-white hover:bg-white hover:text-purple-600 rounded-full w-8 h-8 flex items-center justify-center transition"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="p-6 space-y-4">
        <div>
          <label
            class="block text-sm font-semibold text-gray-700 font-poppins mb-2"
          >
            Category Name *
          </label>
          <input
            v-model="categoryName"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 font-poppins"
            placeholder="e.g., Technology, Science"
          />
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            class="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-poppins py-3 px-4 rounded-lg transition-colors"
          >
            Add
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-poppins py-3 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["save", "close"]);
const categoryName = ref("");

const submit = () => {
  if (categoryName.value.trim()) {
    emit("save", { name: categoryName.value });
    categoryName.value = "";
  }
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
