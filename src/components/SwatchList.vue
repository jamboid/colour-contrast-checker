<template>
  <div>
    <draggable
      class="b_swatchList u_flow"
      v-model="colours"
      @start="drag = true"
      @end="drag = false"
      @change="listOrderUpdated"
      item-key="element"
    >
      <template #item="{ element }">
        <ColourSwatch :colourHex="element"></ColourSwatch>
      </template>
    </draggable>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import { useColourStore } from "@/stores/colourStore";
import ColourSwatch from "@/components/ColourSwatch.vue";
import draggable from "vuedraggable";
import { storeToRefs } from "pinia";

const colourStore = useColourStore();

const { colours } = storeToRefs(colourStore);
const { updateURLData } = colourStore;

const listOrderUpdated = function () {
  updateURLData();
};
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
