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
        <Sidebar
          :categories="categories"
          :selectedCategory="selectedCategory"
          :categoryWordCounts="categoryWordCounts"
          @selectCategory="handleSelectCategory"
          @openCategoryModal="showCategoryModal = true"
        />

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
          <!-- Current Filter Display -->
          <div
            v-if="selectedCategory || searchQuery"
            class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 flex items-center justify-between"
          >
            <p class="text-gray-700 font-poppins">
              <span v-if="selectedCategory" class="font-semibold">
                Category: {{ getCategoryName(selectedCategory) }}
              </span>
              <span v-if="selectedCategory && searchQuery" class="mx-2">•</span>
              <span v-if="searchQuery" class="font-semibold">
                Search: "{{ searchQuery }}"
              </span>
            </p>
            <div class="flex gap-2">
              <button
                v-if="selectedCategory"
                @click="editCategory(selectedCategory)"
                class="bg-blue-500 hover:bg-blue-600 text-white font-poppins cursor-pointer py-2 px-4 rounded-full transition-colors"
              >
                Edit
              </button>
              <button
                v-if="selectedCategory"
                @click="showConfirmCategoryModal(selectedCategory)"
                class="bg-red-500 hover:bg-red-600 text-white font-poppins cursor-pointer py-2 px-4 rounded-full transition-colors"
              >
                Delete
              </button>
            </div>
          </div>

          <!-- Words List -->
          <div class="space-y-4 mb-6">
            <!-- Pagination -->
            <div
              v-if="totalPages > 1"
              class="bg-white rounded-lg shadow-lg p-6 flex items-center justify-between"
            >
              <div class="text-gray-600 font-poppins">
                Showing {{ (currentPage - 1) * pageSize + 1 }} to
                {{ Math.min(currentPage * pageSize, totalItems) }} of
                {{ totalItems }}
                words
              </div>
              <div class="flex gap-2 items-center">
                <button
                  @click="previousPage"
                  :disabled="currentPage === 1"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-poppins font-semibold cursor-pointer"
                >
                  ← Previous
                </button>

                <div class="flex gap-1">
                  <button
                    v-for="page in paginationPages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                      'px-3 py-2 rounded-lg transition-colors font-poppins font-semibold cursor-pointer',
                      page === currentPage
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300',
                    ]"
                  >
                    {{ page }}
                  </button>
                </div>

                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-poppins font-semibold cursor-pointer"
                >
                  Next →
                </button>
              </div>
            </div>

            <div
              v-for="word in words"
              :key="word._id"
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
                      {{ word.category?.name || "Unknown" }}
                    </span>
                  </div>
                  <p class="text-gray-600 italic font-poppins mb-3">
                    {{ word.pronunciation }}
                  </p>
                  <p class="text-gray-700 font-poppins mb-3">
                    {{ word.definition }}
                  </p>
                  <div
                    v-if="word.exampleSentence.length > 0"
                    class="bg-gray-50 p-3 rounded-lg"
                  >
                    <p
                      class="text-sm font-semibold text-gray-700 font-poppins mb-2"
                    >
                      Examples:
                    </p>
                    <ul class="space-y-1">
                      <li
                        v-for="(example, index) in word.exampleSentence"
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
                    @click="openConfirm(word._id)"
                    class="bg-red-500 hover:bg-red-600 text-white font-poppins py-2 px-3 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            <!-- Empty State -->
            <div v-if="words.length === 0" class="text-center py-12">
              <p class="text-gray-500 text-lg font-poppins">
                No words found. Start by adding a new word!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading Spinner -->
    <SpinnerLoading :show="isLoading" message="Loading words..." />

    <!-- Word Modal -->
    <WordModal
      v-if="showWordModal"
      :word="editingWord"
      :categories="categories"
      @save="saveWord"
      @close="showWordModal = false"
    />

    <!-- Confirm Delete Modal -->
    <ConfirmModal
      :show="showConfirm"
      title="Remove this word?"
      message="This action cannot be undone!"
      @confirm="handleDeleteConfirm"
      @cancel="showConfirm = false"
    />

    <!-- Confirm Delete Category Modal -->
    <ConfirmModalCategory
      :show="showConfirmCategory"
      title="Remove this category?"
      message="This action cannot be undone!"
      @confirm="handleDeleteCategoryConfirm"
      @cancel="showConfirmCategory = false"
    />

    <!-- Category Modal -->
    <CategoryModal
      v-if="showCategoryModal"
      :data="editingCategory"
      :mode="mode"
      @save="saveCategory"
      @close="closeModalHandler"
    />

    <!-- Alert Modal -->
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
import { ref, computed, onMounted, watch } from "vue";
import { wordApi } from "../api/wordApi.js";
import { categoryApi } from "../api/categoryApi.js";
import WordModal from "../components/WordModal.vue";
import CategoryModal from "../components/CategoryModal.vue";
import ConfirmModal from "../components/ConfirmModal.vue";
import Sidebar from "../components/Sidebar.vue";
import SpinnerLoading from "../components/SpinnerLoading.vue";
import AlertModal from "../components/AlertModal.vue";
import ConfirmModalCategory from "../components/ConfirmModalCategory.vue";
import { useDebounce } from "../composables/useDebounce.js";

const showWordModal = ref(false);
const showCategoryModal = ref(false);
const editingWord = ref(null);

const showConfirmCategory = ref(false);
const categoryToDelete = ref(null);

const searchQuery = ref("");
const debouncedSearch = useDebounce(searchQuery, 1000);

const selectedCategory = ref(null);
const editingCategory = ref(null);
const mode = ref("Add");

const showConfirm = ref(false);
const deleteId = ref(null);
const categories = ref([]);
const words = ref([]);
const categoryWordCounts = ref({});

const isLoading = ref(false);
const showAlert = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

// Pagination state
const currentPage = ref(1);
const pageSize = ref(10);
const totalItems = ref(0);
const totalPages = ref(0);

onMounted(async () => {
  try {
    isLoading.value = true;
    const cres = await categoryApi.getAll({
      page: 1,
      limit: 100,
    });

    if (cres.data.success) {
      categories.value = cres.data.data.data;
      await fetchCategoryWordCounts();
    }
    await fetchWords();
  } catch (err) {
    console.error("Error fetching data:", err?.response?.data);
  } finally {
    isLoading.value = false;
  }
});

const fetchCategoryWordCounts = async () => {
  categoryWordCounts.value = {};
  try {
    for (const category of categories.value) {
      // --- SỬA ĐOẠN NÀY ---
      const response = await wordApi.getAll({
        page: 1,
        limit: 1,
        categoryId: category._id, // Lọc theo ID chính xác
        search: "", // Đảm bảo không search text
      });
      // --------------------

      const total = response.data.data.pagination.total || 0;
      categoryWordCounts.value[category._id] = total;
    }
    console.log("✅ Category word counts fetched:", categoryWordCounts.value);
  } catch (err) {
    console.error("❌ Error fetching category counts:", err);
  }
};

const fetchWords = async () => {
  try {
    isLoading.value = true;
    const params = {
      page: currentPage.value,
      limit: pageSize.value,
    };

    // --- SỬA ĐOẠN NÀY ---
    if (selectedCategory.value) {
      // Nếu đang chọn danh mục -> Gửi categoryId để lọc cứng
      params.categoryId = selectedCategory.value;
      params.search = ""; // Không search text
      console.log("🔍 Fetching words for category ID:", selectedCategory.value);
    } else if (searchQuery.value.trim()) {
      // Nếu đang search text -> Gửi text search
      params.search = searchQuery.value;
      params.categoryId = null;
      console.log("🔍 Fetching words for search:", searchQuery.value);
    } else {
      console.log("🔍 Fetching all words");
    }
    // --------------------

    const wordsResponse = await wordApi.getAll(params);

    words.value = wordsResponse.data.data.items;
    totalItems.value = wordsResponse.data.data.pagination.total;
    totalPages.value = wordsResponse.data.data.pagination.totalPages;
  } catch (err) {
    console.error("❌ Error fetching words:", err?.response?.data);
  } finally {
    isLoading.value = false;
  }
};
//6922813fd9c5a18adb2bf495
const handleSelectCategory = (categoryId) => {
  if (selectedCategory.value === categoryId) {
    selectedCategory.value = null;
    searchQuery.value = "";
    console.log("📌 Deselected category, showing all");
  } else {
    selectedCategory.value = categoryId;
    searchQuery.value = ""; // ✅ Clear search when selecting category
    console.log("📌 Selected category:", categoryId);
  }
  currentPage.value = 1;
  fetchWords();
};

const getCategoryName = (categoryId) => {
  return categories.value.find((c) => c._id === categoryId)?.name || "Unknown";
};

watch(debouncedSearch, () => {
  console.log("🔍 Debounced search triggered:", debouncedSearch.value);
  selectedCategory.value = null; // Clear category when searching
  currentPage.value = 1;
  fetchWords();
});

const goToPage = (page) => {
  currentPage.value = page;
  fetchWords();
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchWords();
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchWords();
  }
};

const paginationPages = computed(() => {
  const pages = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(
    1,
    currentPage.value - Math.floor(maxPagesToShow / 2)
  );
  const endPage = Math.min(totalPages.value, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return pages;
});

const saveWord = async (word) => {
  try {
    let response;

    if (word._id) {
      // UPDATE
      response = await wordApi.update(word._id, word);
      const updated = response.data.data;
      const index = words.value.findIndex((w) => w._id === updated._id);
      if (index !== -1) {
        words.value[index] = updated;
      }
      console.log("✅ Word updated:", updated);
      if (!isLoading.value) {
        alertMessage.value = `${updated.word} updated successfully!`;
      }
    } else {
      // CREATE
      response = await wordApi.create(word);
      const created = response.data.data;
      currentPage.value = 1;
      if (!isLoading.value) {
        alertMessage.value = `${created.word} added successfully!`;
      }
    }
    alertTitle.value = "Success!";
    showAlert.value = true;
    showWordModal.value = false;
    editingWord.value = null;
    await fetchWords();
    await fetchCategoryWordCounts(); // Update counts
  } catch (err) {
    console.error("❌ Error saving word:", err);
  }
};

const editWord = (word) => {
  editingWord.value = { ...word };
  showWordModal.value = true;
};

const editCategory = (categoryId) => {
  const categoryToEdit = categories.value.find((c) => c._id === categoryId);
  console.log("✏️ Editing category:", categoryToEdit);
  if (categoryToEdit) {
    editingCategory.value = { ...categoryToEdit };
    mode.value = "Edit";
    showCategoryModal.value = true;
  }
};

const closeModalHandler = () => {
  showCategoryModal.value = false;
  editingCategory.value = null;
  mode.value = "Add";
};

const openCategoryModal = () => {
  editingCategory.value = null;
  mode.value = "Add";
  showCategoryModal.value = true;
};

const deleteCategory = (categoryId) => {
  // ✅ FIX: Show confirm modal instead of deleting directly
  categoryToDelete.value = categoryId;
  showConfirmCategory.value = true;
};

const handleDeleteCategoryConfirm = async () => {
  try {
    isLoading.value = true;
    await categoryApi.delete(categoryToDelete.value);

    // Remove from categories array
    categories.value = categories.value.filter(
      (c) => c._id !== categoryToDelete.value
    );

    // Clear selected category if it was deleted
    if (selectedCategory.value === categoryToDelete.value) {
      selectedCategory.value = null;
    }

    // Close modal and show alert
    showConfirmCategory.value = false;
    alertTitle.value = "Deleted!";
    alertMessage.value = "Category deleted successfully!";
    showAlert.value = true;

    // Refresh counts and words
    await fetchCategoryWordCounts();
    await fetchWords();

    console.log("✅ Category deleted successfully!");
  } catch (err) {
    console.error("❌ Error deleting category:", err);
    alertTitle.value = "Error!";
    alertMessage.value = "Failed to delete category. Please try again.";
    showAlert.value = true;
  } finally {
    isLoading.value = false;
  }
};

const showConfirmCategoryModal = (categoryId) => {
  categoryToDelete.value = categoryId;
  showConfirmCategory.value = true;
};

const openConfirm = (id) => {
  deleteId.value = id;
  showConfirm.value = true;
};

const handleDeleteConfirm = async () => {
  try {
    isLoading.value = true;
    await wordApi.delete(deleteId.value);
    words.value = words.value.filter((w) => w._id !== deleteId.value);
    showConfirm.value = false;
    alertTitle.value = "Deleted!";
    showAlert.value = true;
    alertMessage.value = "Word deleted successfully!";
    // If no words left on current page and not on first page, go to previous page
    if (words.value.length === 0 && currentPage.value > 1) {
      currentPage.value--;
      await fetchWords();
    } else {
      await fetchWords();
    }
    await fetchCategoryWordCounts(); // Update counts

    console.log("✅ Word deleted successfully!");
  } catch (err) {
    console.error("❌ Error deleting word:", err);
    alert("❌ Error deleting word!");
  } finally {
    isLoading.value = false;
  }
};

const saveCategory = async (category) => {
  try {
    isLoading.value = true;
    let response;

    if (category._id) {
      // UPDATE
      response = await categoryApi.update(category._id, category);
      console.log("✅ Category updated:", response.data.data);

      const index = categories.value.findIndex((c) => c._id === category._id);
      if (index !== -1) {
        categories.value[index] = response.data.data;
      }

      alertTitle.value = "Success!";
      alertMessage.value = `${response.data.data.name} updated successfully!`;
    } else {
      // CREATE
      response = await categoryApi.create(category);
      console.log("✅ Category created:", response.data.data);

      categories.value.push(response.data.data);
      console.log(response.data.data._id);
      selectedCategory.value = response.data.data._id;
      console.log(
        "📌 New category selected:",
        selectedCategory.value,
        response.data.data.name
      );
      searchQuery.value = "";
      currentPage.value = 1;

      alertTitle.value = "Success!";
      alertMessage.value = `${response.data.data.name} created successfully!`;
    }

    showCategoryModal.value = false;
    showAlert.value = true;

    await fetchCategoryWordCountsForCategory(response.data.data._id);

    await fetchWords();
  } catch (err) {
    console.error("❌ Error saving category:", err);
    alertTitle.value = "Error!";
    alertMessage.value = "Failed to save category. Please try again.";
    showAlert.value = true;
  } finally {
    isLoading.value = false;
  }
};

// ✅ NEW: Fetch count for a single category
const fetchCategoryWordCountsForCategory = async (categoryId) => {
  try {
    const category = categories.value.find((c) => c._id === categoryId);
    if (category) {
      const response = await wordApi.getAll({
        page: 1,
        limit: 1,
        categoryId: category._id, // Đúng
        search: "", // Thêm dòng này cho chắc chắn
      });
      const total = response.data.data.pagination?.total || 0;
      categoryWordCounts.value[categoryId] = total;
      console.log(`✅ Category ${category.name} count updated: ${total}`);
    }
  } catch (err) {
    console.error("❌ Error fetching category count:", err);
  }
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
