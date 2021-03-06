<template>
  <div
    v-if="modelValue"
    :class="[
      'fixed bottom-0 left-0 right-0 h-full bg-white bg-opacity-20 px-2',
    ]"
  >
    <div
      :class="[
        'base-modal absolute -bottom-full left-0 right-0 w-full bg-white h-5/6 border-l-8 border-r-8 border-t-8 border-gray-100 rounded-t-3xl',
        { '-bottom-full': !modelValue },
        { 'bottom-0': modelValue },
      ]"
    >
      <div class="h-full py-6 px-2 flex justify-between flex-col">
        <div class="flex flex-col flex-wrap items-center">
          <slot name="content" />
        </div>
        <div class="flex flex-wrap justify-center">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseModal',
  props: {
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['update:modelValue'],
  methods: {
    closeModal(tabName: string) {
      this.$emit('update:modelValue', tabName)
    },
  },
})
</script>

<style lang="postcss">
  .base-modal {
    animation-name: slideup;
    animation-delay: 0.2s;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: ease-out;
  }

  @keyframes slideup {
    0% {
      @apply -bottom-full;
    }
    100% {
      @apply bottom-0;
    }
  }
</style>
