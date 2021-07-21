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
      v-mask="mask"
      :value="inputValue"
      :class="computedClass"
      :name="name"
      :placeholder="placeholder"
      v-bind="$attrs"
      @input="onInput"
      @change="handleChange"
      @blur="onBlur"
    >

    <error-message :name="name" as="span" class="lc-mask-input--error" />
  </div>
</template>

<script lang="ts">
import { mask } from 'vue-the-mask'
import { defineComponent, computed } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
  name: 'LcMaskInput',
  directives: { mask },
  components: {
    ErrorMessage,
  },
  inheritAttrs: false,
  props: {
    mask: {
      type: String,
      default: '',
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    wrapperClass: {
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
  emits: ['update:modelValue', 'blur'],
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
      emit('blur')
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
.lc-mask-input--error {
  @apply text-sm text-error;
}
</style>
