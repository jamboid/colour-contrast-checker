<template>
  <div class="b_contrast">
    <div class="b_contrast__pair">
      <div class="b_contrast__colour">
        <div
          class="b_contrast__sample--primary b_contrast__sample"
          :style="{ backgroundColor: primaryColour }"
        ></div>
        <h3 class="b_contrast__colourHex">{{ primaryColour }}</h3>
      </div>
      <div class="b_contrast__colour">
        <div
          class="b_contrast__sample--secondary b_contrast__sample"
          :style="{ backgroundColor: contrastColour }"
        ></div>
        <h3 class="b_contrast__colourHex">{{ contrastColour }}</h3>
      </div>
    </div>

    <div class="b_contrast__details">
      <component class="b_contrast__icon" :is="ratingIcon"></component>
      <p>
        {{ contrastRating }} <strong>{{ contrastRatio }}</strong>
      </p>
    </div>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import IconResultPass from "@/components/icons/IconResultPass.vue";
import IconResultPassLarge from "@/components/icons/IconResultPassLarge.vue";
import IconResultFail from "@/components/icons/IconResultFail.vue";
import { useColourStore } from "@/stores/colourStore";
const colourStore = useColourStore();
// Data
const state = reactive({
  stateItem: [],
});

const props = defineProps({
  primaryColour: {
    type: String,
    required: true,
  },
  contrastColour: {
    type: String,
    required: true,
  },
  contrastRatio: {
    type: Number,
    required: true,
  },
});

const contrastRating = computed(() => {
  if (props.contrastRatio < 3) {
    return "Fail";
  } else if (
    props.contrastRatio >= colourStore.complianceRatios.min &&
    props.contrastRatio < colourStore.complianceRatios.max
  ) {
    return "Partial";
  } else {
    return "Pass";
  }
});

const ratingIcon = computed(() => {
  if (props.contrastRatio < 3) {
    return IconResultFail;
  } else if (
    props.contrastRatio >= colourStore.complianceRatios.min &&
    props.contrastRatio < colourStore.complianceRatios.max
  ) {
    return IconResultPassLarge;
  } else {
    return IconResultPass;
  }
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_contrast {
  $self: &;

  display: grid;
  justify-items: center;
  gap: 0;
  //padding: 4px;
  background: var(--dt-ref-clr-grey-1000);
  //border: 3px solid #ccc;
  border-radius: var(--dt-sys-border-rad-small);
  box-shadow: var(--dt-sys-shadow-card);
  overflow: hidden;

  &__pair {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    //border-radius: 8px;
    overflow: hidden;
  }

  &__colour {
    display: grid;
    grid-gap: 6px;
    justify-items: center;
  }

  &__colourHex {
    font: var(--dt-sys-text-code-400);
  }

  &__sample {
    height: 60px;
    width: 100%;
    //box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.2);
  }

  &__icon {
    width: 24px;
    height: 24px;
    border: 1px solid var(--dt-ref-clr-grey-900);
    border-radius: 50px;
  }

  &__details {
    display: flex;
    gap: 8px;
    align-items: center;
    padding: 4px 12px 4px 4px;
    background: rgba(0, 0, 0, 0.1);
    margin: 20px 0 10px;
    border-radius: 45px;
    border: 1px solid rgba(0, 0, 0, 0.2);
  }
}
</style>
