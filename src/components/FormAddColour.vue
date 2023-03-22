<template>
  <div class="b_addColour">
    <form action="" class="b_addColour__form u_flow" @keyup="createPreview">
      <h3 class="b_addColour__title">Pick a colour</h3>

      <fieldset class="b_addColour__fieldset">
        <FormFieldColour
          id="textfield"
          label="Add Colour Hex"
          icon="hex"
          :status="formMode"
          v-model="state.colourValue"
        ></FormFieldColour>
        <!-- <div
          class="b_addColour__preview"
          :style="previewStyleObject"
          v-if="validColour"
        ></div> -->
        <FormAction
          :onClick="submitForm"
          buttonLabel="Add"
          :status="formMode"
          buttonMode="submit"
          ><FieldIconPlus></FieldIconPlus>
        </FormAction>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import FormFieldColour from "@/components/FormFieldColour.vue";
import FormAction from "@/components/FormAction.vue";
import FieldIconPlus from "@/components/icons/FieldIconPlus.vue";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

// Data
const state = reactive({
  colourValue: "#FFFFFF",
  formMode: "default",
});

// Form Validation and Submission
const hexRegex = helpers.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})/);

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

const v$ = useValidate(rules, state);

const validColour = computed(() => {
  if (!v$.value.$error && state.colourValue !== "") {
    return true;
  }

  return false;
});

const submitForm = async () => {
  let colourHex = state.colourValue;
  colourStore.addColour(colourHex.toUpperCase());
  state.formMode = "default";
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
    --text-label-font: var(--dt-sys-text-code-400);
    --form-field-error-clr: transparent;
    --form-field-icon-clr: var(--dt-ref-clr-grey-100);
  }

  &__title {
    padding: 1px 5px 5px;
  }

  &__fieldset {
    --flow-space: 7px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 10px;
    max-width: 400px;
    margin: 0;
    border: none;
    border-radius: 28px var(--dt-sys-border-rad-outer)
      var(--dt-sys-border-rad-outer) 28px;
    background-color: var(--dt-ref-clr-grey-1000);
    padding: 8px 12px 8px 8px;
    box-shadow: var(--dt-sys-shadow-card);
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
