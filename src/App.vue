<template>
  <div class="b_page">
    <ThePageHeader></ThePageHeader>
    <section class="b_page__title">
      <PaletteSelector></PaletteSelector>
      <PaletteTitle></PaletteTitle>
    </section>
    <section class="b_page__list">
      <div class="b_page__listInner">
        <FormAddColourVue></FormAddColourVue>
        <SwatchList></SwatchList>
        <PaletteControls></PaletteControls>
      </div>
    </section>
    <main class="b_page__content">
      <CombinationsList></CombinationsList>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import ThePageHeader from "./components/ThePageHeader.vue";
import FormAddColourVue from "@/components/FormAddColour.vue";
import PaletteSelector from "@/components/PaletteSelector.vue";
import SwatchList from "@/components/SwatchList.vue";
import CombinationsList from "./components/CombinationsList.vue";
import PaletteTitle from "./components/PaletteTitle.vue";
import PaletteControls from "./components/PaletteControls.vue";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

onMounted(() => {
  colourStore.loadPaletteFromQueryString();
  colourStore.loadPalettesFromLocalStorage();
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
  grid-template-columns: 340px 1fr;
  grid-template-rows: auto auto 1fr;
  gap: var(--dt-sys-size-m);
  min-height: 100vh;
  padding-block-end: var(--dt-sys-size-m);

  &__title {
    //background: var(--dt-ref-clr-grey-900);
    grid-column: 1 / -1;
    grid-row: 2;
    display: flex;
    justify-content: space-between;
    gap: var(--dt-ref-size-large);
    align-items: center;
    padding: calc(var(--dt-sys-main-spacing) / 2) var(--dt-sys-main-spacing);
  }

  &__list {
    background: var(--dt-ref-clr-grey-900);
    grid-column: 1;
    grid-row: 3;
    border-radius: 0 var(--dt-sys-size-s) var(--dt-sys-size-s) 0;
    position: relative;
    z-index: 1000;
  }

  &__listInner {
    position: sticky;
    top: 0;
    overflow-y: auto;
    max-height: calc(100vh - 20px);
  }

  &__content {
    background: var(--dt-ref-clr-grey-900);
    grid-column: 2;
    grid-row: 3;
    border-radius: var(--dt-sys-size-s) 0 0 var(--dt-sys-size-s);
  }
}
</style>
