<template>
  <div :class="wrapperClass">
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id || name"
        class="lc-form-label"
      >
        {{ label }}
      </label>
    </slot>
    <textarea
      :id="$attrs.id || name"
      :ref="name"
      :class="computedClass"
      :name="name"
      :placeholder="placeholder"
      :value="inputValue"
      v-bind="$attrs"
      @blur="onBlur"
      @change="handleChange"
      @input="onInput"
    />
    <error-message
      :name="name"
      as="span"
      class="lc-form--error"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { ErrorMessage, useField } from 'vee-validate'

export default defineComponent({
  name: 'LcTextarea',
  components: {
    ErrorMessage,
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: '',
    },
    modelValue: {
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
    wrapperClass: {
      type: String,
      default: 'w-full mb-4',
    },
  },
  emits: ['update:modelValue', 'focus-out'],
  setup(props, { emit }) {
    const {
      value: inputValue,
      handleBlur,
      handleChange,
      errors,
    } = useField<string>(props.name, props.rules, {
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
      return ['lc-textarea', { 'lc-form--hasError': this.isError }]
    },
  },
})
</script>

<style>
.lc-textarea {
  @apply block rounded-sm bg-clip-padding w-full border border-gray-400 text-gray-700 font-normal text-base leading-normal py-1.5 px-4 bg-white resize-none overflow-y-scroll focus:bg-white focus:border-primary-focus focus:shadow-focus focus:outline-none;
}
</style>
