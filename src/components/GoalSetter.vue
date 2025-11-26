<!-- filepath: src/components/GoalSetter.vue -->
<template>
  <div class="group relative mb-12">
    <div
      class="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"
    ></div>
    <div
      class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/30 group-hover:border-blue-400/50 rounded-2xl p-8 backdrop-blur-xl transition-all duration-300"
    >
      <!-- Header -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-white font-poppins mb-2">
          🎯 Daily Goal
        </h2>
        <p class="text-gray-400 text-sm font-poppins">
          Set your daily vocabulary target and track your progress
        </p>
      </div>

      <!-- Goal Setting Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Input Section -->
        <div class="md:col-span-2 space-y-4">
          <div class="space-y-2">
            <label
              class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
            >
              Words Per Day Target
            </label>
            <div class="flex gap-3 items-end">
              <div class="flex-1 relative">
                <input
                  v-model.number="goalInput"
                  type="number"
                  min="1"
                  max="100"
                  class="w-full px-4 py-4 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins text-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  placeholder="Enter daily goal"
                  @keydown.enter="saveGoal"
                />
                <span
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 font-poppins"
                >
                  words
                </span>
              </div>
              <button
                @click="saveGoal"
                :disabled="!isGoalChanged"
                class="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-poppins font-semibold rounded-lg transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                Save
              </button>
            </div>
            <p class="text-xs text-gray-400 font-poppins mt-2">
              Recommended: 10-30 words per day for steady progress
            </p>
          </div>

          <!-- Preset Goals -->
          <div class="space-y-2">
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider"
            >
              Quick presets
            </p>
            <div class="flex gap-2 flex-wrap">
              <button
                v-for="preset in presets"
                :key="preset"
                @click="setPreset(preset)"
                :class="[
                  'px-4 py-2 rounded-lg font-poppins font-semibold text-sm transition-all duration-300 cursor-pointer',
                  goalInput === preset
                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                    : 'bg-slate-700/50 text-gray-300 border border-slate-600/50 hover:border-blue-500/50 hover:text-white',
                ]"
              >
                {{ preset }}
              </button>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="space-y-3">
          <!-- Current Goal -->
          <div
            class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm"
          >
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider mb-2"
            >
              Current Goal
            </p>
            <p
              class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 font-poppins"
            >
              {{ dailyGoal }}
            </p>
            <p class="text-xs text-gray-400 font-poppins mt-1">words/day</p>
          </div>

          <!-- Monthly Target -->
          <div
            class="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4 backdrop-blur-sm"
          >
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider mb-2"
            >
              Monthly Target
            </p>
            <p
              class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-poppins"
            >
              {{ monthlyTarget }}
            </p>
            <p class="text-xs text-gray-400 font-poppins mt-1">words/month</p>
          </div>

          <!-- Yearly Target -->
          <div
            class="bg-green-500/10 border border-green-500/30 rounded-lg p-4 backdrop-blur-sm"
          >
            <p
              class="text-xs text-gray-400 font-poppins uppercase tracking-wider mb-2"
            >
              Yearly Target
            </p>
            <p
              class="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 font-poppins"
            >
              {{ yearlyTarget }}
            </p>
            <p class="text-xs text-gray-400 font-poppins mt-1">words/year</p>
          </div>
        </div>
      </div>

      <!-- Progress Indicator -->
      <div class="mt-8 pt-8 border-t border-blue-500/20">
        <div class="flex items-center justify-between mb-3">
          <p class="text-sm font-semibold text-gray-300 font-poppins">
            Your Progress Today
          </p>
          <span class="text-sm text-blue-300 font-poppins font-semibold">
            {{ todaysProgress }} / {{ dailyGoal }} words
          </span>
        </div>
        <div class="w-full bg-slate-700/50 rounded-full h-3 overflow-hidden">
          <div
            :style="{ width: `${progressPercentage}%` }"
            class="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 rounded-full"
          ></div>
        </div>
        <p class="text-xs text-gray-400 font-poppins mt-2">
          {{ progressPercentage }}% of today's goal
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  currentDailyGoal: {
    type: Number,
    default: 20,
  },
  todaysProgress: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["update-goal"]);

const goalInput = ref(props.currentDailyGoal);
const presets = [10, 15, 20, 25, 30];

const isGoalChanged = computed(() => {
  return goalInput.value !== props.currentDailyGoal;
});

const monthlyTarget = computed(() => {
  return goalInput.value * 30;
});

const yearlyTarget = computed(() => {
  return goalInput.value * 365;
});

const progressPercentage = computed(() => {
  const percentage = (props.todaysProgress / goalInput.value) * 100;
  return Math.min(Math.round(percentage), 100);
});

const dailyGoal = computed(() => {
  return goalInput.value;
});

const saveGoal = () => {
  if (goalInput.value < 1 || goalInput.value > 100) {
    alert("Please enter a value between 1 and 100");
    return;
  }

  emit("update-goal", goalInput.value);
  console.log("✅ Goal saved:", goalInput.value);
};

const setPreset = (value) => {
  goalInput.value = value;
  saveGoal();
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>
