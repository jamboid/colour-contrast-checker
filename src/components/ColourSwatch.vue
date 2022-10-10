<template>
  <div class="b_swatch">
    <div class="b_swatch__colour">
      <div
        class="b_swatch__sample"
        :style="{ backgroundColor: colourHex }"
      ></div>
    </div>
    <div class="b_swatch__details">
      <p>{{ colourHex }}</p>
      <form>
        <FormAction
          :onClick.prevent="deleteColour"
          buttonLabel="Delete"
          buttonMode="delete"
          buttonType="icon"
          ><FieldIconCross></FieldIconCross
        ></FormAction>
      </form>
    </div>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import FormAction from "@/components/FormAction.vue";
import FieldIconCross from "@/components/icons/FieldIconCross.vue";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

// Data
const state = reactive({
  isEditing: false,
});

const props = defineProps({
  colourHex: {
    type: String,
    required: true,
  },
});

const styleObject = computed({
  backgroundColor: props.colourHex,
});

const deleteColour = async () => {
  colourStore.removeColour(props.colourHex);
};

// const filterColourList = computed(() => {
//   let colourArray = [...colourStore.colours];

//   if (colourArray.indexOf(props.colourHex) > -1) {
//     const indexOfColour = colourArray.indexOf(props.colourHex);
//     colourArray.splice(indexOfColour, 1);
//     return [...colourArray];
//   } else {
//     return false;
//   }
// });

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_swatch {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  padding: 8px;
  background: var(--dt-ref-clr-grey-1000);
  box-shadow: var(--dt-sys-shadow-card);
  border-radius: var(--dt-sys-border-rad-small);
  cursor: move;

  &__colour {
    align-self: stretch;
    display: flex;
  }

  &__sample {
    width: 40px;
    height: 40px;
    display: inline-block;
    grid-column: 1;
    align-self: stretch;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 2;

    p {
      font: var(--dt-sys-text-code-400);
    }
  }
}
</style>
