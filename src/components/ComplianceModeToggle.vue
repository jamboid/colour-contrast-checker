<template>
  <div class="b_modeToggle">
    <h3 class="b_modeToggle__title">Select WCAG Compliance Level</h3>
    <button
      class="b_modeToggle__control"
      :class="[modeClass]"
      @click.prevent="toggleMode()"
    >
      <span class="b_modeToggle__label">AA</span>
      <span class="b_modeToggle__switch u_pseudo"></span>
      <span class="b_modeToggle__label">AAA</span>
    </button>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed } from "vue";
import { useColourStore } from "@/stores/colourStore";
const colourStore = useColourStore();

// Data
const state = reactive({
  mode: "AA",
});

const props = defineProps({
  propName: null,
});

const modeClass = computed(() => {
  if (state.mode === "AA") {
    return "b_modeToggle--aa";
  } else {
    return "b_modeToggle--aaa";
  }
});

const toggleMode = function () {
  if (state.mode === "AA") {
    state.mode = "AAA";
  } else {
    state.mode = "AA";
  }

  colourStore.complianceModeGetSet = state.mode;
};

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_modeToggle {
  padding: calc(var(--dt-sys-main-spacing) * 0.4) var(--dt-sys-main-spacing);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  background: var(--dt-ref-clr-grey-800);
  border-radius: var(--dt-sys-size-s) 0 0 0;

  &__title {
    //order: 1;
    font: var(--dt-sys-heading-700);
    color: var(--dt-ref-clr-grey-100);
  }

  &__control {
    -webkit-appearance: none;
    border: none;
    background: none;
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    padding: 10px 20px;
    background: var(--dt-ref-clr-grey-1000);
    border-radius: var(--dt-sys-border-rad-large);
    //border-radius: 40px;
    box-shadow: var(--dt-sys-shadow-card);
  }

  &__label {
    font: var(--dt-sys-heading-700);
    color: var(--dt-ref-clr-blue-200);
  }

  &__switch {
    width: 50px;
    height: 30px;
    border-radius: 20px;
    background: var(--dt-ref-clr-grey-900);
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.4);

    &:after {
      width: 22px;
      height: 22px;
      background: var(--dt-ref-clr-blue-200);
      border-radius: 15px;
      top: 50%;
      transform: translateY(-50%);
      left: var(--switch-pill-left, 4px);
      transition: all var(--dt-sys-trans-short);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
    }
  }

  &--aaa {
    --switch-pill-left: calc(100% - 26px);
  }
}
</style>
