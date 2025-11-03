<!-- filepath: src/components/ConfirmModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
    @click.self="cancel"
  >
    <div class="bg-white rounded-lg shadow-2xl w-96">
      <div class="bg-red-500 px-6 py-4 rounded-t-lg">
        <h2 class="text-xl font-semibold text-white font-poppins">
          {{ title }}
        </h2>
      </div>
      <div class="p-6">
        <p class="mb-6 text-gray-700 font-poppins">{{ message }}</p>
        <div class="flex justify-end space-x-4">
          <button
            @click="confirm"
            class="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors font-poppins font-semibold cursor-pointer"
          >
            Confirm Delete
          </button>
          <button
            @click="cancel"
            class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg transition-colors font-poppins font-semibold cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, onMounted } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  title: {
    type: String,
    default: "Confirm Action",
  },
  message: {
    type: String,
    default: "Are you sure you want to proceed?",
  },
});

const emits = defineEmits(["confirm", "cancel"]);

const confirm = () => emits("confirm");
const cancel = () => emits("cancel");

const handleKeydown = (e) => {
  if (e.key === "Escape") cancel();
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
