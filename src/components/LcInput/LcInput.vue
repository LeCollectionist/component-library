<template>
  <div :class="inputClass">
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id || name"
      >
        {{ label }}
      </label>
    </slot>

    <div class="w-full">
      <input
        :id="$attrs.id || name"
        :ref="name"
        :value="inputValue"
        :class="computedClass"
        :name="name"
        :placeholder="placeholder"
        v-bind="$attrs"
        @input="onInput"
        @change="handleChange"
        @blur="onBlur"
      >
    </div>

    <error-message :name="name" as="span" class="lc-input--error" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
  name: 'LcInput',
  components: {
    ErrorMessage,
  },
  inheritAttrs: false,
  props: {
    noBorder: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: 'w-full mb-4',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
  },
  emits: ['update:modelValue', 'focus-out'],
  setup(props, { emit }) {
    const {
      value: inputValue,
      handleBlur,
      handleChange,
      errors,
    } = useField<string|number>(props.name, props.rules, {
      initialValue: props.modelValue,
    })

    const isError = computed(() => Boolean(errors.value.length))

    function onInput(event: Event & { target: HTMLInputElement }): void {
      handleChange(event)
      emit('update:modelValue', event.target.value)
    }

    function onBlur(): void {
      handleBlur()
      emit('focus-out')
    }

    return {
      inputValue,
      handleChange,
      isError,
      onInput,
      onBlur,
    }
  },
  computed: {
    computedClass(): any[] {
      return [
        'lc-input',
        { 'lc-input--hasBorder': !this.noBorder },
        { 'lc-input--disabled': this.disabled },
        { 'lc-input--hasError-hasBorder': this.isError && !this.noBorder },
        { 'lc-input--hasntError-hasBorder': !this.isError && !this.noBorder },
      ]
    },
  },
})
</script>

<style scoped>
.lc-input {
  height: 51px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  @apply block bg-clip-padding w-full text-gray-700 font-normal text-base leading-normal py-1.5 px-4 bg-white focus:text-gray-700 focus:bg-white focus:border-primary-focus focus:shadow-focus focus:outline-none;
}
.lc-input--hasBorder {
  @apply border rounded-sm;
}
.lc-input--disabled {
  @apply bg-gray-300 pointer-events-none text-gray-500;
}
.lc-input--hasError-hasBorder {
  @apply border-error;
}
.lc-input--hasntError-hasBorder {
  @apply border-gray-400;
}
.lc-input[disabled=disabled] {
  -webkit-text-fill-color: #aaaaaa;
}
.lc-input--error {
  @apply text-sm text-error;
}
</style>
