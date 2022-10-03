<template>
  <div class="b_combinations">
    <div class="b_combinations__intro u_prose u_measure">
      <h2>Pass</h2>
      <p>
        Colour combinations meeting WCAG AA contrast standard for all text
        sizes.
      </p>
    </div>
    <div class="b_combinations__list">
      <ColourContrastWidget
        v-for="(pair, index) in passList"
        :primaryColour="pair[0]"
        :contrastColour="pair[1]"
        :contrastRatio="pair[2]"
        :key="index"
      ></ColourContrastWidget>
    </div>
    <div class="b_combinations__intro u_prose u_measure">
      <h2>Large Text Pass</h2>
      <p>
        Colour combinations meeting WCAG AA contrast standard for bold text
        above 18pt and all text above 21pt.
      </p>
    </div>
    <div class="b_combinations__list">
      <ColourContrastWidget
        v-for="(pair, index) in largePassList"
        :primaryColour="pair[0]"
        :contrastColour="pair[1]"
        :contrastRatio="pair[2]"
        :key="index"
      ></ColourContrastWidget>
    </div>
    <div class="b_combinations__intro u_prose u_measure">
      <h2>Fail</h2>
      <p>Colour combinations fail WCAG standard for colour contrast.</p>
    </div>
    <div class="b_combinations__list">
      <ColourContrastWidget
        v-for="(pair, index) in failList"
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

const passList = computed(() => {
  return colourStore.passColourCombinations;
});

const largePassList = computed(() => {
  return colourStore.largePassColourCombinations;
});

const failList = computed(() => {
  return colourStore.failColourCombinations;
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_combinations {
  padding: calc(var(--dt-sys-main-spacing) * 2);
  display: grid;
  gap: 40px;

  &__list {
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    align-items: flex-start;
  }
}
</style>
