<template>
  <div>
    <template v-if="multipleCheckbox">
      <label v-for="checkbox in fields" :key="checkbox.label" class="label">
        <input
          v-model="inputValue"
          type="checkbox"
          :disabled="disabled"
          :value="checkbox.value"
          :style="checkbox.value && checkbox.color ?
            { backgroundColor: checkbox.color , borderColor: checkbox.color } :
            { borderColor: checkbox.color }"
          class="form-tick checkbox-custom"
        >
        <span :style="checkbox.value && checkbox.color ? { color: checkbox.color } : ''">{{ checkbox.label }}</span>
      </label>
    </template>
    <label v-else class="label">
      <input
        v-model="inputValue"
        type="checkbox"
        :disabled="disabled"
        :style="inputValue && color ? {
          backgroundColor: color, borderColor: color } :
          { borderColor: color }"
        class="form-tick checkbox-custom"
      >
      <span :style="inputValue && color ? { color: color } : ''">{{ label }}</span>
    </label>

    <error-message as="div" :name="name" class="text-small text-red-300" />
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

<style scoped>
.label {
  @apply cursor-pointer inline-flex justify-start items-center mr-4;
}
.checkbox-custom {
  @apply appearance-none cursor-pointer mr-2 h-4 w-4 border rounded-md border-gray-400 checked:bg-primary-500 checked:border-primary-500 focus:outline-none;
}
.form-tick:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-size: 120% 120%;
  background-position: 50%;
  background-repeat: no-repeat;
}
</style>
