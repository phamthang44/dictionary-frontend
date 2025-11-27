<!-- filepath: src/components/ChartWordAddedOverTime.vue -->
<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
    <!-- Chart Section -->
    <div class="lg:col-span-2 group relative">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 group-hover:border-purple-400/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300"
      >
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-white font-poppins mb-2">
            📈 Words Added Over Time
          </h2>
          <p class="text-gray-400 text-sm font-poppins">
            Track your vocabulary growth throughout the year
          </p>
        </div>

        <!-- Chart Container -->
        <div
          class="bg-slate-900/30 rounded-xl p-6 border border-purple-500/10 backdrop-blur-sm"
        >
          <canvas
            ref="chartCanvas"
            class="max-h-80"
            style="max-width: 100%; height: auto"
          ></canvas>
        </div>

        <!-- Chart Stats -->
        <div class="mt-6 grid grid-cols-3 gap-4">
          <div
            class="text-center px-4 py-3 bg-purple-500/10 border border-purple-500/20 rounded-lg"
          >
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider"
            >
              Peak Month
            </p>
            <p
              class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mt-2 font-poppins"
            >
              {{ peakMonth }}
            </p>
          </div>
          <div
            class="text-center px-4 py-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
          >
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider"
            >
              Total Added
            </p>
            <p
              class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mt-2 font-poppins"
            >
              {{ totalWords }}
            </p>
          </div>
          <div
            class="text-center px-4 py-3 bg-pink-500/10 border border-pink-500/20 rounded-lg"
          >
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider"
            >
              Average/Month
            </p>
            <p
              class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-blue-400 mt-2 font-poppins"
            >
              {{ avgPerMonth }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Top Categories Section -->
    <div class="group relative">
      <div
        class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/30 group-hover:border-blue-400/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300 h-full"
      >
        <div class="mb-6">
          <h2 class="text-3xl font-bold text-white font-poppins mb-2">
            🏆 Top Categories
          </h2>
          <p class="text-gray-400 text-sm font-poppins">
            Your most populated categories
          </p>
        </div>

        <!-- Categories List -->
        <div
          class="space-y-3 max-h-96 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-600 scrollbar-track-slate-800/50"
        >
          <div v-if="topCategories.length === 0" class="text-center py-8">
            <p class="text-gray-400 text-sm font-poppins">No categories yet</p>
          </div>

          <div
            v-for="(category, index) in topCategories"
            :key="category._id"
            class="group/cat relative"
          >
            <div
              class="absolute inset-0 bg-gradient-to-r from-blue-600/0 to-purple-600/0 group-hover/cat:from-blue-600/10 group-hover/cat:to-purple-600/10 rounded-lg transition-all duration-300"
            ></div>
            <div
              class="relative bg-slate-800/60 border border-blue-500/20 group-hover/cat:border-blue-400/50 rounded-lg p-4 backdrop-blur-sm transition-all duration-300 group-hover/cat:translate-x-1"
            >
              <!-- Rank Badge -->
              <div class="flex items-start justify-between mb-3">
                <div
                  :class="[
                    'flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm font-poppins',
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-300 to-gray-400 text-slate-900'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                      : 'bg-blue-500/30 text-blue-300',
                  ]"
                >
                  {{ index + 1 }}
                </div>
                <span
                  :class="[
                    'text-xs font-bold px-2 py-1 rounded-full font-poppins',
                    index === 0
                      ? 'bg-yellow-500/20 text-yellow-300'
                      : index === 1
                      ? 'bg-gray-500/20 text-gray-300'
                      : index === 2
                      ? 'bg-orange-500/20 text-orange-300'
                      : 'bg-blue-500/20 text-blue-300',
                  ]"
                >
                  {{ category.wordCount }} words
                </span>
              </div>

              <!-- Category Name -->
              <p class="font-semibold text-white font-poppins mb-2 truncate">
                {{ category.name }}
              </p>

              <!-- Progress Bar -->
              <div class="h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  :style="{
                    width: `${
                      (category.wordCount /
                        (topCategories[0]?.wordCount || 1)) *
                      100
                    }%`,
                  }"
                  :class="[
                    'h-full transition-all duration-500',
                    index === 0
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-400'
                      : index === 1
                      ? 'bg-gradient-to-r from-gray-300 to-gray-400'
                      : index === 2
                      ? 'bg-gradient-to-r from-orange-600 to-orange-700'
                      : 'bg-gradient-to-r from-blue-500 to-purple-500',
                  ]"
                ></div>
              </div>

              <!-- Percentage -->
              <p class="text-xs text-gray-400 mt-2 font-poppins">
                {{
                  Math.round((category.wordCount / props.totalWordCount) * 100)
                }}% of total dictionary
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import Chart from "chart.js/auto";

const props = defineProps({
  chartData: {
    type: Array,
    required: true,
  },
  topCategories: {
    type: Array,
    required: true,
  },
  totalWordCount: {
    type: Number,
    required: true,
    default: 0,
  },
});

const chartCanvas = ref(null);
let chartInstance = null;

const peakMonth = computed(() => {
  if (!props.chartData.length) return "N/A";
  const max = props.chartData.reduce((prev, current) =>
    prev.words > current.words ? prev : current
  );
  return max.month;
});

const totalWords = computed(() => {
  return props.chartData.reduce((sum, month) => sum + month.words, 0);
});

const avgPerMonth = computed(() => {
  const total = props.chartData.reduce((sum, month) => sum + month.words, 0);
  return Math.round(total / props.chartData.length);
});

const initChart = () => {
  if (chartCanvas.value) {
    const ctx = chartCanvas.value.getContext("2d");

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: props.chartData.map((d) => d.month),
        datasets: [
          {
            label: "Words Added",
            data: props.chartData.map((d) => d.words),
            borderColor: "rgb(168, 85, 247)",
            backgroundColor: "rgba(168, 85, 247, 0.1)",
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "rgb(168, 85, 247)",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
            pointHoverBackgroundColor: "rgb(236, 72, 153)",
            hoverBorderColor: "rgb(236, 72, 153)",
            hoverBorderWidth: 3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
          legend: {
            display: true,
            labels: {
              color: "rgb(209, 213, 219)",
              font: {
                family: "'Poppins', sans-serif",
                size: 12,
                weight: "600",
              },
              padding: 20,
              usePointStyle: true,
            },
          },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.8)",
            titleColor: "#fff",
            bodyColor: "rgb(209, 213, 219)",
            borderColor: "rgb(168, 85, 247)",
            borderWidth: 1,
            padding: 12,
            titleFont: {
              family: "'Poppins', sans-serif",
              size: 14,
              weight: "600",
            },
            bodyFont: {
              family: "'Poppins', sans-serif",
              size: 13,
            },
            callbacks: {
              label: function (context) {
                return `${context.parsed.y} words`;
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(148, 163, 184, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "rgb(148, 163, 184)",
              font: {
                family: "'Poppins', sans-serif",
                size: 12,
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "rgb(148, 163, 184)",
              font: {
                family: "'Poppins', sans-serif",
                size: 12,
              },
            },
          },
        },
      },
    });
  }
};

watch(
  () => props.chartData,
  () => {
    initChart();
  },
  { deep: true }
);

onMounted(() => {
  initChart();
});
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

/* Custom Scrollbar Styling */
.scrollbar-thin::-webkit-scrollbar {
  width: 6px;
}

.scrollbar-thin::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.5);
  border-radius: 10px;
}

.scrollbar-thin::-webkit-scrollbar-thumb {
  background: rgb(37, 99, 235);
  border-radius: 10px;
  transition: background 0.3s;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(59, 130, 246);
}

/* Firefox Scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgb(37, 99, 235) rgba(51, 65, 85, 0.5);
}
</style>
