<template>
  <div class="b_page">
    <ThePageHeader></ThePageHeader>
    <section class="b_page__title">
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
import SwatchList from "@/components/SwatchList.vue";
import CombinationsList from "./components/CombinationsList.vue";
import PaletteTitle from "./components/PaletteTitle.vue";
import PaletteControls from "./components/PaletteControls.vue";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

onMounted(() => {
  colourStore.loadPaletteFromQueryString();
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
  grid-template-columns: 380px 1fr;
  grid-template-rows: auto auto 1fr;
  gap: var(--dt-sys-size-m);
  min-height: 100vh;

  &__title {
    //background: var(--dt-ref-clr-grey-900);
    grid-column: 1 / -1;
    grid-row: 2;
  }

  &__list {
    background: var(--dt-ref-clr-grey-900);
    grid-column: 1;
    grid-row: 3;
    border-radius: 0 var(--dt-sys-size-s) 0 0;
  }

  &__listInner {
    position: sticky;
    top: 0;
    overflow: auto;
    overscroll-behavior: unset;
    max-height: calc(100vh - 20px);
  }

  &__content {
    background: var(--dt-ref-clr-grey-900);
    grid-column: 2;
    grid-row: 3;
    border-radius: var(--dt-sys-size-s) 0 0 0;
  }
}
</style>
