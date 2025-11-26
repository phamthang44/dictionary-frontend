<!-- filepath: src/components/Sidebar.vue -->
<template>
  <div class="lg:col-span-1">
    <!-- Add Category Button -->
    <button
      @click="$emit('openCategoryModal')"
      class="w-full group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins rounded-lg font-semibold overflow-hidden hover:shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 mb-6 cursor-pointer"
    >
      <span class="relative z-10 flex items-center justify-center gap-2">
        + Add Category
      </span>
      <div
        class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
      ></div>
    </button>

    <!-- Categories Container (Scrollable) -->
    <div
      class="bg-slate-800/30 border border-purple-500/20 rounded-2xl p-4 backdrop-blur-sm h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-800/50"
    >
      <div class="space-y-3">
        <!-- All Categories Button -->
        <button
          @click="$emit('selectCategory', null)"
          :class="[
            'w-full group relative px-2 py-4 rounded-lg font-poppins font-semibold transition-all duration-300 text-left overflow-hidden cursor-pointer border',
            !selectedCategory
              ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white border-blue-400/60 shadow-lg shadow-blue-500/40'
              : 'bg-slate-800/50 text-gray-300 border-slate-600/50 hover:bg-slate-700/50 hover:border-blue-500/50 hover:shadow-md hover:shadow-blue-500/20',
          ]"
        >
          <span class="relative z-10 flex items-center justify-between gap-2">
            <span class="flex items-center gap-2">
              <span>🎯</span>
              <span>All Categories</span>
            </span>
            <span
              v-if="!selectedCategory"
              class="text-xs font-bold px-3 py-1.5 rounded-full bg-yellow-400/90 text-slate-900 whitespace-nowrap animate-pulse"
            >
              ● Active
            </span>
          </span>
        </button>

        <!-- Individual Categories -->
        <div class="space-y-2">
          <div v-for="category in categories" :key="category._id" class="group">
            <button
              @click="$emit('selectCategory', category._id)"
              :class="[
                'w-full px-6 py-4 rounded-lg font-poppins transition-all duration-300 text-left border overflow-hidden relative group/btn cursor-pointer',
                selectedCategory === category._id
                  ? 'bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border-blue-400/50 shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-gray-300 border-purple-500/20 hover:bg-slate-700/50 hover:border-blue-400/50 hover:shadow-md hover:shadow-purple-500/20',
              ]"
            >
              <div class="relative z-10 flex items-center justify-between">
                <span class="flex items-center gap-3 min-w-0">
                  <span
                    class="text-xl group-hover/btn:scale-110 group-hover/btn:rotate-12 transition-transform duration-300 flex-shrink-0"
                  >
                    🏷️
                  </span>
                  <span class="font-semibold truncate">{{
                    category.name
                  }}</span>
                </span>
                <span
                  :class="[
                    'text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap ml-2 flex-shrink-0',
                    selectedCategory === category._id
                      ? 'bg-white/20 text-white'
                      : 'bg-purple-500/20 text-purple-300',
                  ]"
                >
                  {{ categoryWordCounts[category._id] || 0 }}
                </span>
              </div>

              <!-- Hover gradient background -->
              <div
                v-if="selectedCategory !== category._id"
                class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
              ></div>
            </button>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="categories.length === 0" class="text-center py-12">
          <p class="text-gray-400 text-sm font-poppins">📭 No categories yet</p>
          <p class="text-gray-500 text-xs font-poppins mt-2">
            Create your first category to get started
          </p>
        </div>
      </div>
    </div>

    <!-- Category Count Info -->
    <div
      class="mt-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4 text-center backdrop-blur-sm"
    >
      <p class="text-gray-400 text-xs font-poppins uppercase tracking-wider">
        Total Categories
      </p>
      <p
        class="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-poppins mt-2"
      >
        {{ categories.length }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: Array,
  selectedCategory: [String, null],
  categoryWordCounts: Object,
});

defineEmits(["selectCategory", "openCategoryModal"]);
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
  background: rgb(147, 51, 234);
  border-radius: 10px;
  transition: background 0.3s;
}

.scrollbar-thin::-webkit-scrollbar-thumb:hover {
  background: rgb(168, 85, 247);
}

/* Firefox Scrollbar */
.scrollbar-thin {
  scrollbar-width: thin;
  scrollbar-color: rgb(147, 51, 234) rgba(51, 65, 85, 0.5);
}
</style>
