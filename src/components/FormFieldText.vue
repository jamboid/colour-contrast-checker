<template>
  <div
    class="b_textfield"
    :class="{
      [`b_textfield--${fieldStatus}`]: status,
      [`b_textfield--icon`]: icon,
    }"
  >
    <label class="b_textfield__label" :for="id" v-if="showLabel">{{
      label
    }}</label>
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
  showLabel: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  let fieldText = event.target.value;

  if (fieldText.charAt(0) === "#") {
    fieldText = fieldText.substring(1);
  }

  emit("update:modelValue", fieldText);
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

  ::placeholder {
    color: #999;
  }

  &__label,
  &__field {
    display: block;
  }

  &__label {
    font: var(--text-label-size, var(--dt-sys-heading-700));
    color: var(--dt-ref-clr-grey-200);
    display: var(--form-field-label-display, block);

    &:empty {
      display: none;
    }
  }

  &__field {
    border: 1px solid
      var(--form-field-border-clr, var(--dt-sys-clr-form-field-border));
    border-radius: var(--dt-sys-border-rad-form-field);
    overflow: hidden;
    display: flex;
    min-width: var(--form-field-min-width, auto);
  }

  &__fieldIcon,
  &__input {
    background-color: var(
      --form-field-background-clr,
      var(--dt-ref-clr-grey-1000)
    );
  }

  &__fieldIcon {
    display: flex;
    justify-items: center;
    align-items: center;
    padding: 4px 8px;
  }

  &__input {
    background: var(--text-field-back);
    font: var(--text-field-size, var(--dt-sys-text-code-400));
    padding: var(--text-field-pd, 0.5em 0.85em);
    width: 100%;
    border: none;
    outline: none;
  }

  &--error {
    #{ $self }__field {
      border-color: var(--form-field-error-clr, var(--dt-ref-clr-red-400));
    }
  }

  &--icon {
    #{ $self }__fieldIcon {
      :deep([fill]) {
        fill: var(--form-field-icon-clr, var(--dt-ref-clr-grey-100));
      }
    }
    #{ $self }__input {
      padding-left: 0;
    }
  }
}
</style>
