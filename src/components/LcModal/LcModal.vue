<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="lc-modal"
    >
      <div
        class="lc-modal__shadow"
        @click="clickOnShadow"
      />
      <div
        class="lc-modal__content"
      >
        <div class="lc-modal__container">
          <lc-icon
            v-if="!disableCloseModal"
            name="exit"
            class="lc-modal__close"
            size="xs"
            @click="closeModal"
          />

          <header
            v-if="!noHeader"
            class="lc-modal__header"
          >
            <slot name="header">
              <h2 class="lc-modal__header--title">
                {{ title }}
              </h2>
            </slot>
          </header>

          <div
            ref="lcModalContent"
            class="lc-modal__container--content"
          >
            <slot name="content" />
          </div>

          <footer
            v-if="!noFooter"
            class="lc-modal__container--footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcIcon from '../LcIcon'

export default defineComponent({
  name: 'LcModal',
  components: {
    LcIcon,
  },
  props: {
    disableCloseModal: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    multipleModals: {
      type: Boolean,
      default: false,
    },
    noFooter: {
      type: Boolean,
      default: false,
    },
    noHeader: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close-modal', 'update:modelValue'],
  watch: {
    modelValue() {
      this.updateOverflow()
    },
    multipleModals(newVal: boolean) {
      const body = document.querySelector('body')

      if (!newVal)
        body.style.overflow = 'auto'

      else
        body.style.overflow = 'hidden'
    },
  },
  mounted() {
    this.updateOverflow()
  },
  beforeUnmount() {
    const body = document.querySelector('body')

    body.style.overflow = 'auto'
  },
  methods: {
    clickOnShadow() {
      if (!this.disableCloseModal) this.closeModal()
    },
    closeModal() {
      this.$emit('close-modal')
      this.$emit('update:modelValue', false)
    },
    updateOverflow() {
      if (!this.multipleModals) {
        const body = document.querySelector('body')
        const overflow = this.modelValue ? 'hidden' : 'auto' as string

        body.style.overflow = overflow
      }
    },
  },
})
</script>

<style>
  .lc-modal {
    @apply z-[99999] fixed top-0 left-0 right-0 h-full flex mx-auto my-0 items-center justify-center;
  }
  .lc-modal__shadow {
    @apply z-[9999] bg-gray-700 bg-opacity-40 absolute top-0 left-0 right-0 h-full;
  }
  .lc-modal__content {
    @apply relative flex mx-auto my-0 items-center w-full p-4 max-w-[500px] z-[99999];
  }
  .lc-modal__container {
    @apply w-full relative bg-white;
  }
  .lc-modal__close {
    @apply absolute top-1 right-0;
  }
  .lc-modal__header {
    @apply text-center relative px-8 py-4 pointer-events-none;
  }
  .lc-modal__header--title {
    @apply text-4xl m-0;
  }
  .lc-modal__container--content {
    @apply overflow-y-auto p-8;
  }
  .lc-modal__container--footer {
    @apply relative py-4 px-6;
  }
</style>
