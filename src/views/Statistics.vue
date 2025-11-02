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
              <p class="text-gray-600 text-sm font-poppins">Learning Streak</p>
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

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <!-- Words Added Over Time -->
        <div class="lg:col-span-2 bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 font-poppins mb-6">
            Words Added Over Time
          </h2>
          <div class="h-64 flex items-end gap-2">
            <div
              v-for="(month, index) in chartData"
              :key="index"
              class="flex-1 flex flex-col items-center group"
            >
              <div
                :style="{ height: month.percentage + '%' }"
                class="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:from-blue-600 hover:to-blue-500 transition-all cursor-pointer"
              ></div>
              <p class="text-xs text-gray-600 mt-2 font-poppins">
                {{ month.month }}
              </p>
              <div
                class="absolute bottom-full mb-2 bg-gray-800 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-poppins"
              >
                {{ month.words }} words
              </div>
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
                <span class="text-gray-700 font-poppins">{{
                  category.name
                }}</span>
              </div>
              <span class="font-bold text-gray-800 font-poppins">{{
                category.count
              }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Weekly Activity -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-2xl font-bold text-gray-800 font-poppins mb-6">
          Weekly Activity
        </h2>
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

      <!-- Goals Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Current Goal -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 font-poppins mb-6">
            Current Goal
          </h2>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-700 font-poppins"
                  >Add 100 words this month</span
                >
                <span class="text-gray-600 font-poppins">75 / 100</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full"
                  style="width: 75%"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-700 font-poppins"
                  >Learn 5 categories</span
                >
                <span class="text-gray-600 font-poppins">3 / 5</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-yellow-400 to-yellow-500 h-3 rounded-full"
                  style="width: 60%"
                ></div>
              </div>
            </div>
            <div>
              <div class="flex justify-between mb-2">
                <span class="text-gray-700 font-poppins"
                  >Maintain 7-day streak</span
                >
                <span class="text-gray-600 font-poppins">5 / 7</span>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-red-400 to-red-500 h-3 rounded-full"
                  style="width: 71%"
                ></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Achievements -->
        <div class="bg-white rounded-lg shadow-lg p-6">
          <h2 class="text-2xl font-bold text-gray-800 font-poppins mb-6">
            🏆 Achievements
          </h2>
          <div class="space-y-3">
            <div
              v-for="(achievement, index) in achievements"
              :key="index"
              class="flex items-center gap-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
            >
              <span class="text-3xl">{{ achievement.icon }}</span>
              <div>
                <p class="font-bold text-gray-800 font-poppins">
                  {{ achievement.title }}
                </p>
                <p class="text-sm text-gray-600 font-poppins">
                  {{ achievement.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const stats = ref({
  totalWords: 2450,
  wordsAddedThisMonth: 145,
  categories: 15,
  streak: 12,
  avgWordsPerDay: 8.5,
});

const chartData = ref([
  { month: "Jan", words: 120, percentage: 50 },
  { month: "Feb", words: 150, percentage: 62 },
  { month: "Mar", words: 180, percentage: 75 },
  { month: "Apr", words: 200, percentage: 83 },
  { month: "May", words: 220, percentage: 92 },
  { month: "Jun", words: 240, percentage: 100 },
]);

const topCategories = ref([
  { name: "Technology", count: 450, color: "#3B82F6" },
  { name: "Science", count: 380, color: "#10B981" },
  { name: "Literature", count: 320, color: "#F59E0B" },
  { name: "Business", count: 280, color: "#EF4444" },
  { name: "Health", count: 250, color: "#8B5CF6" },
]);

const weeklyActivity = ref([
  { name: "Mon", words: 12 },
  { name: "Tue", words: 14 },
  { name: "Wed", words: 10 },
  { name: "Thu", words: 16 },
  { name: "Fri", words: 18 },
  { name: "Sat", words: 8 },
  { name: "Sun", words: 6 },
]);

const achievements = ref([
  {
    icon: "🚀",
    title: "Fast Learner",
    description: "Added 100 words in a month",
  },
  {
    icon: "🔥",
    title: "On Fire",
    description: "12-day learning streak",
  },
  {
    icon: "🎯",
    title: "Goal Setter",
    description: "Created and followed a learning goal",
  },
  {
    icon: "⭐",
    title: "Category Master",
    description: "Added words in 10+ categories",
  },
]);
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
