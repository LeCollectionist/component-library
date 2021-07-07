<template>
  <div :class="wrapperClass">
    <label v-if="label" class="mb-2">
      {{ label }}
    </label>
    <div :class="['flex', { 'flex-col': vertical }]">
      <lc-radio
        v-for="option in options"
        :key="option.value"
        :model-value="inputValue"
        :name="name"
        :vertical="vertical"
        v-bind="{...option}"
        @update:modelValue="onChange"
      />
    </div>
    <error-message :name="name" as="span" class="lc-radio--error" />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'
import LcRadio from './LcRadio.vue'

interface Option {
  disabled?: boolean
  label: string
  value: string|number
}

export default defineComponent({
  name: 'LcRadioGroup',
  components: { LcRadio, ErrorMessage },
  props: {
    rules: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<Option[]>,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [String, Number],
      required: true,
    },
    label: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
    wrapperClass: {
      type: String,
      default: 'w-full flex flex-col mb-4',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const {
      value: inputValue,
      handleChange,
    } = useField<number|string>(props.name, props.rules, {
      initialValue: props.modelValue,
    })

    function onChange(payload: string): void {
      handleChange(payload)
      emit('update:modelValue', payload)
    }

    return {
      onChange,
      inputValue,
    }
  },
})
</script>
<style scoped>
.lc-radio--error {
  @apply text-sm text-error mt-1;
}
</style>
