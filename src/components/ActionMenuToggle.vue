<template>
  <button class="b_actionToggle">
    <span class="b_actionToggle__icon">
      <IconActionToggle></IconActionToggle>
    </span>
  </button>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import IconActionToggle from "@/components/icons/IconActionToggle.vue";

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
