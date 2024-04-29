<template>
  <header class="b_pageHeader">
    <div class="b_pageHeader__inner">
      <div class="b_pageHeader__title u_row">
        <h2 class="b_pageHeader__titleName">Colour Palette Contrast Checker</h2>
      </div>
      <figure class="b_pageHeader__logo">
        <JBLogo></JBLogo>
      </figure>
    </div>
  </header>
</template>

<script setup>
// Imports
import JBLogo from "./icons/JBLogo.vue";
</script>

<style lang="scss" scoped>
.b_pageHeader {
  grid-column: 1/-1;
  grid-row: 1;
  background: var(--dt-ref-clr-grey-000);
  gap: var(--dt-ref-size-small);
  position: relative;
  z-index: 110;
  border-right: 1px solid var(--dt-sys-clr-border);

  &__inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: var(--dt-ref-size-large);
  }

  &__title {
    align-items: center;
    padding: calc(var(--dt-sys-main-spacing) / 1.5) var(--dt-sys-main-spacing)
      calc(var(--dt-sys-main-spacing) / 1.5);
  }

  &__logo {
    justify-self: stretch;
    display: flex;
    padding-inline-end: var(--dt-sys-main-spacing);
    align-items: center;
    justify-content: end;
    width: 100%;

    --brand-logo-width: 50px;
    --brand-logo-back-clr: var(--dt-ref-clr-grey-200);
    --brand-logo-front-clr: white;
  }

  &__titleName {
    color: var(--dt-ref-clr-grey-1000);
    font-weight: 500;
    font-size: 24px;
  }
}
</style>
