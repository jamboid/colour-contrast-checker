<template>
  <form class="u_flow">
    Form Text
    <FormFieldText
      id="textfield"
      label="Token Name"
      v-model="state.tokenName"
    ></FormFieldText>
    <FormFieldText
      id="textfield"
      label="Token Value"
      v-model="state.tokenValue"
    ></FormFieldText>
    <FormActionSubmit
      :onClick="submitForm"
      buttonLabel="Save token"
    ></FormActionSubmit>
  </form>
</template>

<script setup>
// Imports
import { reactive, computed } from "vue";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import FormFieldText from "@/components/FormFieldText.vue";
import FormAction from "@/components/FormAction.vue";

// Data
const state = reactive({
  tokenName: "",
  tokenValue: "",
});

const props = defineProps({
  nodeID: {
    type: String,
    required: true,
  },
});

const rules = computed(() => {
  return {
    tokenName: { required },
    tokenValue: { required },
  };
});

const v$ = useValidate(rules, state);

const submitForm = async () => {
  v$.value.$validate(); // checks all inputs
  if (!v$.value.$error) {
    // if ANY fail validation
    alert("Submit: " + state.tokenName);
  } else {
    alert("Form failed validation");
  }
};

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped></style>
