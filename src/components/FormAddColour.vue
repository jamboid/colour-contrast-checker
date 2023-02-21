<template>
  <div class="b_addColour">
    <form action="" class="b_addColour__form u_flow" @keyup="createPreview">
      <h3 class="b_addColour__title">Add a hex colour</h3>

      <fieldset class="b_addColour__fieldset">
        <FormFieldText
          id="textfield"
          label="Add Colour Hex"
          icon="hex"
          :status="formMode"
          v-model="state.colourValue"
        ></FormFieldText>
        <div
          class="b_addColour__preview"
          :style="previewStyleObject"
          v-if="validColour"
        ></div>
        <FormAction
          :onClick="submitForm"
          buttonLabel="Add"
          :status="formMode"
          buttonMode="submit"
          buttonType="icon"
        >
          <FieldIconPlus></FieldIconPlus>
        </FormAction>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import FormFieldText from "@/components/FormFieldText.vue";
import FormAction from "@/components/FormAction.vue";
import FieldIconPlus from "@/components/icons/FieldIconPlus.vue";
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

const createPreview = () => {
  v$.value.$validate();
};

const previewStyleObject = computed(() => {
  const formattedColour = "#" + state.colourValue;
  return { backgroundColor: formattedColour };
});

const v$ = useValidate(rules, state);

const validColour = computed(() => {
  if (!v$.value.$error && state.colourValue !== "") {
    return true;
  }

  return false;
});

const submitForm = async () => {
  v$.value.$validate(); // checks all inputs
  if (!v$.value.$error) {
    let colourHex = state.colourValue;

    if (colourHex.length === 3) {
      colourHex = colourHex
        .split("")
        .map(function (hex) {
          return hex + hex;
        })
        .join("");
    }

    colourStore.addColour(colourHex.toUpperCase());
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
  padding: calc(var(--dt-sys-main-spacing) * 1) var(--dt-sys-main-spacing)
    calc(var(--dt-sys-main-spacing) / 2);
  //background: var(--dt-ref-clr-grey-900);

  &__form {
    --form-field-border-clr: transparent;
    --form-field-label-display: none;
    --form-field-error-clr: transparent;
    --form-field-icon-clr: var(--dt-ref-clr-grey-100);
  }

  &__title {
    padding: 1px 5px;
  }

  &__fieldset {
    --flow-space: 7px;

    display: flex;
    align-items: center;
    gap: 10px;
    max-width: 400px;
    margin: 0;
    border: 1px solid var(--dt-sys-clr-form-field-border);
    border-radius: var(--dt-sys-border-rad-form-field);
    background-color: var(--dt-ref-clr-grey-1000);
    padding: 1px 5px;
  }

  &__preview {
    flex: 0 0 30px;
    width: 30px;
    height: 30px;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
  }
}
</style>
