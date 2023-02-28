<template>
  <div
    class="b_action"
    :class="{
      [`b_action--${modeClass}`]: buttonMode,
      [`b_action--icon`]: isIconButton,
      [`b_action--disabled`]: isDisabled,
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
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
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
    font: var(--formAction-font);
    padding: var(--formAction-padding, 0.6em 1em);
    border: none;
    background: var(--formAction-background, var(--dt-ref-clr-blue-100));
    color: var(--formAction-text, var(--dt-ref-clr-grey-1000));
    cursor: pointer;
    line-height: var(--formAction-lineheight, 1);
    transition: background-color var(--dt-sys-trans-short);
    border-radius: var(
      --formAction-bordrad,
      var(--dt-sys-border-rad-form-field)
    );
    width: var(--formAction-width, auto);
    height: var(--formAction-height, auto);
    white-space: nowrap;
    transition: all var(--dt-sys-trans-short);

    &:is(:hover, :active) {
      background: var(--formAction-background-hov, var(--dt-ref-clr-blue-100));
    }
  }

  &--icon {
    --formAction-padding: 0.35em;
    --formAction-lineheight: 0;
    --formAction-width: 34px;
    --formAction-height: 34px;

    #{ $self }__button {
      display: flex;
      justify-content: center;
      align-items: center;

      ::deep(svg) {
        max-height: 24px;
      }
    }
  }

  &--negative {
    //--formAction-background: var(--dt-ref-clr-grey-800);
    --formAction-background-hov: var(--dt-ref-clr-red-400);
  }

  &--positive {
    //--formAction-background: var(--dt-ref-clr-grey-800);
    --formAction-background-hov: var(--dt-ref-clr-blue-100);
  }

  &--actionToggle {
    --formAction-background: transparent;
  }

  &--disabled {
    #{ $self }__button {
      opacity: 0.5;
      cursor: not-allowed;
      --formAction-background: var(--dt-ref-clr-grey-800);
    }
  }
}
</style>
