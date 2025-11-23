<!-- filepath: src/views/Statistics.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-4xl font-bold text-gray-800 font-poppins mb-2">
          📊 Learning Statistics
        </h1>
        <p class="text-gray-600 font-poppins">
          Track your vocabulary growth and learning progress
        </p>
      </div>

      <!-- Top Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Total Words -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-poppins">Total Words</p>
              <p class="text-4xl font-bold text-gray-800 font-poppins">
                {{ stats.totalWords }}
              </p>
            </div>
            <div class="text-5xl">📚</div>
          </div>
          <p class="text-green-600 text-sm mt-2 font-poppins">
            ↑ +{{ stats.wordsAddedThisMonth }} this month
          </p>
        </div>

        <!-- Categories -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-poppins">Categories</p>
              <p class="text-4xl font-bold text-gray-800 font-poppins">
                {{ stats.categories }}
              </p>
            </div>
            <div class="text-5xl">🏷️</div>
          </div>
          <p class="text-gray-500 text-sm mt-2 font-poppins">
            Organized collections
          </p>
        </div>

        <!-- Learning Streak -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-poppins">Longest Streak</p>
              <p class="text-4xl font-bold text-gray-800 font-poppins">
                {{ stats.streak }}
              </p>
            </div>
            <div class="text-5xl">🔥</div>
          </div>
          <p class="text-orange-600 text-sm mt-2 font-poppins">days in a row</p>
        </div>

        <!-- Average Words/Day -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-gray-600 text-sm font-poppins">Avg. Words/Day</p>
              <p class="text-4xl font-bold text-gray-800 font-poppins">
                {{ stats.avgWordsPerDay }}
              </p>
            </div>
            <div class="text-5xl">📈</div>
          </div>
          <p class="text-blue-600 text-sm mt-2 font-poppins">weekly average</p>
        </div>
      </div>

      <!-- Charts Section -->
      <ChartWordAddedOverTime
        :chartData="chartData"
        :topCategories="topCategories"
      />

      <!-- Weekly Activity -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-2xl font-bold text-gray-800 font-poppins">
            Weekly Activity Last 7 Days
          </h2>
          <span
            class="text-sm text-gray-600 font-poppins bg-blue-50 px-4 py-2 rounded-lg"
          >
            {{ formatDate(getLastSevenDaysStart()) }} to
            {{ formatDate(getToday()) }}
          </span>
        </div>
        <div class="grid grid-cols-7 gap-3">
          <div
            v-for="day in weeklyActivity"
            :key="day.name"
            class="text-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors"
          >
            <p class="text-sm font-poppins text-gray-600">{{ day.name }}</p>
            <p class="text-2xl font-bold text-gray-800 mt-2 font-poppins">
              {{ day.words }}
            </p>
            <p class="text-xs text-gray-500 mt-1 font-poppins">words added</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <SpinnerLoading :show="isLoading" message="Loading Statistics..." />
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import SpinnerLoading from "../components/SpinnerLoading.vue";
import statisticsApi from "../api/statisticsApi.js";
import ChartWordAddedOverTime from "../components/ChartWordAddedOverTime.vue";

const isLoading = ref(false);

const stats = ref({
  totalWords: 0,
  wordsAddedThisMonth: 0,
  categories: 0,
  streak: 0,
  avgWordsPerDay: 0,
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


// Get last 7 days (today - 6 days ago)
const getLastSevenDaysStart = () => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 6); // Go back 6 days (7 days total including today)
  return sevenDaysAgo;
};

// Get today's date
const getToday = () => {
  return new Date();
};

// Format date
const formatDate = (date) => {
  const options = { month: "short", day: "numeric", year: "numeric" };
  return date.toLocaleDateString("en-US", options);
};

onMounted(async () => {
  isLoading.value = true;
  try {
    const response = await statisticsApi.getStats();
    console.log("API response:", response.data.data);

    const data = response.data.data;

    // Assign stats
    stats.value = {
      totalWords: data.totalWords || 0,
      wordsAddedThisMonth: data.wordsAddedThisMonth || 0,
      categories: data.categories || 0,
      streak: data.streak || 0,
      avgWordsPerDay: data.avgWordsPerDay || 0,
    };

    // Assign chart data
    chartData.value = data.chartData || [];

    // Assign weekly activity
    weeklyActivity.value = data.weeklyActivity || [];

    topCategories.value = data.topCategories;

    console.log("✅ Stats loaded successfully:", stats.value);
  } catch (error) {
    console.error("❌ Failed to fetch statistics:", error);
    // Keep default values if API fails
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
