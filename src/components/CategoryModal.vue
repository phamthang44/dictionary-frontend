<!-- filepath: src/components/CategoryModal.vue -->
<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
    @click.self="closeModal"
  >
    <div
      class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl shadow-blue-500/30 max-w-md w-full my-8 border border-blue-500/20 overflow-hidden"
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-blue-600/80 via-purple-600/80 to-pink-600/80 px-8 py-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm border-b border-blue-500/30"
      >
        <div>
          <h2 class="text-3xl font-bold text-white font-poppins">
            {{ mode === "Add" ? "➕ Add Category" : "✏️ Edit Category" }}
          </h2>
          <p class="text-blue-100 text-sm font-poppins mt-1">
            {{
              mode === "Add"
                ? "Create a new word collection"
                : "Update your category details"
            }}
          </p>
        </div>
        <button
          @click="closeModal"
          class="text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition duration-300 cursor-pointer font-bold text-xl hover:scale-110 transform"
        >
          ✕
        </button>
      </div>

      <!-- Form -->
      <form @submit.prevent="submit" class="p-8 space-y-6">
        <!-- Category Name -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Category Name *
          </label>
          <input
            v-model="category.name"
            type="text"
            class="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm"
            placeholder="e.g., Technology, Science"
            @keydown.esc="closeModal"
          />
          <p class="text-xs text-gray-400 font-poppins mt-1">
            Give your category a clear, descriptive name
          </p>
        </div>

        <!-- Category Description -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Description *
          </label>
          <textarea
            v-model="category.description"
            class="w-full px-4 py-3 bg-slate-700/50 border border-blue-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder="e.g., All technology-related terms and vocabulary"
            rows="3"
            @keydown.esc="closeModal"
          ></textarea>
          <p class="text-xs text-gray-400 font-poppins mt-1">
            Describe what this category is for
          </p>
        </div>

        <!-- Category Preview -->
        <div
          class="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 backdrop-blur-sm"
        >
          <p
            class="text-xs text-gray-400 font-poppins uppercase tracking-wider mb-2"
          >
            📋 Preview
          </p>
          <div class="space-y-2">
            <p class="text-white font-semibold font-poppins">
              {{ category.name || "Your Category Name" }}
            </p>
            <p class="text-gray-400 text-sm font-poppins">
              {{
                category.description ||
                "Your category description will appear here"
              }}
            </p>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-4 pt-6 border-t border-blue-500/20">
          <button
            type="submit"
            class="flex-1 group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-poppins font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span class="relative z-10">
              {{ mode === "Add" ? "Create Category" : "Update Category" }}
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </button>
          <button
            type="button"
            @click="closeModal"
            class="flex-1 px-6 py-3 bg-slate-700/50 hover:bg-slate-600/50 text-gray-300 hover:text-white font-poppins font-semibold rounded-lg border border-slate-600/50 hover:border-slate-500/50 transition-all duration-300 cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>

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
import { ref, onMounted, onUnmounted, watch } from "vue";
import AlertModal from "./AlertModal.vue"; 

const props = defineProps({
  mode: {
    type: String,
    default: "Add", // or "Edit"
  },
  data: {
    type: Object,
    default: null,
  },
});

const emit = defineEmits(["save", "close"]);

const category = ref({
  name: "",
  description: "",
});

const showAlert = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

watch(
  () => props.data,
  (newData) => {
    if (newData) {
      category.value = JSON.parse(JSON.stringify(newData)); //deep clone
    } else {
      category.value = { name: "", description: "" };
    }
  },
  { immediate: true }
);

const showAlertModal = (title, message) => {
  alertTitle.value = title;
  alertMessage.value = message;
  showAlert.value = true;
};

const closeModal = () => {
  emit("close");
  category.value.name = "";
  category.value.description = "";
};

const handleKeydown = (e) => {
  if (e.key === "Escape") closeModal();
};

const submit = () => {
  if (!category.value.name.trim()) {
    showAlertModal(
      "⚠️ Category Name Required",
      "Please enter a category name before proceeding."
    );
    return;
  }

  if (!category.value.description.trim()) {
    showAlertModal(
      "⚠️ Description Required",
      "Please enter a category description before proceeding."
    );
    return;
  }

  emit("save", {
    _id: category.value._id || null,
    name: category.value.name.trim(),
    description: category.value.description.trim(),
  });

  category.value.name = "";
  category.value.description = "";
  emit("close");
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}

/* Custom focus styling */
input:focus,
textarea:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}
</style>
