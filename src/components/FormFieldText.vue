<template>
  <div
    class="b_textfield"
    :class="{
      [`b_textfield--${fieldStatus}`]: status,
      [`b_textfield--icon`]: icon,
    }"
  >
    <label class="b_textfield__label" :for="id">{{ label }}</label>
    <div class="b_textfield__field">
      <div class="b_textfield__fieldIcon" v-if="icon">
        <component :is="IconComponent"></component>
      </div>
      <input
        type="text"
        :id="id"
        class="b_textfield__input"
        :value="modelValue"
        @input="updateValue"
        :placeholder="placeholder"
      />
    </div>
  </div>
</template>

<script setup>
// Imports
import { computed } from "vue";
import HexIcon from "@/components/icons/FieldIconHex.vue";

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
  icon: {
    type: String,
    required: false,
  },
  placeholder: {
    type: String,
    required: false,
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

const fieldStatus = computed(() => {
  if (props.modelValue && props.status == "error") {
    return "error";
  } else {
    return "noError";
  }
});

const IconComponent = computed(() => {
  if (props.icon === "hex") {
    return HexIcon;
  } else {
    return false;
  }
});

// Functions
// function functionName(){}
</script>

<style lang="scss" scoped>
.b_textfield {
  $self: &;
  display: grid;
  gap: 10px;

  &__label,
  &__field {
    display: block;
  }

  &__label {
    font: var(--dt-sys-heading-700);
    color: var(--dt-ref-clr-grey-200);
  }

  &__field {
    border: 1px solid var(--dt-sys-clr-form-field-border);
    border-radius: var(--dt-sys-border-rad-form-field);
    overflow: hidden;
    display: flex;
  }

  &__fieldIcon,
  &__input {
    background-color: var(--dt-ref-clr-grey-1000);
  }

  &__fieldIcon {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 4px 8px;
  }

  &__input {
    font: var(--dt-sys-text-code-400);
    padding: 0.5em 0.85em;
    width: 100%;
    border: none;
    outline: none;
  }

  &--error {
    #{ $self }__field {
      border-color: red;
    }
  }

  &--icon {
    #{ $self }__fieldIcon {
      [fill] {
        fill: #666;
      }
    }
    #{ $self }__input {
      padding-left: 0;
    }
  }
}
</style>
