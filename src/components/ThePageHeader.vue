<template>
  <header class="b_pageHeader">
    <div class="b_pageHeader__inner">
      <div class="b_pageHeader__title u_row">
        <figure class="b_pageHeader__logo u_resMedia">
          <GoodLogo></GoodLogo>
        </figure>
        <h2 class="b_pageHeader__titleName">Colour Palette Contrast Checker</h2>
      </div>
    </div>
  </header>
</template>

<script setup>
// Imports
import GoodLogo from "@/components/icons/IconGoodLogo.vue";
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
    grid-template-columns: 1fr;
    grid-gap: var(--dt-ref-size-large);
  }

  &__title {
    align-items: center;
    padding: calc(var(--dt-sys-main-spacing) / 1.5) var(--dt-sys-main-spacing)
      calc(var(--dt-sys-main-spacing) / 1.5);
  }

  &__logo {
    padding-right: var(--dt-ref-size-medium);
    align-items: center;
    max-width: 80px;
  }

  &__titleName {
    color: var(--dt-ref-clr-grey-1000);
    font-weight: 500;
    font-size: 24px;
  }

  :deep([fill]) {
    fill: var(--dt-ref-clr-grey-1000);
  }
}
</style>
