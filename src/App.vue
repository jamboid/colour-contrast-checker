<template>
  <div class="b_page">
    <header class="b_page__header">
      <FormAddColourVue></FormAddColourVue>
      <SwatchList></SwatchList>
    </header>
    <main class="b_page__content">
      <CombinationsList></CombinationsList>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

import FormAddColourVue from "@/components/forms/FormAddColour.vue";
import SwatchList from "@/components/SwatchList.vue";
import CombinationsList from "./components/CombinationsList.vue";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

onMounted(() => {
  colourStore.loadColoursFromQueryString();
});
</script>

<style lang="scss">
body {
  font-family: var(--dt-ref-fontFamily-base);
  font-weight: 400;
  padding: 0;
  margin: 0;
  color: var(--dt-sys-clr-text-body);
  background: var(--dt-sys-clr-theme-background-light);
}

.b_page {
  display: grid;
  grid-template-columns: 330px 1fr;

  &__header {
    grid-column: 1;
    grid-row: 1;
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 0;
    overflow: auto;
    overscroll-behavior: unset;
    background: var(--dt-ref-clr-grey-900);
  }

  &__content {
    grid-column: 2;
    grid-row: 1;
  }
}
</style>
