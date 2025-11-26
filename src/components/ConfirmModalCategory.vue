<!-- filepath: src/components/ConfirmModalCategory.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
    @click.self="cancel"
  >
    <div
      class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl shadow-orange-500/30 max-w-md w-full border border-orange-500/30 overflow-hidden transform transition-all duration-300"
    >
      <!-- Header with Icon -->
      <div
        class="bg-gradient-to-r from-orange-600/80 via-red-600/80 to-orange-600/80 px-8 py-8 text-center border-b border-orange-500/30 backdrop-blur-sm"
      >
        <div class="flex justify-center mb-4">
          <div class="text-6xl animate-pulse">⚠️</div>
        </div>
        <h2 class="text-2xl font-bold text-white font-poppins">
          {{ title }}
        </h2>
        <p class="text-orange-100 text-sm font-poppins mt-2">
          Deleting this category will affect all related words
        </p>
      </div>

      <!-- Message Content -->
      <div class="px-8 py-6">
        <p class="text-gray-300 text-center font-poppins leading-relaxed">
          {{ message }}
        </p>

        <!-- Warning Box -->
        <div
          class="mt-4 bg-orange-500/10 border border-orange-500/30 rounded-lg p-4"
        >
          <p class="text-xs text-orange-300 font-poppins font-semibold">
            ⚡ WARNING
          </p>
          <p class="text-xs text-gray-400 font-poppins mt-2">
            Breaking this seal will cast all contained words into the Void
            (Uncategorized). Are you sure?
          </p>
        </div>
      </div>

      <!-- Buttons -->
      <div class="px-8 py-6 flex gap-4 border-t border-orange-500/20">
        <button
          @click="confirm"
          class="flex-1 group relative px-4 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-poppins font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          <span class="relative z-10">⚠️ Delete Category</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
        </button>
        <button
          @click="cancel"
          class="flex-1 px-4 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white font-poppins font-semibold rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 cursor-pointer"
        >
          Cancel
        </button>
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

/* Smooth modal entry animation */
@keyframes modalEnter {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
