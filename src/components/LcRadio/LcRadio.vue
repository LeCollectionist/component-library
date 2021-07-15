<template>
  <label
    :class="[
      'lc-radio-label',
      {'lc-radio-label--disabled': disabled },
      {'lc-radio-label--vertical': vertical },
    ]
    "
    :for="value"
  >
    <input
      :id="value"
      :checked="modelValue === value"
      :disabled="disabled"
      :name="name"
      :value="value"
      class="lc-radio lc-form-tick"
      data-testid="lc-radio"
      type="radio"
      v-bind="$attrs"
      @change="onChange"
    >
    <span class="radio" />
    {{ label }}
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcRadio',
  inheritAttrs: false,
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Number, String],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    value: {
      type: [Number, String],
      required: true,
    },
    vertical: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(_, { emit }) {
    function onChange(event: Event & { target: HTMLInputElement }): void {
      emit('update:modelValue', event.target.value)
    }

    return {
      onChange,
    }
  },
})
</script>
<style>
.lc-radio-label {
  @apply inline-flex justify-start items-center mr-4 cursor-pointer;
}

.lc-radio-label--disabled {
  @apply text-gray-500 cursor-not-allowed;
}

.lc-radio-label--vertical {
  @apply mb-2 mr-0;
}

.lc-radio {
  @apply appearance-none cursor-pointer mr-2 border border-gray-400 rounded-full checked:bg-primary-500 checked:border-primary-500 w-6 h-6 md:w-4 md:h-4;
}

.lc-radio:hover:not(:checked) {
  @apply bg-gray-200;
}

.lc-radio:disabled {
  @apply bg-gray-300 cursor-not-allowed;
}

.lc-radio:hover:disabled {
  @apply bg-gray-300;
}
</style>
