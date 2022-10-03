<template>
  <div class="b_addColour">
    <form action="" class="b_addColour__form">
      <FormFieldText
        id="textfield"
        label="Add Colour Hex"
        icon="hex"
        :status="formMode"
        v-model="state.colourValue"
      ></FormFieldText>
      <FormAction
        :onClick="submitForm"
        buttonLabel="Add"
        :status="formMode"
        buttonMode="submit"
        buttonType="icon"
      >
        <FieldIconPlus></FieldIconPlus></FormAction
      >
    </form>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import FormFieldText from "@/components/forms/FormFieldText.vue";
import FormAction from "@/components/forms/FormAction.vue";
import FieldIconPlus from "@/components/forms/icons/FieldIconPlus.vue";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

// Data
const state = reactive({
  colourValue: "",
  formMode: "default",
});

// Form Validation and Submission
const hexRegex = helpers.regex(/^(?:[0-9a-fA-F]{3}){1,2}$/);

const rules = computed(() => {
  return {
    colourValue: { required, hexRegex },
  };
});

const formMode = computed(() => {
  return state.formMode;
});

const v$ = useValidate(rules, state);

const submitForm = async () => {
  v$.value.$validate(); // checks all inputs
  if (!v$.value.$error) {
    colourStore.addColour(state.colourValue.toUpperCase());
    state.colourValue = "";
    state.formMode = "default";
  } else {
    // Set form to error mode
    state.formMode = "error";
  }
};

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_addColour {
  padding: var(--dt-sys-main-spacing);
  background: var(--dt-ref-clr-grey-900);

  &__form {
    display: flex;
    align-items: end;
    gap: 5px;
    max-width: 400px;
    margin-inline-end: auto;

    > * {
      grid-column: 1 / -1;
    }
  }
}
</style>
