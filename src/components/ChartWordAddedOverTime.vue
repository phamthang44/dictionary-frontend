<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
    <!-- Words Added Over Time -->
    <div class="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 font-poppins mb-6">
        Words Added Over Time
      </h2>
      <!-- Added container with proper flex layout -->
      <div
        class="h-80 flex items-end gap-3 border-l-2 border-b-2 border-gray-300 p-4"
      >
        <div
          v-for="(month, index) in chartData"
          :key="index"
          class="flex-1 flex flex-col items-center group justify-end h-full"
        >
          <!-- Calculate height as percentage of max value -->
          <div
            :style="{ height: getBarHeight(month.words) + '%' }"
            class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer min-h-8 relative"
          >
            <!-- Tooltip -->
            <div
              class="absolute bottom-full mb-2 -left-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-poppins"
            >
              {{ month.words }} words
            </div>
          </div>

          <p class="text-xs text-gray-600 mt-2 font-poppins">
            {{ month.month }}
          </p>
        </div>
      </div>
    </div>

    <!-- Top Categories -->
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-gray-800 font-poppins mb-6">
        Top Categories
      </h2>
      <div class="space-y-4">
        <div
          v-for="(category, index) in topCategories"
          :key="index"
          class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
        >
          <div class="flex items-center gap-3">
            <div
              :style="{ backgroundColor: category.color }"
              class="w-3 h-3 rounded-full"
            ></div>
            <span class="text-gray-700 font-poppins">{{ category.name }}</span>
          </div>
          <span class="font-bold text-gray-800 font-poppins">{{
            category.count
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  topCategories: {
    type: Array,
    required: true,
  },
});

const getBarHeight = (words) => {
  const maxWords = Math.max(...props.chartData.map((month) => month.words));
  return maxWords ? (words / maxWords) * 100 : 0;
};
</script>
