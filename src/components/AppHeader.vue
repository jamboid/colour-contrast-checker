<template>
  <div class="b_appHeader"></div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";

// Data
const state = reactive({
  stateItem: [],
});

const props = defineProps({
  propName: null,
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped></style>
