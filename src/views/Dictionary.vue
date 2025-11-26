<!-- filepath: src/views/Dictionary.vue -->
<template>
  <div
    class="min-h-screen bg-purple-950 text-white overflow-hidden relative pt-20"
  >
    <!-- Animated Background -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none">
      <div
        class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob"
      ></div>
      <div
        class="absolute top-[20%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-2000"
      ></div>
      <div
        class="absolute bottom-[-10%] left-[7%] w-96 h-96 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"
      ></div>
    </div>

    <div class="relative max-w-7xl mx-auto px-6 py-12 z-10">
      <!-- Header -->
      <div class="mb-12 flex items-center justify-between">
        <div class="space-y-3">
          <div
            class="inline-block px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full text-sm font-poppins"
          >
            ✨ Your Word Library
          </div>
          <h1 class="text-6xl md:text-7xl font-bold text-white font-poppins">
            📚 My
            <span
              class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400"
            >
              Dictionary
            </span>
          </h1>
          <p class="text-xl text-gray-300 font-poppins">
            Manage and organize your vocabulary with elegance
          </p>
        </div>
        <router-link
          to="/"
          class="group relative px-6 py-3 bg-gradient-to-r from-gray-600/50 to-gray-700/50 text-white font-poppins rounded-lg border border-gray-500/30 hover:border-gray-400/50 hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
        >
          <span class="relative z-10">← Back to Home</span>
        </router-link>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar -->
        <Sidebar
          :categories="categories"
          :selectedCategory="selectedCategory"
          :categoryWordCounts="categoryWordCounts"
          @selectCategory="handleSelectCategory"
          @openCategoryModal="showAddCategoryModal"
        />

        <!-- Main Content -->
        <WordsSection
          v-model:searchQuery="searchQuery"
          :selectedCategory="selectedCategory"
          :words="words"
          :currentPage="currentPage"
          :pageSize="pageSize"
          :totalItems="totalItems"
          :totalPages="totalPages"
          :paginationPages="paginationPages"
          :getCategoryName="getCategoryName"
          @add-word="showAddWordModal"
          @edit-word="editWord"
          @delete-word="openDeleteWordConfirm"
          @edit-category="editCategory"
          @delete-category="openDeleteCategoryConfirm"
          @goToPage="goToPage"
          @previousPage="previousPage"
          @nextPage="nextPage"
        />
      </div>
    </div>

    <!-- Modals & Spinners -->
    <SpinnerLoading :show="isLoading" message="Loading..." />

    <WordModal
      v-if="showWordModal"
      :word="editingWord"
      :categories="categories"
      @save="handleSaveWord"
      @close="showWordModal = false"
    />

    <CategoryModal
      v-if="showCategoryModal"
      :data="editingCategory"
      :mode="mode"
      @save="handleSaveCategory"
      @close="closeCategoryModal"
    />

    <ConfirmModal
      :show="showConfirmDeleteWord"
      title="Remove this word?"
      message="This action cannot be undone!"
      @confirm="handleConfirmDeleteWord"
      @cancel="showConfirmDeleteWord = false"
    />

    <ConfirmModalCategory
      :show="showConfirmDeleteCategory"
      title="Remove this category?"
      message="This action cannot be undone!"
      @confirm="handleConfirmDeleteCategory"
      @cancel="showConfirmDeleteCategory = false"
    />

    <AlertModal
      v-if="showAlert"
      :show="showAlert"
      :title="alertTitle"
      :message="alertMessage"
      @close="showAlert = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useWords } from "../composables/useWords.js";
import { useCategories } from "../composables/useCategories.js";
import Sidebar from "../components/Sidebar.vue";
import WordsSection from "../components/WordsSection.vue";
import WordModal from "../components/WordModal.vue";
import CategoryModal from "../components/CategoryModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import ConfirmModalCategory from "../components/ConfirmModalCategory.vue";
import SpinnerLoading from "../components/SpinnerLoading.vue";
import AlertModal from "../components/AlertModal.vue";

// Composables
const {
  searchQuery,
  selectedCategory,
  words,
  isLoading: wordsLoading,
  currentPage,
  pageSize,
  totalItems,
  totalPages,
  paginationPages,
  fetchWords,
  handleSelectCategory,
  saveWord,
  deleteWord,
  goToPage,
  previousPage,
  nextPage,
} = useWords();

const {
  categories,
  categoryWordCounts,
  editingCategory,
  mode,
  isLoading: categoriesLoading,
  fetchCategories,
  fetchCategoryWordCounts,
  getCategoryName,
  saveCategory,
  deleteCategory,
  editCategoryHandler,
} = useCategories();

// Local state
const isLoading = ref(false);
const editingWord = ref(null);
const showWordModal = ref(false);
const showCategoryModal = ref(false);
const showConfirmDeleteWord = ref(false);
const showConfirmDeleteCategory = ref(false);
const deleteWordId = ref(null);
const deleteCategoryId = ref(null);

const showAlert = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

onMounted(async () => {
  isLoading.value = true;

  try {
    await Promise.all([
      fetchCategories(),
      fetchWords(),
      new Promise((resolve) => setTimeout(resolve, 800)),
    ]);
  } catch (err) {
    console.error(err);
  } finally {
    isLoading.value = false;
  }

  try {
    console.log("Fetching counts in background...");
    await fetchCategoryWordCounts();
  } catch (err) {
    console.error("Count fetch error:", err);
  }
});

// Word handlers
const showAddWordModal = () => {
  editingWord.value = null;
  showWordModal.value = true;
};

const editWord = (word) => {
  editingWord.value = JSON.parse(JSON.stringify(word));
  showWordModal.value = true;
  console.log("✏️ Editing word:", editingWord.value);
};

const handleSaveWord = async (word) => {
  try {
    const result = await saveWord(word);
    showAlert.value = true;
    alertTitle.value = "Success!";
    alertMessage.value = result.message;

    showWordModal.value = false;
    editingWord.value = null;
    await Promise.all([fetchCategories(), fetchWords()]);
    await fetchCategoryWordCounts();
  } catch (err) {
    showAlert.value = true;
    alertTitle.value = "Error!";
    alertMessage.value = "Failed to save word!";
  }
};

const openDeleteWordConfirm = (wordId) => {
  deleteWordId.value = wordId;
  showConfirmDeleteWord.value = true;
};

const handleConfirmDeleteWord = async () => {
  try {
    await deleteWord(deleteWordId.value);
    showConfirmDeleteWord.value = false;
    showAlert.value = true;
    alertTitle.value = "Deleted!";
    alertMessage.value = "Word deleted successfully!";
    await Promise.all([fetchCategories(), fetchWords()]);
    await fetchCategoryWordCounts();
  } catch (err) {
    showAlert.value = true;
    alertTitle.value = "Error!";
    alertMessage.value = "Failed to delete word!";
  }
};

// Category handlers
const showAddCategoryModal = () => {
  editingCategory.value = null;
  mode.value = "Add";
  showCategoryModal.value = true;
};

const editCategory = (categoryId) => {
  editCategoryHandler(categoryId);
  showCategoryModal.value = true;
};

const closeCategoryModal = () => {
  showCategoryModal.value = false;
  editingCategory.value = null;
  mode.value = "Add";
};

const handleSaveCategory = async (category) => {
  try {
    const result = await saveCategory(category);
    showAlert.value = true;
    alertTitle.value = "Success!";
    alertMessage.value = result.message;
    closeCategoryModal();

    if (result.category) {
      selectedCategory.value = result.category._id;
    }
    Promise.all([fetchCategories(), fetchWords()]).then(async () => {
      await fetchCategoryWordCounts();
    });
  } catch (err) {
    showAlert.value = true;
    alertTitle.value = "Error!";
    alertMessage.value = "Failed to save category!";
  }
};

const openDeleteCategoryConfirm = (categoryId) => {
  deleteCategoryId.value = categoryId;
  showConfirmDeleteCategory.value = true;
};

const handleConfirmDeleteCategory = async () => {
  try {
    await deleteCategory(deleteCategoryId.value);
    showConfirmDeleteCategory.value = false;
    if (selectedCategory.value === deleteCategoryId.value) {
      selectedCategory.value = null;
      words.value = [];
    }
    categories.value = categories.value.filter(
      (c) => c.id !== deleteCategoryId.value
    );
    showAlert.value = true;
    alertTitle.value = "Deleted!";
    alertMessage.value = "Category deleted successfully!";
    Promise.all([fetchCategories(), fetchWords()]).then(async () => {
      await fetchCategoryWordCounts();
    });
  } catch (err) {
    showAlert.value = true;
    alertTitle.value = "Error!";
    alertMessage.value = "Failed to delete category!";
  }
};
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
