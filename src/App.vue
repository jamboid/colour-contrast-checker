<template>
  <div class="b_page">
    <ThePageHeader></ThePageHeader>
    <header class="b_page__header">
      <div class="b_page__headerInner">
        <FormAddColourVue></FormAddColourVue>
        <SwatchList></SwatchList>
        <PaletteControls></PaletteControls>
      </div>
    </header>
    <main class="b_page__content">
      <CombinationsList></CombinationsList>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ThePageHeader from "./components/ThePageHeader.vue";
import FormAddColourVue from "@/components/FormAddColour.vue";
import SwatchList from "@/components/SwatchList.vue";
import CombinationsList from "./components/CombinationsList.vue";
import PaletteControls from "./components/PaletteControls.vue";
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
  grid-template-rows: auto 1fr;
  min-height: 100vh;

  &__header {
    background: var(--dt-ref-clr-grey-900);
    grid-column: 1;
    grid-row: 2;
  }

  &__headerInner {
    position: sticky;
    top: 0;
    overflow: auto;
    overscroll-behavior: unset;
    max-height: calc(100vh - 20px);
  }

  &__content {
    grid-column: 2;
    grid-row: 2;
  }
}
</style>
