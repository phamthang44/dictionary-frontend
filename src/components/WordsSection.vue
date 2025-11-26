<!-- filepath: src/components/WordsSection.vue -->
<template>
  <div class="lg:col-span-3">
    <!-- Search and Add Word -->
    <div class="group relative mb-6">
      <div
        class="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl blur-2xl group-hover:blur-3xl transition-all duration-300"
      ></div>
      <div
        class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/30 group-hover:border-purple-400/50 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300"
      >
        <div class="flex flex-col md:flex-row gap-4">
          <input
            :value="searchQuery"
            @input="$emit('update:searchQuery', $event.target.value)"
            type="text"
            placeholder="Search words..."
            class="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm"
          />
          <button
            @click="$emit('add-word')"
            class="group/btn relative px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-poppins rounded-lg font-semibold overflow-hidden hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              + Add Word
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"
            ></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Current Filter Display -->
    <div
      v-if="selectedCategory || searchQuery"
      class="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4 mb-6 flex items-center justify-between backdrop-blur-sm"
    >
      <p class="text-gray-200 font-poppins">
        <span v-if="selectedCategory" class="font-semibold text-purple-300">
          Category: {{ getCategoryName(selectedCategory) }}
        </span>
        <span v-if="selectedCategory && searchQuery" class="mx-2 text-gray-400"
          >•</span
        >
        <span v-if="searchQuery" class="font-semibold text-pink-300">
          Search: "{{ searchQuery }}"
        </span>
      </p>
      <div class="flex gap-2">
        <button
          v-if="selectedCategory"
          @click="$emit('edit-category', selectedCategory)"
          class="bg-blue-600/70 hover:bg-blue-600 text-white font-poppins py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
        >
          ✏️ Edit
        </button>
        <button
          v-if="selectedCategory"
          @click="$emit('delete-category', selectedCategory)"
          class="bg-red-600/70 hover:bg-red-600 text-white font-poppins py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
        >
          🗑️ Delete
        </button>
      </div>
    </div>

    <!-- Pagination -->
    <div
      v-if="totalPages > 1"
      class="bg-slate-800/50 border border-purple-500/20 rounded-xl p-6 flex items-center justify-between mb-6 backdrop-blur-sm"
    >
      <div class="text-gray-300 font-poppins">
        Showing {{ (currentPage - 1) * pageSize + 1 }} to
        {{ Math.min(currentPage * pageSize, totalItems) }} of
        {{ totalItems }}
        words
      </div>
      <div class="flex gap-2 items-center flex-wrap">
        <button
          @click="$emit('previousPage')"
          :disabled="currentPage === 1"
          class="px-4 py-2 bg-slate-700/50 text-gray-300 border border-purple-500/20 rounded-lg hover:bg-slate-600/50 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-poppins font-semibold cursor-pointer"
        >
          ← Previous
        </button>

        <div class="flex gap-1">
          <button
            v-for="page in paginationPages"
            :key="page"
            @click="$emit('goToPage', page)"
            :class="[
              'px-3 py-2 rounded-lg transition-all duration-300 font-poppins font-semibold cursor-pointer',
              page === currentPage
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/50'
                : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50 border border-purple-500/20 hover:border-purple-400/50',
            ]"
          >
            {{ page }}
          </button>
        </div>

        <button
          @click="$emit('nextPage')"
          :disabled="currentPage === totalPages"
          class="px-4 py-2 bg-slate-700/50 text-gray-300 border border-purple-500/20 rounded-lg hover:bg-slate-600/50 hover:border-purple-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-poppins font-semibold cursor-pointer"
        >
          Next →
        </button>
      </div>
    </div>

    <!-- Words List -->
    <div class="space-y-4">
      <div v-for="word in words" :key="word._id" class="group relative">
        <div
          class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-pink-600/0 group-hover:from-purple-600/10 group-hover:to-pink-600/10 rounded-2xl transition-all duration-300"
        ></div>
        <div
          class="relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-purple-500/20 group-hover:border-purple-400/50 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <div class="flex items-center gap-3 mb-2 flex-wrap">
                <h3
                  class="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 font-poppins"
                >
                  {{ word.word }}
                </h3>
                <span
                  class="bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 border border-blue-500/30 text-xs font-semibold px-3 py-1 rounded-full font-poppins"
                >
                  {{ word.category?.name || "Uncategorized" }}
                </span>
              </div>
              <p class="text-gray-400 italic font-poppins mb-3">
                {{ word.pronunciation }}
              </p>
              <p class="text-gray-300 font-poppins mb-3">
                {{ word.definition }}
              </p>
              <div
                v-if="word.exampleSentence && word.exampleSentence.length > 0"
                class="bg-slate-700/30 border border-purple-500/20 p-3 rounded-lg"
              >
                <p
                  class="text-sm font-semibold text-gray-300 font-poppins mb-2"
                >
                  Examples:
                </p>
                <ul class="space-y-1">
                  <li
                    v-for="(example, index) in word.exampleSentence"
                    :key="index"
                    class="text-sm text-gray-400 font-poppins"
                  >
                    • {{ example }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="flex gap-2 ml-4">
              <button
                @click="$emit('edit-word', word)"
                class="bg-blue-600/70 hover:bg-blue-600 text-white font-poppins py-2 px-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 cursor-pointer"
              >
                Edit
              </button>
              <button
                @click="$emit('delete-word', word._id)"
                class="bg-red-600/70 hover:bg-red-600 text-white font-poppins py-2 px-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="words.length === 0" class="text-center py-12">
        <p class="text-gray-400 text-lg font-poppins">
          No words found. Start by adding a new word!
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  searchQuery: String,
  selectedCategory: [String, null],
  words: Array,
  currentPage: Number,
  pageSize: Number,
  totalItems: Number,
  totalPages: Number,
  paginationPages: Array,
  getCategoryName: Function,
});

defineEmits([
  "update:searchQuery",
  "add-word",
  "edit-word",
  "delete-word",
  "edit-category",
  "delete-category",
  "goToPage",
  "previousPage",
  "nextPage",
]);
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
