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
    </div>
    <error-message
      :name="name"
      as="span"
      class="lc-textarea--error"
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
    inputClass: {
      type: String,
      default: 'w-full mb-4',
    },
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
      return ['lc-textarea', { 'lc-textarea--hasError': this.isError }]
    },
  },
})
</script>

<style scoped>
.lc-textarea {
  @apply block rounded-sm bg-clip-padding w-full border border-gray-400 text-gray-700 font-normal text-base leading-normal py-1.5 px-4 bg-white resize-none overflow-y-scroll focus:bg-white focus:border-primary-focus focus:shadow-focus focus:outline-none;
}
.lc-textarea--hasError {
  @apply border-error;
}
.lc-textarea--error {
  @apply text-sm text-error;
}
</style>
