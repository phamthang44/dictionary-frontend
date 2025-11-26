<template>
  <Transition name="fade">
    <div
      v-if="show"
      class="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/80 backdrop-blur-md"
    >
      <div class="relative flex flex-col items-center justify-center">
        <div class="relative w-24 h-24">
          <div
            class="absolute inset-0 rounded-full bg-purple-500/20 blur-xl animate-pulse"
          ></div>

          <div
            class="absolute inset-0 rounded-full border border-t-purple-500 border-r-purple-500/30 border-b-purple-500/10 border-l-transparent shadow-[0_0_15px_rgba(168,85,247,0.5)] animate-spin-slow"
          ></div>

          <div
            class="absolute inset-2 rounded-full border border-b-pink-500 border-l-pink-500/50 border-t-transparent border-r-transparent shadow-[0_0_10px_rgba(236,72,153,0.5)] animate-spin-reverse"
          ></div>

          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-2 h-2 bg-white rounded-full shadow-[0_0_20px_white] animate-ping-slow"
            ></div>
          </div>
        </div>

        <div class="mt-8 text-center space-y-2 relative z-10">
          <h3
            class="text-white font-poppins text-lg font-light tracking-[0.2em] uppercase animate-pulse"
          >
            {{ message }}
          </h3>
          <p
            v-if="showProgress"
            class="text-purple-300/60 font-poppins text-xs tracking-wider"
          >
            Accessing Neural Network...
          </p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    required: true,
    default: false,
  },
  message: {
    type: String,
    default: "INITIALIZING", // Đổi text mặc định cho ngầu hơn
  },
  showProgress: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
/* Transition Fade khi ẩn hiện */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom Animations */

/* Xoay chậm (3s) */
.animate-spin-slow {
  animation: spin 3s linear infinite;
}

/* Xoay ngược chiều và nhanh hơn một chút (1.5s) */
.animate-spin-reverse {
  animation: spin-reverse 1.5s linear infinite;
}

/* Ping chậm hơn mặc định của tailwind */
.animate-ping-slow {
  animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes spin-reverse {
  to {
    transform: rotate(-360deg);
  }
}

@keyframes ping {
  75%,
  100% {
    transform: scale(2);
    opacity: 0;
  }
}
</style>
