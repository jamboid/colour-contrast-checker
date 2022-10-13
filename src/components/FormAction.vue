<template>
  <div
    class="b_action"
    :class="{
      [`b_action--${modeClass}`]: buttonMode,
      [`b_action--icon`]: isIconButton,
    }"
  >
    <button class="b_action__button" @click.prevent="onClick">
      <slot v-if="isIconButton"></slot>
      <span v-if="!isIconButton">{{ buttonLabel }}</span>
    </button>
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
  buttonMode: {
    type: String,
    required: true,
  },
  buttonType: {
    type: String,
    required: false,
  },
});

const modeClass = computed(() => {
  return props.buttonMode;
});

const isIconButton = computed(() => {
  if (props.buttonType === "icon") {
    return true;
  }

  return false;
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_action {
  $self: &;

  &__button {
    font: var(--button-font);
    padding: var(--button-padding, 0.5em 1em);
    border: none;
    background: var(--button-background, var(--dt-ref-clr-blue-100));
    color: var(--button-text, var(--dt-ref-clr-grey-1000));
    cursor: pointer;
    line-height: var(--button-lineheight, 1);
    transition: background-color var(--dt-sys-trans-short);
    border-radius: var(--dt-sys-border-rad-form-field);
    width: var(--form-button-width, 30px);
    height: var(--form-button-height, 30px);
  }

  &--icon {
    --button-padding: 0.35em;
    --button-lineheight: 0;

    #{ $self }__button {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &--delete {
    --button-background: var(--dt-ref-clr-grey-800);

    &:hover {
      --button-background: var(--dt-ref-clr-red-400);
    }
  }
}
</style>
