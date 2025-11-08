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
                @input="handleSearch"
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
            class="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6"
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

    <!-- Category Modal -->
    <CategoryModal
      v-if="showCategoryModal"
      @save="saveCategory"
      @close="showCategoryModal = false"
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
import { useDebounce } from "../composables/useDebounce.js";

const showWordModal = ref(false);
const showCategoryModal = ref(false);
const editingWord = ref(null);

const searchQuery = ref("");
const debouncedSearch = useDebounce(searchQuery, 1000);

const selectedCategory = ref(null);

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
      const response = await wordApi.getAll({
        page: 1,
        limit: 1,
        search: category.name,
      });
      const total = response.data.data.items?.length || 0;
      categoryWordCounts.value[category._id] = total;
    }
    console.log("✅ Category word counts fetched:", categoryWordCounts.value);
  } catch (err) {
    console.error("❌ Error fetching category counts:", err);
    categoryWordCounts.value[category._id] = 0;
  }
};

const fetchWords = async () => {
  try {
    isLoading.value = true;
    let searchValue = "";
    const params = {
      page: currentPage.value,
      limit: pageSize.value,
      search: searchValue,
    };

    if (selectedCategory.value) {
      // Get the category name
      const categoryName = getCategoryName(selectedCategory.value);

      searchValue = categoryName;

      params.search = searchValue;
    }
    if (searchQuery.value.trim()) {
      params.search = searchQuery.value;
    }

    //onsole.log("Fetching words with params:", params.search);
    const wordsResponse = await wordApi.getAll(params);

    // Adjust based on your API response structure
    words.value = wordsResponse.data.data.items;
    //console.log("params", words.value);
    // console.log("wordsResponse", wordsResponse.data.data.pagination);

    totalItems.value = wordsResponse.data.data.pagination.total;
    totalPages.value = wordsResponse.data.data.pagination.totalPages;

    // console.log("total pages", totalPages.value);

    // console.log("✅ Words fetched:", words.value);
  } catch (err) {
    console.error("❌ Error fetching words:", err?.response?.data);
  } finally {
    isLoading.value = false;
  }
};

const handleSelectCategory = (categoryId) => {
  //console.log("🔍 Selected category ID:", categoryId);
  selectedCategory.value = categoryId;
  currentPage.value = 1;
  fetchWords();
};

const getCategoryName = (categoryId) => {
  return categories.value.find((c) => c._id === categoryId)?.name || "Unknown";
};

const handleSearch = () => {
  selectedCategory.value = null;
  currentPage.value = 1;
  watch(debouncedSearch, (val) => {
    console.log("🔍 Searching for:", val);
    fetchWords();
  });
};

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
      // await fetchWords();
      // console.log("✅ Word created:", created);
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
    const response = await categoryApi.create(category);
    categories.value.push(response.data.data);
    showCategoryModal.value = false;
    console.log("✅ Category created:", response.data.data);
  } catch (err) {
    console.error("❌ Error creating category:", err);
    alert("❌ Error creating category!");
  } finally {
    isLoading.value = false;
  }
};
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
