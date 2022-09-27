<template>
  <div class="b_textfield" :class="{ [`b_textfield--${status}`]: status }">
    <label class="b_textfield__label" :for="id">{{ label }}</label>
    <input
      type="text"
      :id="id"
      class="b_textfield__field"
      :value="modelValue"
      @input="updateValue"
    />
  </div>
</template>

<script setup>
// Imports
const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: false,
  },
  label: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emit("update:modelValue", event.target.value);
};
// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_textfield {
  &__label,
  &__field {
    display: block;
  }
}
</style>
