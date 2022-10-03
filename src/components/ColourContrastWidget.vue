<template>
  <div class="b_contrast">
    <div class="b_contrast__pair">
      <div class="b_contrast__colour">
      <div
        class="b_contrast__sample--primary b_contrast__sample"
        :style="primaryStyleObject"
      ></div>
      <h3 class="b_contrast__colourHex">{{ primaryColour }}</h3>
    </div>
    <div class="b_contrast__colour">
      <div
        class="b_contrast__sample--secondary b_contrast__sample"
        :style="secondaryStyleObject"
      ></div>
      <h3 class="b_contrast__colourHex">{{ contrastColour }}</h3>
    </div>
    </div>
    <component class="b_contrast__icon" :is="ratingIcon"></component>
    <div class="b_contrast__details">
      <p>{{ contrastRatio }} {{ contrastRating }}</p>
    </div>
  </div>
</template>

<script setup>
// Imports
import { reactive, computed, ref } from "vue";
import IconResultPass from "@/components/icons/IconResultPass.vue";
import IconResultPassLarge from "@/components/icons/IconResultPassLarge.vue";
import IconResultFail from "@/components/icons/IconResultFail.vue";

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

const primaryStyleObject = reactive({
  backgroundColor: props.primaryColour,
});

const secondaryStyleObject = reactive({
  backgroundColor: props.contrastColour,
});

const contrastRating = computed(() => {
  if (props.contrastRatio < 3) {
    return "Fail";
  } else if (props.contrastRatio >= 3 && props.contrastRatio < 4.5) {
    return "AA+";
  } else {
    return "Pass";
  }
});

const ratingIcon = computed(() => {
  if (props.contrastRatio < 3) {
    return IconResultFail;
  } else if (props.contrastRatio >= 3 && props.contrastRatio < 4.5) {
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
  display: grid;
  justify-items: center;
  //padding: 4px;
  background: #fafafa;
  //border: 3px solid #ccc;
  //border-radius: 15px;
  width: 200px;

  &__pair {
    width: 100%;
    display: flex;
    //border-radius: 8px;
    overflow: hidden;
  }

  &__colour {
    display: grid;
    grid-gap:10px;
    justify-items: center;
  }

  &__colourHex {
    font:var(--dt-sys-text-code-400);
  }

  &__sample {
    height: 50px;
    width: 100px;
  }

  &__icon {
    width: 40px;
    height: 40px;
    border: 4px solid #fafafa;
    border-radius: 50px;
  }

  &__details {
    padding: 0 0 5px;
  }
}
</style>
