<!-- filepath: src/components/AlertModal.vue -->
<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
    @click.self="closeAlert"
  >
    <div
      class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl shadow-purple-500/40 max-w-md w-full border border-purple-500/30 overflow-hidden transform transition-all duration-300 scale-100 opacity-100"
      :class="{
        'scale-95 opacity-0': !show,
      }"
    >
      <!-- Alert Icon & Header -->
      <div
        class="bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-blue-600/80 px-8 py-8 text-center border-b border-purple-500/30 backdrop-blur-sm"
      >
        <div class="flex justify-center mb-4">
          <div class="text-6xl animate-bounce" :class="getTitleEmoji"></div>
        </div>
        <h2 class="text-2xl font-bold text-white font-poppins">
          {{ title }}
        </h2>
      </div>

      <!-- Message Content -->
      <div class="px-8 py-6">
        <p class="text-gray-300 text-center font-poppins leading-relaxed">
          {{ message }}
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="px-8 py-6 flex gap-3 border-t border-purple-500/20">
        <button
          @click="closeAlert"
          class="flex-1 group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
        >
          <span class="relative z-10">OK</span>
          <div
            class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
          ></div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["close"]);

// Determine emoji based on title content
const getTitleEmoji = computed(() => {
  const titleLower = props.title.toLowerCase();

  if (titleLower.includes("error") || titleLower.includes("failed")) {
    return "text-red-400";
  } else if (titleLower.includes("success") || titleLower.includes("✅")) {
    return "text-green-400";
  } else if (titleLower.includes("warning") || titleLower.includes("⚠️")) {
    return "text-yellow-400";
  } else if (titleLower.includes("info") || titleLower.includes("ℹ️")) {
    return "text-blue-400";
  } else {
    return "text-purple-400";
  }
});

const closeAlert = () => {
  emit("close");
};

// Auto-close after 5 seconds for non-error alerts
const autoClose = (timeout = 5000) => {
  if (!props.title.toLowerCase().includes("error")) {
    setTimeout(closeAlert, timeout);
  }
};

// ✅ NEW: Watch for show changes
import { watch } from "vue";
watch(
  () => props.show,
  (newVal) => {
    if (newVal) {
      autoClose();
    }
  }
);
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}

/* Smooth modal entry animation */
.scale-100 {
  animation: modalEnter 0.3s ease-out;
}

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
