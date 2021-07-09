<template>
  <div :class="wrapperClass">
    <label v-if="labelText" class="block mb-1">
      {{ labelText }}
    </label>

    <multiselect
      v-model="inputValue"
      :class="[{ 'lc-multiselect--hasError': isError }]"
      :options="options"
      v-bind="{searchable: false, ...$attrs}"
      @change="handleChange"
      @deselect="onDeselect"
      @select="onSelect"
    />

    <error-message
      :name="name"
      as="span"
      class="lc-multiselect--error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

import Multiselect from '@vueform/multiselect'

interface Option {
  disabled?: boolean
  label?: string
  value?: string|number
  [key: string]: any
}

export default defineComponent({
  name: 'LcMultiselect',
  components: {
    ErrorMessage,
    Multiselect,
  },
  inheritAttrs: false,
  props: {
    labelText: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [Object, Array, String, Number],
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    options: {
      type: Array as PropType<string[]|Option[]>,
      default: () => { return [] },
    },
    rules: {
      type: String,
      default: '',
    },
    wrapperClass: {
      type: String,
      default: '',
    },
  },
  emits: ['select', 'deselect'],
  setup(props, { emit }) {
    const {
      value: inputValue,
      handleChange,
      errors,
    } = useField<any>(props.name, props.rules, {
      initialValue: props.modelValue,
    })

    const isError = computed(() => Boolean(errors.value.length))

    function onSelect(event: Event): void { emit('select', event) }
    function onDeselect(event: Event): void { emit('deselect', event) }

    return {
      handleChange,
      inputValue,
      isError,
      onDeselect,
      onSelect,
    }
  },
})
</script>

<style src="@vueform/multiselect/themes/default.css"></style>

<style>
:root {
  --ms-tag-bg: #e7d4b7;
  --ms-option-bg-selected: #e7d4b7;
  --ms-option-bg-selected-pointed: #e7d4b7;
  --ms-ring-color: #dbbc8f40;
}
</style>

<style scoped>
.lc-multiselect--error {
  @apply text-sm text-error;
}

.lc-multiselect--hasError {
  @apply border-error;
}
</style>
