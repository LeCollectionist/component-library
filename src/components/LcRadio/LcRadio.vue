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
      class="lc-radio"
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
<style scoped>
.lc-radio-label {
  @apply inline-flex justify-start items-center mr-4 cursor-pointer;
}

.lc-radio-label--disabled {
  @apply text-gray-500 cursor-not-allowed;
}

.lc-radio-label--vertical {
  @apply mb-2 mr-0
}

.lc-radio {
  @apply appearance-none cursor-pointer mr-2 border border-gray-400 rounded-full checked:bg-primary-500 checked:border-primary-500 w-6 h-6 md:w-4 md:h-4;
}

.lc-radio:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-size: 120% 120%;
  background-position: 50%;
  background-repeat: no-repeat;
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
