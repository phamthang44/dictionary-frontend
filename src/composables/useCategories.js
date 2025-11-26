import { ref } from "vue";
import { categoryApi } from "../api/categoryApi.js";
import { wordApi } from "../api/wordApi.js";

export const useCategories = () => {
  const categories = ref([]);
  const categoryWordCounts = ref({});
  const editingCategory = ref(null);
  const mode = ref("Add");
  const isLoading = ref(false);

  const fetchCategories = async () => {
    try {
      isLoading.value = true;
      const cres = await categoryApi.getAll({
        page: 1,
        limit: 100,
      });

      if (cres.data.success) {
        categories.value = cres.data.data.data;
      }
    } catch (err) {
      console.error("Error fetching categories:", err?.response?.data);
    } finally {
      isLoading.value = false;
    }
  };

  // ✅ FIX: Use wordApi with categoryId to get accurate count
  const fetchCategoryWordCounts = async () => {
    categoryWordCounts.value = {};
    try {
      if (categories.value.length === 0) {
        console.warn("⚠️ No categories to fetch word counts for");
        return;
      }
      for (const category of categories.value) {
        // ✅ Use wordApi.getAll with categoryId filter instead of categoryApi
        const response = await wordApi.getAll({
          categoryId: category._id,
          page: 1,
          limit: 1, // Only need 1 item to get total count
        });

        const total = response.data.data.pagination?.total || 0;
        categoryWordCounts.value[category._id] = total;
      }
      // console.log(
      //   "✅ All category word counts fetched:",
      //   categoryWordCounts.value
      // );
    } catch (err) {
      console.error("❌ Error fetching category counts:", err);
    }
  };

  // ✅ FIX: Same fix for single category
  const fetchCategoryWordCountsForCategory = async (categoryId) => {
    try {
      const category = categories.value.find((c) => c._id === categoryId);
      if (category) {
        // ✅ Use wordApi.getAll with categoryId instead of categoryApi.getWordCount
        const response = await wordApi.getAll({
          categoryId: categoryId,
          page: 1,
          limit: 1,
        });

        const total = response.data.data.pagination?.total || 0;
        categoryWordCounts.value[categoryId] = total;
        // console.log(
        //   `✅ Category ${category.name} (_id: ${categoryId}) count updated: ${total} words`
        // );
      }
    } catch (err) {
      console.error("❌ Error fetching category count:", err);
    }
  };

  const getCategoryName = (categoryId) => {
    return (
      categories.value.find((c) => c._id === categoryId)?.name || "Unknown"
    );
  };

  const saveCategory = async (category) => {
    try {
      let response;

      if (category._id) {
        // UPDATE
        response = await categoryApi.update(category._id, category);
        const index = categories.value.findIndex((c) => c._id === category._id);
        if (index !== -1) {
          categories.value[index] = response.data.data;
        }
        return {
          success: true,
          message: `${response.data.data.name} updated successfully!`,
        };
      } else {
        // CREATE
        response = await categoryApi.create(category);
        categories.value.push(response.data.data);
        // ✅ Fetch count for the newly created category
        await fetchCategoryWordCountsForCategory(response.data.data._id);
        return {
          success: true,
          message: `${response.data.data.name} created successfully!`,
          category: response.data.data,
        };
      }
    } catch (err) {
      console.error("❌ Error saving category:", err);
      throw err;
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      await categoryApi.delete(categoryId);
      categories.value = categories.value.filter((c) => c._id !== categoryId);
      delete categoryWordCounts.value[categoryId];
      return { success: true, message: "Category deleted successfully!" };
    } catch (err) {
      console.error("❌ Error deleting category:", err);
      throw err;
    }
  };

  const editCategoryHandler = (categoryId) => {
    const categoryToEdit = categories.value.find((c) => c._id === categoryId);
    if (categoryToEdit) {
      editingCategory.value = JSON.parse(JSON.stringify(categoryToEdit));
      mode.value = "Edit";
      return true;
    }
    return false;
  };

  return {
    categories,
    categoryWordCounts,
    editingCategory,
    mode,
    isLoading,
    fetchCategories,
    fetchCategoryWordCounts,
    fetchCategoryWordCountsForCategory,
    getCategoryName,
    saveCategory,
    deleteCategory,
    editCategoryHandler,
  };
};
