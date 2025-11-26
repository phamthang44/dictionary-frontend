<script setup>
import { ref } from "vue";

const props = defineProps({
  spotlightColor: {
    type: String,
    default: "rgba(168, 85, 247, 0.4)",
  },
});

const divRef = ref(null);
const position = ref({ x: 0, y: 0 });
const opacity = ref(0);

const handleMouseMove = (e) => {
  if (!divRef.value) return;

  const rect = divRef.value.getBoundingClientRect();
  position.value = {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
};

const handleMouseEnter = () => {
  opacity.value = 1;
};

const handleMouseLeave = () => {
  opacity.value = 0;
};
</script>

<template>
  <div
    ref="divRef"
    @mousemove="handleMouseMove"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    class="group relative rounded-2xl"
  >
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500 z-10"
      :style="{
        opacity: opacity,
        background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        '-webkit-mask':
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        '-webkit-mask-composite': 'xor',
        padding: '1px',
      }"
    ></div>

    <slot />
  </div>
</template>
