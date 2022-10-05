<template>
  <div class="b_swatchList u_flow">
    <ColourSwatch
      v-for="(swatch, index) in coloursArray"
      :colourHex="swatch"
      v-bind:key="swatch"
    ></ColourSwatch>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import { useColourStore } from "@/stores/colourStore";
import ColourSwatch from "@/components/ColourSwatch.vue";

const colourStore = useColourStore();

// Data
const state = reactive({
  stateItem: [],
});

const props = defineProps({
  propName: null,
});

const coloursArray = computed(() => {
  return colourStore.colours;
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_swatchList {
  --flow-space: 10px;
  padding: var(--dt-sys-main-spacing);
  position: sticky;
  top: 0;
  overflow: auto;
  overscroll-behavior: unset;
  max-height: calc(100vh - 20px);
}
</style>
