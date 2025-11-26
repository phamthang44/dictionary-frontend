<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    <!-- Total Words -->
    <StatCard
      :title="'Total Words'"
      :value="stats.totalWords"
      icon="📚"
      :trendValue="stats.wordsAddedThisMonth"
      :trendLabel="'added this month'"
      color="purple"
    />

    <!-- Categories -->
    <StatCard
      :title="'Categories'"
      :value="stats.categoryStats?.totalCategories || 0"
      icon="🏷️"
      :trendValue="stats.categoryStats?.newCategoriesThisMonth || 0"
      :trendLabel="'new this month'"
      color="blue"
    />

    <!-- Learning Streak -->
    <StatCard
      :title="'Longest Streak'"
      :value="stats.streak"
      icon="🔥"
      color="orange"
    >
      <template #footer>
        <p class="text-orange-400 text-sm font-poppins font-semibold">
          days in a row
        </p>
      </template>
    </StatCard>
    <!-- Average Words/Day -->
    <StatCard
      :title="'Avg. Words/Day'"
      :value="stats.avgWordsPerDay"
      icon="📈"
      color="green"
    >
      <template #footer>
        <p class="text-green-400 text-sm mt-4 font-poppins">weekly average</p>
      </template>
    </StatCard>
  </div>
</template>
<script setup>
import StatCard from "./ui/StatCard.vue";
defineProps({
  stats: {
    type: Object,
    required: true,
  },
});
</script>
