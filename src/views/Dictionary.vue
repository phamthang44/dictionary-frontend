<!-- filepath: src/views/Dictionary.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
    <div class="max-w-6xl mx-auto">
      <!-- Header with Back Button -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-4xl font-bold text-gray-800 font-poppins mb-2">
            📚 My Dictionary
          </h1>
          <p class="text-gray-600 font-poppins">
            Manage and organize your vocabulary
          </p>
        </div>
        <router-link
          to="/"
          class="bg-gray-500 hover:bg-gray-600 text-white font-poppins py-2 px-4 rounded-lg transition-colors"
        >
          ← Back to Home
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-lg shadow-lg p-6 sticky top-6">
            <h2 class="text-xl font-bold text-gray-800 font-poppins mb-4">
              Categories
            </h2>
            <button
              @click="showCategoryModal = true"
              class="w-full mb-4 bg-blue-500 hover:bg-blue-600 text-white font-poppins py-2 px-4 rounded-lg transition-colors"
            >
              + Add Category
            </button>
            <div class="space-y-2">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="[
                  'w-full text-left px-4 py-2 rounded-lg transition-colors font-poppins',
                  selectedCategory === category.id
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ category.name }}
                <span class="float-right text-sm">{{
                  getWordCount(category.id)
                }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Main Content -->
        <div class="lg:col-span-3">
          <!-- Search and Add Word -->
          <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-4 mb-4">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Search words..."
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
              />
              <button
                @click="
                  showWordModal = true;
                  editingWord = null;
                "
                class="bg-green-500 hover:bg-green-600 text-white font-poppins py-3 px-6 rounded-lg transition-colors flex items-center gap-2"
              >
                + Add Word
              </button>
            </div>
          </div>

          <!-- Words List -->
          <div class="space-y-4">
            <div
              v-for="word in filteredWords"
              :key="word.id"
              class="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div class="flex justify-between items-start">
                <div class="flex-1">
                  <div class="flex items-center gap-3 mb-2">
                    <h3 class="text-2xl font-bold text-gray-800 font-poppins">
                      {{ word.word }}
                    </h3>
                    <span
                      class="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full font-poppins"
                    >
                      {{ getCategoryName(word.categoryId) }}
                    </span>
                  </div>
                  <p class="text-gray-600 italic font-poppins mb-3">
                    {{ word.pronunciation }}
                  </p>
                  <p class="text-gray-700 font-poppins mb-3">
                    {{ word.definition }}
                  </p>
                  <div
                    v-if="word.examples.length > 0"
                    class="bg-gray-50 p-3 rounded-lg"
                  >
                    <p
                      class="text-sm font-semibold text-gray-700 font-poppins mb-2"
                    >
                      Examples:
                    </p>
                    <ul class="space-y-1">
                      <li
                        v-for="(example, index) in word.examples"
                        :key="index"
                        class="text-sm text-gray-600 font-poppins"
                      >
                        • {{ example }}
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="flex gap-2 ml-4">
                  <button
                    @click="editWord(word)"
                    class="bg-yellow-500 hover:bg-yellow-600 text-white font-poppins py-2 px-3 rounded-lg transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    @click="deleteWord(word.id)"
                    class="bg-red-500 hover:bg-red-600 text-white font-poppins py-2 px-3 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="filteredWords.length === 0" class="text-center py-12">
              <p class="text-gray-500 text-lg font-poppins">
                No words found. Start by adding a new word!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Word Modal -->
    <WordModal
      v-if="showWordModal"
      :word="editingWord"
      :categories="categories"
      @save="saveWord"
      @close="showWordModal = false"
    />

    <!-- Category Modal -->
    <CategoryModal
      v-if="showCategoryModal"
      @save="saveCategory"
      @close="showCategoryModal = false"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import WordModal from "../components/WordModal.vue";
import CategoryModal from "../components/CategoryModal.vue";

const showWordModal = ref(false);
const showCategoryModal = ref(false);
const editingWord = ref(null);
const searchQuery = ref("");
const selectedCategory = ref(null);

const categories = ref([
  { id: 1, name: "Technology" },
  { id: 2, name: "Science" },
  { id: 3, name: "Literature" },
]);

const words = ref([
  {
    id: 1,
    word: "Eloquent",
    pronunciation: "/ˈɛl.ə.kwənt/",
    definition: "Fluent or persuasive in speaking or writing.",
    categoryId: 3,
    examples: [
      "Her eloquent speech moved the audience.",
      "He gave an eloquent presentation.",
    ],
  },
  {
    id: 2,
    word: "Algorithm",
    pronunciation: "/ˈæl.ɡə.rɪð.əm/",
    definition: "A step-by-step procedure for solving a problem.",
    categoryId: 1,
    examples: [
      "The search algorithm is very efficient.",
      "We need to optimize this algorithm.",
    ],
  },
]);

const filteredWords = computed(() => {
  return words.value.filter((word) => {
    const matchesSearch = word.word
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchesCategory =
      selectedCategory.value === null ||
      word.categoryId === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

const getWordCount = (categoryId) => {
  return words.value.filter((w) => w.categoryId === categoryId).length;
};

const getCategoryName = (categoryId) => {
  return categories.value.find((c) => c.id === categoryId)?.name || "Unknown";
};

const saveWord = (word) => {
  if (word.id) {
    const index = words.value.findIndex((w) => w.id === word.id);
    if (index !== -1) {
      words.value[index] = word;
    }
  } else {
    word.id = Math.max(...words.value.map((w) => w.id), 0) + 1;
    words.value.push(word);
  }
  showWordModal.value = false;
  editingWord.value = null;
};

const editWord = (word) => {
  editingWord.value = { ...word };
  showWordModal.value = true;
};

const deleteWord = (id) => {
  if (confirm("Are you sure you want to delete this word?")) {
    words.value = words.value.filter((w) => w.id !== id);
  }
};

const saveCategory = (category) => {
  category.id = Math.max(...categories.value.map((c) => c.id), 0) + 1;
  categories.value.push(category);
  showCategoryModal.value = false;
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
