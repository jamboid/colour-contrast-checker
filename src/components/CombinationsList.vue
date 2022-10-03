<template>
  <div class="b_combinations">
    <div class="b_combinations__list">
      <ColourContrastWidget
        v-for="(pair, index) in comboList"
        :primaryColour="pair[0]"
        :contrastColour="pair[1]"
        :contrastRatio="pair[2]"
        :key="index"
      ></ColourContrastWidget>
    </div>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import ColourContrastWidget from "@/components/ColourContrastWidget.vue";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

// Data

const comboList = computed(() => {
  return colourStore.uniqueColourCombinations;
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_combinations {
  padding: var(--dt-sys-main-spacing);

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    align-items: flex-start;
  }
}
</style>
