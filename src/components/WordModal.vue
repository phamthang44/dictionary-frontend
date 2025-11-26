<!-- filepath: src/components/WordModal.vue -->
<template>
  <div
    class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50 overflow-y-auto"
    @click.self="closeModal"
  >
    <div
      class="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl shadow-purple-500/30 max-w-2xl w-full my-8 border border-purple-500/20 overflow-hidden"
    >
      <!-- Header -->
      <div
        class="bg-gradient-to-r from-purple-600/80 via-pink-600/80 to-blue-600/80 px-8 py-6 flex justify-between items-center sticky top-0 z-10 backdrop-blur-sm border-b border-purple-500/30"
      >
        <div>
          <h2 class="text-3xl font-bold text-white font-poppins">
            {{ word ? "✏️ Edit Word" : "📝 Add New Word" }}
          </h2>
          <p class="text-purple-100 text-sm font-poppins mt-1">
            {{
              word
                ? "Update your word details"
                : "Add a new word to your library"
            }}
          </p>
        </div>
        <button
          @click="$emit('close')"
          class="text-white hover:bg-white/20 rounded-full w-10 h-10 flex items-center justify-center transition duration-300 cursor-pointer font-bold text-xl hover:scale-110 transform"
        >
          ✕
        </button>
      </div>

      <!-- Form - Scrollable Content -->
      <form
        @submit.prevent="submit"
        class="p-8 space-y-6 max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-slate-800/50"
      >
        <!-- Word -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Word *
          </label>
          <input
            v-model="formData.word"
            type="text"
            class="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm"
            placeholder="Enter the word"
          />
        </div>

        <!-- Pronunciation -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Pronunciation
          </label>
          <input
            v-model="formData.pronunciation"
            type="text"
            class="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm"
            placeholder="e.g., /ɪˈleg.ənt/"
          />
        </div>

        <!-- Definition -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Definition *
          </label>
          <textarea
            v-model="formData.definition"
            class="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm resize-none"
            placeholder="Enter the definition"
            rows="4"
          ></textarea>
        </div>

        <!-- Category -->
        <div class="space-y-2">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Category *
          </label>
          <select
            v-model="formData.category"
            class="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm appearance-none cursor-pointer"
            style="
              background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2IoMjA5LDIxMywyMTkpIiBzdHJva2Utd2lkdGg9IjIiPjxwYXRoIGQ9Ik02IDlsNiA2IDYtNiIvPjwvc3ZnPg==');
              background-repeat: no-repeat;
              background-position: right 0.5rem center;
              background-size: 1.5em 1.5em;
              padding-right: 2.5rem;
            "
          >
            <option value="" v-show="!formData.category">
              Select a category
            </option>
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
        <div class="space-y-3">
          <label
            class="block text-sm font-semibold text-gray-300 font-poppins uppercase tracking-wider"
          >
            Examples
          </label>
          <div class="space-y-3">
            <div
              v-for="(example, index) in formData.exampleSentence"
              :key="index"
              class="group flex gap-3"
            >
              <input
                v-model="formData.exampleSentence[index]"
                type="text"
                class="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent font-poppins transition-all duration-300 backdrop-blur-sm"
                placeholder="Enter an example sentence"
              />
              <button
                type="button"
                @click="removeExample(index)"
                class="bg-red-600/70 hover:bg-red-600 text-white px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer font-poppins font-semibold hover:shadow-lg hover:shadow-red-500/30 transform hover:scale-105"
              >
                🗑️
              </button>
            </div>
            <button
              type="button"
              @click="addExample"
              class="w-full bg-gradient-to-r from-blue-600/50 to-purple-600/50 hover:from-blue-600 hover:to-purple-600 text-white font-poppins py-3 px-4 rounded-lg transition-all duration-300 cursor-pointer border border-blue-500/30 hover:border-blue-400/50 hover:shadow-lg hover:shadow-blue-500/30"
            >
              + Add Example
            </button>
          </div>
        </div>

        <!-- Buttons - Sticky Bottom -->
        <div class="flex gap-4 pt-6 border-t border-purple-500/20">
          <button
            type="submit"
            class="flex-1 group relative px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-poppins font-semibold rounded-lg overflow-hidden hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
          >
            <span class="relative z-10">
              {{ word ? "Update Word" : "Add Word" }}
            </span>
            <div
              class="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity"
            ></div>
          </button>
          <button
            type="button"
            @click="$emit('close')"
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
import { ref, watch, onMounted, onUnmounted } from "vue";
import AlertModal from "./AlertModal.vue";
const props = defineProps({
  word: Object,
  categories: Array,
});

const emit = defineEmits(["save", "close"]);

const showAlert = ref(false);
const alertTitle = ref("");
const alertMessage = ref("");

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
      formData.value = JSON.parse(JSON.stringify(newWord)); //deep clone
      if (!formData.value.exampleSentence) {
        formData.value.exampleSentence = [""];
      }
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

const showAlertModal = (title, message) => {
  alertTitle.value = title;
  alertMessage.value = message;
  showAlert.value = true;
};

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
    showAlertModal(
      "⚠️ Missing Fields",
      "Please fill in all required fields before proceeding."
    );
    return;
  }

  const filteredExamples = formData.value.exampleSentence.filter(
    (e) => e.trim() !== ""
  );

  emit("save", {
    ...formData.value,
    exampleSentence: filteredExamples,
  });
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

/* Select dropdown styling */
select option {
  background: rgb(30, 41, 59);
  color: rgb(209, 213, 219);
  padding: 0.5rem;
}

select option:checked {
  background: linear-gradient(rgb(147, 51, 234), rgb(147, 51, 234));
  color: white;
}
</style>
