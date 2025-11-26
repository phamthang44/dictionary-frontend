<template>
  <div class="mt-8 pt-8 border-t border-purple-500/20">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="text-center">
        <p class="text-gray-400 text-sm font-poppins uppercase tracking-wider">
          Total This Week
        </p>
        <p
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-2 font-poppins"
        >
          {{ weeklyActivity.reduce((sum, day) => sum + day.words, 0) }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-gray-400 text-sm font-poppins uppercase tracking-wider">
          Daily Average
        </p>
        <p
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2 font-poppins"
        >
          {{
            Math.round(
              weeklyActivity.reduce((sum, day) => sum + day.words, 0) / 7
            )
          }}
        </p>
      </div>
      <div class="text-center">
        <p class="text-gray-400 text-sm font-poppins uppercase tracking-wider">
          Best Day
        </p>
        <p
          class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 mt-2 font-poppins"
        >
          {{ Math.max(...weeklyActivity.map((d) => d.words), 0) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  weeklyActivity: {
    type: Array,
    required: true,
  },
});
</script>
