<!-- filepath: src/components/WordModal.vue -->
<template>
  <div
    class="fixed inset-0 bg-black/40 backdrop-blur-sm bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto"
    @click.self="closeModal"
  >
    <div class="bg-white rounded-lg shadow-2xl max-w-2xl w-full my-8">
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 flex justify-between items-center sticky top-0 z-10"
      >
        <h2 class="text-2xl font-bold text-white font-poppins">
          {{ word ? "Edit Word" : "Add New Word" }}
        </h2>
        <button
          @click="$emit('close')"
          class="text-white hover:bg-white hover:text-blue-600 rounded-full w-8 h-8 flex items-center justify-center transition cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Form - Scrollable Content -->
      <form
        @submit.prevent="submit"
        class="p-6 space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto"
      >
        <!-- Word -->
        <div>
          <label
            class="block text-sm font-semibold text-gray-700 font-poppins mb-2"
          >
            Word *
          </label>
          <input
            v-model="formData.word"
            type="text"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
            placeholder="Enter the word"
          />
        </div>

        <!-- Pronunciation -->
        <div>
          <label
            class="block text-sm font-semibold text-gray-700 font-poppins mb-2"
          >
            Pronunciation
          </label>
          <input
            v-model="formData.pronunciation"
            type="text"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
            placeholder="e.g., /ɪˈleg.ənt/"
          />
        </div>

        <!-- Definition -->
        <div>
          <label
            class="block text-sm font-semibold text-gray-700 font-poppins mb-2"
          >
            Definition *
          </label>
          <textarea
            v-model="formData.definition"
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
            placeholder="Enter the definition"
            rows="3"
          ></textarea>
        </div>

        <!-- Category -->
        <div>
          <label
            class="block text-sm font-semibold text-gray-700 font-poppins mb-2"
          >
            Category *
          </label>
          <select
            v-model="formData.category"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
          >
            <option value="">Select a category</option>
            <option
              v-for="category in categories"
              :key="category._id"
              :value="category._id"
            >
              {{ category.name }}
            </option>
          </select>
        </div>

        <!-- Examples -->
        <div>
          <label
            class="block text-sm font-semibold text-gray-700 font-poppins mb-2"
          >
            Examples
          </label>
          <div class="space-y-2">
            <div
              v-for="(example, index) in formData.exampleSentence"
              :key="index"
              class="flex gap-2"
            >
              <input
                v-model="formData.exampleSentence[index]"
                type="text"
                class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-poppins"
                placeholder="Enter an example"
              />
              <button
                type="button"
                @click="removeExample(index)"
                class="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition-colors cursor-pointer font-poppins"
              >
                Remove
              </button>
            </div>
            <button
              type="button"
              @click="addExample"
              class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-poppins py-2 px-4 rounded-lg transition-colors cursor-pointer"
            >
              + Add Example
            </button>
          </div>
        </div>

        <!-- Buttons - Sticky Bottom -->
        <div class="flex gap-4 pt-4 border-t border-gray-200">
          <button
            type="submit"
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-poppins py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            {{ word ? "Update" : "Add" }}
          </button>
          <button
            type="button"
            @click="$emit('close')"
            class="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 font-poppins py-3 px-4 rounded-lg transition-colors cursor-pointer"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";

const props = defineProps({
  word: Object,
  categories: Array,
});

const emit = defineEmits(["save", "close"]);

const formData = ref({
  word: "",
  pronunciation: "",
  definition: "",
  category: "",
  exampleSentence: [""],
});

watch(
  () => props.word,
  (newWord) => {
    if (newWord) {
      formData.value = { ...newWord };
    } else {
      formData.value = {
        word: "",
        pronunciation: "",
        definition: "",
        category: "",
        exampleSentence: [""],
      };
    }
  },
  { immediate: true }
);

const addExample = () => {
  formData.value.exampleSentence.push("");
};

const removeExample = (index) => {
  formData.value.exampleSentence.splice(index, 1);
};

const submit = () => {
  if (
    !formData.value.word.trim() ||
    !formData.value.definition.trim() ||
    !formData.value.category
  ) {
    return;
  }

  if (!formData.value.category) {
    return;
  }

  formData.value.exampleSentence = formData.value.exampleSentence.filter(
    (e) => e.trim() !== ""
  );
  emit("save", { ...formData.value });
};

const closeModal = () => {
  emit("close");
};

const handleKeydown = (e) => {
  if (e.key === "Escape") closeModal();
};

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));
</script>

<style scoped>
* {
  font-family: "Poppins", sans-serif;
}
</style>
