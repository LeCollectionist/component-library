<template>
  <div :class="wrapperClass">
    <label v-if="label" class="lc-radiogroup-label">
      {{ label }}
    </label>
    <div :class="['lc-radiogroup-layout', {'lc-radiogroup-layout--vertical': vertical }]">
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
    <error-message :name="name" as="span" class="lc-radiogroup--error" />
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
.lc-radiogroup-label {
  @apply mb-2
}

.lc-radiogroup-layout {
  @apply flex
}

.lc-radiogroup-layout--vertical {
  @apply flex-col
}

.lc-radiogroup--error {
  @apply text-sm text-error mt-1;
}
</style>
