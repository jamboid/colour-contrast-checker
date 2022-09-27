<template>
  <div class="b_addColour">
    <form action="" class="b_addColour__form">
      <FormFieldText
        id="textfield"
        label="Colour Hex"
        v-model="state.colourValue"
      ></FormFieldText>
      <FormButtonSubmit
        :onClick="submitForm"
        buttonLabel="Add Colour"
      ></FormButtonSubmit>
    </form>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import FormFieldText from "@/components/forms/FormFieldText.vue";
import FormButtonSubmit from "@/components/forms/FormButtonSubmit.vue";
import useValidate from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

// Data
const state = reactive({
  colourValue: "",
});

// Form Validation and Submission
const hexRegex = helpers.regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/);

const rules = computed(() => {
  return {
    colourValue: { required, hexRegex },
  };
});

const v$ = useValidate(rules, state);

const submitForm = async () => {
  v$.value.$validate(); // checks all inputs
  if (!v$.value.$error) {
    // if ANY fail validation
    colourStore.addColour(state.colourValue);
  } else {
    alert("Form failed validation");
  }
};

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped></style>
