<template>
  <div class="b_swatch">
    <div class="b_swatch__colour">
      <div class="b_swatch__sample" :style="styleObject"></div>
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
import FormAction from "@/components/forms/FormAction.vue";
import FieldIconCross from "@/components/forms/icons/FieldIconCross.vue";
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

const styleObject = reactive({
  backgroundColor: props.colourHex,
});

const deleteColour = async () => {
  colourStore.removeColour(props.colourHex);
};

const filterColourList = computed(() => {
  let colourArray = [...colourStore.colours];

  if (colourArray.indexOf(props.colourHex) > -1) {
    const indexOfColour = colourArray.indexOf(props.colourHex);
    colourArray.splice(indexOfColour, 1);
    return [...colourArray];
  } else {
    return false;
  }
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_swatch {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  padding:8px;
  background:var(--dt-ref-clr-grey-1000);
  border-radius:var(--dt-sys-border-rad-normal);

  &__colour {
    align-self: stretch;
    display:flex;
  }

  &__sample {
    width: 40px;
    height: 40px;
    display: inline-block;
    border: 1px solid #aaa;
    border-radius: 5px;
    grid-column: 1;
    align-self: stretch;
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
