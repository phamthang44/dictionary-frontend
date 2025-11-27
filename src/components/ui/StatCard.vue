<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  value: {
    type: [String, Number],
    required: true,
  },
  icon: {
    type: String,
    default: "📊",
  },
  // Trend data (e.g., +12)
  trendValue: {
    type: [String, Number],
    default: "",
  },
  // Text description for trend (e.g., "added this month")
  trendLabel: {
    type: String,
    default: "",
  },
  // primary theme: 'purple', 'blue', 'pink', 'green', 'orange'
  color: {
    type: String,
    default: "purple",
  },
});

const colorMap = {
  purple: {
    bgHover: "group-hover:from-purple-600/10 group-hover:to-pink-600/10",
    border: "border-purple-500/20 group-hover:border-purple-400/50",
    textGradient: "from-purple-400 to-pink-400",
    divider: "via-purple-500",
    iconHover: "group-hover:rotate-12",
  },
  blue: {
    bgHover: "group-hover:from-blue-600/10 group-hover:to-cyan-600/10",
    border: "border-blue-500/20 group-hover:border-blue-400/50",
    textGradient: "from-blue-400 to-cyan-400",
    divider: "via-blue-500",
    iconHover: "group-hover:-rotate-12",
  },
  pink: {
    bgHover: "group-hover:from-pink-600/10 group-hover:to-rose-600/10",
    border: "border-pink-500/20 group-hover:border-pink-400/50",
    textGradient: "from-pink-400 to-rose-400",
    divider: "via-pink-500",
    iconHover: "group-hover:rotate-12",
  },
  green: {
    bgHover: "group-hover:from-emerald-600/10 group-hover:to-teal-600/10",
    border: "border-emerald-500/20 group-hover:border-emerald-400/50",
    textGradient: "from-emerald-400 to-teal-400",
    divider: "via-emerald-500",
    iconHover: "group-hover:-rotate-12",
  },
  orange: {
    bgHover: "group-hover:from-orange-600/10 group-hover:to-amber-600/10",
    border: "border-orange-500/20 group-hover:border-orange-400/50",
    textGradient: "from-orange-400 to-amber-400",
    divider: "via-orange-500",
    iconHover: "group-hover:rotate-12",
  },
};
// Computed property to get the current style based on the `color` prop
const theme = computed(() => colorMap[props.color] || colorMap.purple);
</script>

<template>
  <div class="group relative h-full">
    <div
      class="absolute inset-0 bg-gradient-to-r from-transparent to-transparent rounded-2xl transition-all duration-300"
      :class="theme.bgHover"
    ></div>

    <div
      class="relative bg-slate-800/50 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-300 h-full flex flex-col justify-between"
      :class="theme.border"
    >
      <div>
        <div class="flex items-center justify-between mb-6">
          <div>
            <p
              class="text-gray-400 text-sm font-poppins uppercase tracking-wider"
            >
              {{ title }}
            </p>
            <p
              class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r font-poppins mt-2"
              :class="theme.textGradient"
            >
              {{ value }}
            </p>
          </div>

          <div
            class="text-6xl transition-transform duration-300 group-hover:scale-110"
            :class="theme.iconHover"
          >
            {{ icon }}
          </div>
        </div>

        <div
          class="h-1 bg-gradient-to-r from-transparent to-transparent rounded-full opacity-50"
          :class="theme.divider"
        ></div>
      </div>
      <slot name="footer">
        <p
          v-if="trendValue"
          class="text-sm mt-4 font-poppins flex items-center gap-1"
        >
          <span
            :class="
              String(trendValue).includes('-')
                ? 'text-red-400'
                : 'text-green-400'
            "
            class="font-bold"
          >
            {{ !String(trendValue).includes("-") ? "↑" : "↓" }} {{ trendValue }}
          </span>
          <span class="text-gray-400">{{ trendLabel }}</span>
        </p>
      </slot>
    </div>
  </div>
</template>
