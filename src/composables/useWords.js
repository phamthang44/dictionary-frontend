import { ref, computed, watch } from "vue";
import { wordApi } from "../api/wordApi.js";
import { useDebounce } from "./useDebounce.js";

export const useWords = () => {
  const searchQuery = ref("");
  const debouncedSearch = useDebounce(searchQuery, 1000);
  const selectedCategory = ref(null);
  const words = ref([]);
  const isLoading = ref(false);

  // Pagination
  const currentPage = ref(1);
  const pageSize = ref(10);
  const totalItems = ref(0);
  const totalPages = ref(0);

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

  const fetchWords = async () => {
    try {
      isLoading.value = true;
      const params = {
        page: currentPage.value,
        limit: pageSize.value,
      };

      if (selectedCategory.value) {
        params.categoryId = selectedCategory.value;
        params.search = "";
        console.log(
          "🔍 Fetching words for category ID:",
          selectedCategory.value
        );
      } else if (searchQuery.value.trim()) {
        params.search = searchQuery.value;
        params.categoryId = null;
        console.log("🔍 Fetching words for search:", searchQuery.value);
      } else {
        console.log("🔍 Fetching all words");
      }

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

  const handleSelectCategory = (categoryId) => {
    if (selectedCategory.value === categoryId) {
      selectedCategory.value = null;
      searchQuery.value = "";
      console.log("📌 Deselected category, showing all");
    } else {
      selectedCategory.value = categoryId;
      searchQuery.value = "";
      console.log("📌 Selected category:", categoryId);
    }
    currentPage.value = 1;
    fetchWords();
  };

  const saveWord = async (word) => {
    try {
      let response;

      if (word._id) {
        response = await wordApi.update(word._id, word);
        const updated = response.data.data;
        const index = words.value.findIndex((w) => w._id === updated._id);
        if (index !== -1) {
          words.value[index] = updated;
        }
        console.log("✅ Word updated:", updated);
        return {
          success: true,
          message: `${updated.word} updated successfully!`,
          data: updated,
        };
      } else {
        response = await wordApi.create(word);
        const created = response.data.data;
        currentPage.value = 1;
        console.log("✅ Word created:", created);
        await fetchWords();
        return {
          success: true,
          message: `${created.word} added successfully!`,
        };
      }
    } catch (err) {
      console.error("❌ Error saving word:", err);
      throw err;
    }
  };

  const deleteWord = async (wordId) => {
    try {
      await wordApi.delete(wordId);
      words.value = words.value.filter((w) => w._id !== wordId);
      if (words.value.length === 0 && currentPage.value > 1) {
        currentPage.value--;
        await fetchWords();
      } else {
        await fetchWords();
      }
      return { success: true, message: "Word deleted successfully!" };
    } catch (err) {
      console.error("❌ Error deleting word:", err);
      throw err;
    }
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

  // Watch debounced search
  watch(debouncedSearch, () => {
    console.log("🔍 Debounced search triggered:", debouncedSearch.value);
    selectedCategory.value = null;
    currentPage.value = 1;
    fetchWords();
  });

  return {
    searchQuery,
    debouncedSearch,
    selectedCategory,
    words,
    isLoading,
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
  };
};
