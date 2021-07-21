<template>
  <div :class="wrapperClass">
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id || name"
      >
        {{ label }}
      </label>
    </slot>

    <input
      :id="$attrs.id || name"
      :ref="name"
      v-maska="mask"
      :class="computedClass"
      :name="name"
      :placeholder="placeholder"
      :value="inputValue"
      data-testid="lc-mask-input"
      v-bind="$attrs"
      @blur="onBlur"
      @maska="onChange"
    >
    <error-message :name="name" as="span" class="lc-form--error" />
  </div>
</template>

<script lang="ts">
import { maska } from 'maska'
import { defineComponent, computed } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
  name: 'LcInput',
  directives: { maska },
  components: {
    ErrorMessage,
  },
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
    mask: {
      type: [String, Array],
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: [String, Object],
      default: '',
    },
    wrapperClass: {
      type: String,
      default: 'w-full mb-4',
    },
  },
  emits: ['update:modelValue', 'blur', 'raw-value'],
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

    function onBlur(): void {
      handleBlur()
      emit('blur')
    }

    function onChange(event: Event & { target: HTMLInputElement }): void {
      handleChange(event.target.value)
      emit('raw-value', event.target.dataset.maskRawValue)
    }

    return {
      inputValue,
      handleChange,
      isError,
      onBlur,
      onChange,
    }
  },
  computed: {
    computedClass(): any[] {
      return [
        'lc-mask-input',
        { 'lc-mask-input--hasBorder': !this.noBorder },
        { 'lc-mask-input--disabled': this.disabled },
        { 'lc-mask-input--hasError-hasBorder': this.isError && !this.noBorder },
        { 'lc-mask-input--hasntError-hasBorder': !this.isError && !this.noBorder },
      ]
    },
  },
})
</script>

<style scoped>
.lc-mask-input {
  height: 51px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
  @apply block bg-clip-padding w-full text-gray-700 font-normal text-base leading-normal py-1.5 px-4 bg-white focus:text-gray-700 focus:bg-white focus:border-primary-focus focus:shadow-focus focus:outline-none;
}
.lc-mask-input--hasBorder {
  @apply border rounded-sm;
}
.lc-mask-input--disabled {
  @apply bg-gray-300 pointer-events-none text-gray-500;
}
.lc-mask-input--hasError-hasBorder {
  @apply border-error;
}
.lc-mask-input--hasntError-hasBorder {
  @apply border-gray-400;
}
.lc-mask-input[disabled=disabled] {
  -webkit-text-fill-color: #aaaaaa;
}
</style>
