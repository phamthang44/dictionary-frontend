<!-- filepath: src/views/Statistics.vue -->
<template>
  <div class="min-h-screen bg-purple-950 text-white overflow-hidden relative">
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute bottom-[-10%] left-[20%] w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 py-32 z-10">
      <!-- Header -->
      <div class="mb-16 text-center">
        <div
          class="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-poppins mb-6"
        >
          ✨ Your Learning Journey
        </div>
        <h1 class="text-6xl md:text-7xl font-bold text-white font-poppins mb-4">
          📊 Learning
          <span
            class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
          >
            Statistics
          </span>
        </h1>
        <p class="text-xl text-gray-300 font-poppins max-w-2xl mx-auto">
          Track your vocabulary growth and monitor your progress toward mastery
        </p>
      </div>
      <GoalSetter
        :currentDailyGoal="dailyGoal"
        :todaysProgress="todaysWords"
        @update-goal="handleUpdateGoal"
      />
      <!-- Top Stats Cards -->
      <TopStatsSection :stats="stats" />

      <!-- Charts Section -->
      <div class="mb-12">
        <ChartSection
          :chartData="chartData"
          :topCategories="topCategories"
          :totalWordCount="stats.totalWords"
        />
      </div>

      <!-- Weekly Activity -->
      <div class="group relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"
        ></div>
        <div
          class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 group-hover:border-purple-400/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300"
        >
          <div class="flex justify-between items-center mb-8">
            <div>
              <h2 class="text-3xl font-bold text-white font-poppins mb-2">
                📅 Weekly Activity
              </h2>
              <p class="text-gray-400 text-sm font-poppins">
                Last 7 days of your learning journey
              </p>
            </div>
            <div
              class="text-center px-6 py-3 bg-purple-500/10 border border-purple-500/30 rounded-lg backdrop-blur-sm"
            >
              <p
                class="text-xs text-gray-400 font-poppins uppercase tracking-wider"
              >
                Date Range
              </p>
              <p
                class="text-sm text-purple-300 font-poppins font-semibold mt-1"
              >
                {{ formatDate(getLastSevenDaysStart()) }} -
                {{ formatDate(getToday()) }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-7 gap-3">
            <div
              v-for="day in weeklyActivity"
              :key="day.name"
              class="group/day relative"
            >
              <DayCard :day="day" :dailyGoal="dailyGoal" />
            </div>
          </div>

          <WeeklySummary :weeklyActivity="weeklyActivity" />
        </div>
      </div>
    </div>
  </div>

  <SpinnerLoading :show="isLoading" message="Loading Statistics..." />
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import SpinnerLoading from "../components/SpinnerLoading.vue";
import statisticsApi from "../api/statisticsApi.js";
import ChartSection from "../components/ChartSection.vue";
import WeeklySummary from "../components/WeeklySummary.vue";
import DayCard from "../components/DayCard.vue";
import TopStatsSection from "../components/TopStatsSection.vue";
import GoalSetter from "../components/GoalSetter.vue";
const isLoading = ref(false);
const getSavedGoal = () => {
  const savedGoal = localStorage.getItem("user_daily_goal");
  return savedGoal ? Number(savedGoal) : 20; // Default to 20 if not found
};
const dailyGoal = ref(getSavedGoal());
const todaysWords = ref(0);

const stats = ref({
  totalWords: 0,
  wordsAddedThisMonth: 0,
  streak: 0,
  avgWordsPerDay: 0,
  categoryStats: {},
});

const chartData = ref([
  { month: "Jan", words: 0 },
  { month: "Feb", words: 0 },
  { month: "Mar", words: 0 },
  { month: "Apr", words: 0 },
  { month: "May", words: 0 },
  { month: "Jun", words: 0 },
  { month: "Jul", words: 0 },
  { month: "Aug", words: 0 },
  { month: "Sep", words: 0 },
  { month: "Oct", words: 0 },
  { month: "Nov", words: 0 },
  { month: "Dec", words: 0 },
]);

const topCategories = ref([]);

const weeklyActivity = ref([
  { name: "Sun", words: 0 },
  { name: "Mon", words: 0 },
  { name: "Tue", words: 0 },
  { name: "Wed", words: 0 },
  { name: "Thu", words: 0 },
  { name: "Fri", words: 0 },
  { name: "Sat", words: 0 },
]);

const getLastSevenDaysStart = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6);
  return sevenDaysAgo;
};

const getToday = () => {
  return new Date();
};

const formatDate = (date) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await statisticsApi.getStats();
    console.log("API response:", response.data.data);
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay for demo
    const data = response.data.data;

    stats.value = {
      totalWords: data.totalWords || 0,
      wordsAddedThisMonth: data.wordsAddedThisMonth || 0,
      streak: data.streak || 0,
      avgWordsPerDay: data.avgWordsPerDay || 0,
      categoryStats: data.categoryStats.data || {},
    };

    chartData.value = data.chartData || [];
    weeklyActivity.value = data.weeklyActivity || [];
    topCategories.value = data.topCategories || [];
    todaysWords.value = data.weeklyActivity?.[new Date().getDay()]?.words || 0;
  } catch (error) {
    console.error("❌ Failed to fetch statistics:", error);
  } finally {
    isLoading.value = false;
  }

  const savedGoal = localStorage.getItem("user_daily_goal");
  if (savedGoal) {
    dailyGoal.value = Number(savedGoal);
  }
});

const handleUpdateGoal = (newGoal) => {
  dailyGoal.value = newGoal;
  localStorage.setItem("user_daily_goal", newGoal);
};

watch(dailyGoal, (newVal) => {
  localStorage.setItem("user_daily_goal", newVal);
});
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

@keyframes blob {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(30px, -50px) scale(1.1);
  }
  66% {
    transform: translate(-20px, 20px) scale(0.9);
  }
}

.animate-blob {
  animation: blob 7s infinite;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

.animation-delay-4000 {
  animation-delay: 4s;
}
</style>
