<template>
  <div>
    <template v-if="multipleCheckbox">
      <label v-for="checkbox in fields" :key="checkbox.label" :class="['mr-4', labelClass]">
        <input v-model="inputValue" type="checkbox" :disabled="disabled" :value="checkbox.value" :class="checkboxCustomClass">
        <span>{{ checkbox.label }}</span>
      </label>
    </template>
    <label v-else :class="labelClass">
      <input v-model="inputValue" type="checkbox" :disabled="disabled" :class="checkboxCustomClass">
      <span>{{ label }}</span>
    </label>

    <error-message as="div" :name="name" class="text-small text-red" />
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
  computed: {
    labelClass() {
      return 'cursor-pointer inline-flex justify-start items-center'
    },
    checkboxCustomClass() {
      return 'form-tick appearance-none cursor-pointer mr-2 h-4 w-4 border rounded-sm border-gray-400 checked:bg-primary-500 checked:border-primary-500 focus:outline-none'
    },
  },
})
</script>

<style scoped>
.form-tick:checked {
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
  border-color: transparent;
  background-size: 140% 140%;
  background-position: 50%;
  background-repeat: no-repeat;
}
</style>
