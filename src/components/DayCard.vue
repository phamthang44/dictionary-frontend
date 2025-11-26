<template>
  <div
    class="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-xl opacity-0 group-hover/day:opacity-100 transition-all duration-300 blur"
  ></div>
  <div
    class="relative bg-slate-800/60 border border-purple-500/20 group-hover/day:border-purple-400/50 rounded-xl p-4 text-center backdrop-blur-sm transition-all duration-300 group-hover/day:translate-y-[-4px]"
  >
    <p class="text-sm font-poppins text-gray-400 uppercase tracking-wider">
      {{ day.name }}
    </p>
    <p
      class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-3 font-poppins"
    >
      {{ day.words }}
    </p>
    <p class="text-xs text-gray-500 mt-2 font-poppins">words added</p>

    <!-- Visual bar -->
    <div
      class="mt-3 h-1 bg-slate-700/50 rounded-full overflow-hidden relative group"
    >
      <div
        :style="{
          width: `${Math.min((day.words / dailyGoal) * 100, 100)}%`,
        }"
        :class="[
          'h-full transition-all duration-500 relative',
          day.words >= dailyGoal
            ? 'bg-gradient-to-r from-amber-400 via-orange-500 to-red-600 shadow-[0_0_12px_rgba(234,88,12,0.8)]'
            : 'bg-gradient-to-r from-purple-500 to-pink-500',
        ]"
      >
        <div
          v-if="day.words >= dailyGoal"
          class="absolute inset-0 bg-white/30 animate-pulse"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  day: {
    type: Object,
    required: true,
  },
  dailyGoal: {
    type: Number,
    required: true,
  },
});
</script>
