<template>
  <div class="b_controls">
    <div class="b_controls__clear" v-if="paletteIsNotEmpty">
      <FormAction
        :onClick="clearPalette"
        buttonLabel="Clear palette"
        :status="formMode"
        buttonMode="submit"
      ></FormAction>
    </div>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import { useColourStore } from "@/stores/colourStore";
import FormAction from "@/components/FormAction.vue";

const colourStore = useColourStore();

// Data
const state = reactive({
  stateItem: [],
});

const props = defineProps({
  propName: null,
});

const clearPalette = function () {
  colourStore.clearPalette();
};

const paletteIsNotEmpty = computed(() => {
  if (colourStore.colours.length) {
    return true;
  }

  return false;
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_controls {
  padding: var(--dt-sys-main-spacing);

  &__clear {
    --form-button-width: auto;
    --form-button-height: auto;
    --button-background: var(--dt-ref-clr-red-400);
    --button-padding: 0.4em 0.65em;
    --button-font: var(--dt-sys-body-300);
  }
}
</style>
