<!-- filepath: src/components/Sidebar.vue -->
<template>
  <div class="lg:col-span-1">
    <div class="bg-white rounded-lg shadow-lg p-6 sticky top-6">
      <!-- Header with Toggle Button -->
      <div class="flex items-center justify-between mb-4">
        <h2 class="text-xl font-bold text-gray-800 font-poppins">Categories</h2>
        <button
          @click="isExpanded = !isExpanded"
          class="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          :title="isExpanded ? 'Collapse' : 'Expand'"
        >
          <svg
            :class="[
              'w-6 h-6 transition-transform',
              isExpanded ? 'rotate-180' : '',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      <!-- Add Category Button -->
      <button
        @click="$emit('openCategoryModal')"
        class="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-poppins py-2 px-4 rounded-lg transition-colors"
      >
        + Add Category
      </button>

      <!-- Categories List - Collapsible -->
      <div
        :class="[
          'space-y-2 transition-all duration-300 ease-in-out overflow-hidden',
          isExpanded ? 'max-h-96' : 'max-h-40 lg:max-h-96',
        ]"
      >
        <!-- All Categories Button -->
        <button
          @click="selectCategory(null)"
          :class="[
            'w-full text-left px-4 py-2 rounded-lg transition-colors font-poppins text-sm',
            selectedCategory === null
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          <div class="flex justify-between items-center">
            <span>All Categories</span>
            <span
              :class="[
                'text-xs px-2 py-1 rounded',
                selectedCategory === null
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-300 text-gray-700',
              ]"
            >
              {{ totalWordCount }}
            </span>
          </div>
        </button>

        <!-- Category Buttons -->
        <button
          v-for="category in categories"
          :key="category._id"
          @click="selectCategory(category._id)"
          :class="[
            'w-full text-left px-4 py-2 rounded-lg transition-colors font-poppins text-sm',
            selectedCategory === category._id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          ]"
        >
          <div class="flex justify-between items-center">
            <span class="truncate">{{ category.name }}</span>
            <span
              :class="[
                'text-xs px-2 py-1 rounded whitespace-nowrap ml-2',
                selectedCategory === category._id
                  ? 'bg-blue-400 text-white'
                  : 'bg-gray-300 text-gray-700',
              ]"
            >
              {{ categoryWordCounts[category._id] || 0 }}
            </span>
          </div>
        </button>
      </div>

      <!-- Expand/Collapse Toggle (Mobile) -->
      <button
        v-if="!isExpanded && categories.length > 3"
        @click="isExpanded = true"
        class="w-full mt-3 lg:hidden text-blue-500 hover:text-blue-600 font-poppins text-sm font-semibold transition-colors"
      >
        Show More ↓
      </button>
      <button
        v-if="isExpanded && categories.length > 3"
        @click="isExpanded = false"
        class="w-full mt-3 lg:hidden text-blue-500 hover:text-blue-600 font-poppins text-sm font-semibold transition-colors"
      >
        Show Less ↑
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

const props = defineProps({
  categories: {
    type: Array,
    required: true,
    default: () => [],
  },
  selectedCategory: {
    type: String,
    default: null,
  },
  categoryWordCounts: {
    type: Object,
    required: true,
    default: () => ({}),
  },
});

const emit = defineEmits(["selectCategory", "openCategoryModal"]);

const isExpanded = ref(false);

const selectCategory = (categoryId) => {
  emit("selectCategory", categoryId);
};

// Calculate total word count
const totalWordCount = computed(() => {
  return Object.values(props.categoryWordCounts).reduce(
    (sum, count) => sum + count,
    0
  );
});
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

/* Smooth scrolling for the collapsed state */
div.space-y-2 {
  overflow-y: auto;
}

/* Custom scrollbar styling */
div.space-y-2::-webkit-scrollbar {
  width: 6px;
}

div.space-y-2::-webkit-scrollbar-track {
  background: transparent;
}

div.space-y-2::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

div.space-y-2::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
