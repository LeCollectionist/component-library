<template>
  <div>
    <template v-if="multipleCheckbox">
      <label v-for="checkbox in fields" :key="checkbox.label" class="lc-checkbox-label ">
        <input
          v-model="inputValue"
          type="checkbox"
          :disabled="disabled"
          :value="checkbox.value"
          :style="checkbox.value && checkbox.color ?
            { backgroundColor: checkbox.color , borderColor: checkbox.color } :
            { borderColor: checkbox.color }"
          class="lc-checkbox lc-form-tick"
          data-testid="lc-checkbox"
        >
        <span :style="checkbox.value && checkbox.color ? { color: checkbox.color } : ''">{{ checkbox.label }}</span>
      </label>
    </template>
    <label v-else class="lc-checkbox-label ">
      <input
        v-model="inputValue"
        type="checkbox"
        :disabled="disabled"
        :style="inputValue && color ? {
          backgroundColor: color, borderColor: color } :
          { borderColor: color }"
        class="lc-checkbox lc-form-tick"
        data-testid="lc-checkbox"
      >
      <span :style="inputValue && color ? { color: color } : ''">{{ label }}</span>
    </label>

    <error-message as="div" :name="name" class="lc-form--error" />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
  name: 'LcCheckbox',
  components: {
    ErrorMessage,
  },
  props: {
    color: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    name: {
      type: String,
      required: true,
    },
    modelValue: {
      type: [Boolean, Array],
      required: true,
    },
    rules: {
      type: String,
      default: '',
    },
    fields: {
      type: Array,
      default: () => { return [] },
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const multipleCheckbox = Boolean(props.fields.length)

    const {
      value: inputValue,
      errors,
    } = useField(props.name, props.rules, {
      initialValue: props.modelValue,
    })

    watch(inputValue, () => {
      emit('update:modelValue', inputValue.value)
    })

    return {
      errors,
      inputValue,
      multipleCheckbox,
    }
  },
})
</script>

<style>
.lc-checkbox-label {
  @apply cursor-pointer inline-flex justify-start items-center mr-4;
}
.lc-checkbox {
  @apply appearance-none cursor-pointer mr-2 h-4 w-4 border rounded-md border-gray-400 checked:bg-primary-500 checked:border-primary-500 focus:outline-none;
}
</style>
