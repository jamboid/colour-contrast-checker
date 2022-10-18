<template>
  <div class="b_swatch">
    <div class="b_swatch__colour">
      <div
        class="b_swatch__sample"
        :style="{ backgroundColor: colourHex }"
        @click.prevent="copyToClipboard"
      >
        <Transition>
          <div v-if="state.isCopying" class="b_swatch__copyMessage">
            Copied!
          </div>
        </Transition>
      </div>
    </div>
    <div class="b_swatch__details">
      <p>{{ colourHex }}</p>
      <form>
        <FormAction
          :onClick.prevent="deleteColour"
          buttonLabel="Delete"
          buttonMode="delete"
          buttonType="icon"
          ><FieldIconCross></FieldIconCross
        ></FormAction>
      </form>
    </div>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import FormAction from "@/components/FormAction.vue";
import FieldIconCross from "@/components/icons/FieldIconCross.vue";
import { useColourStore } from "@/stores/colourStore";

const colourStore = useColourStore();

// Data
const state = reactive({
  isEditing: false,
  isCopying: false,
});

const props = defineProps({
  colourHex: {
    type: String,
    required: true,
  },
});

const deleteColour = async () => {
  colourStore.removeColour(props.colourHex);
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(props.colourHex);
    state.isCopying = true;

    setTimeout(() => {
      state.isCopying = false;
    }, 600);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};
</script>

<style lang="scss" scoped>
.b_swatch {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 10px;
  padding: 8px;
  background: var(--dt-ref-clr-grey-1000);
  box-shadow: var(--dt-sys-shadow-card);
  border-radius: var(--dt-sys-border-rad-small);
  cursor: move;

  &__colour {
    align-self: stretch;
    display: flex;
  }

  &__sample {
    width: 40px;
    height: 40px;
    display: inline-block;
    grid-column: 1;
    align-self: stretch;
    box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: copy;
    position: relative;
  }

  &__copyMessage {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(calc(100% + 8px), -50%);
    color: var(--dt-ref-clr-grey-100);
    background: var(--dt-ref-clr-grey-900);
    padding: 5px 10px;
    font: var(--dt-sys-text-code-400);
    border-radius: 3px;
  }

  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.15s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }

  &__details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 2;

    p {
      font: var(--dt-sys-text-code-400);
    }
  }
}
</style>
