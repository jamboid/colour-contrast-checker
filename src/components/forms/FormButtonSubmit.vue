<template>
  <div class="b_button">
    <button @click.prevent="onClick">{{ buttonLabel }}</button>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";

// Data
const state = reactive({
  stateItem: [],
});

const props = defineProps({
  onClick: {
    type: Function,
    required: true,
  },
  buttonLabel: {
    type: String,
    required: true,
  },
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped></style>
