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
  emits: ['close-modal', 'update:model-value'],
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
      if (!this.disableCloseModal)
        this.closeModal()
    },
    closeModal() {
      this.$emit('close-modal')
      this.$emit('update:model-value', false)
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

<template>
  <transition name="fade">
    <div
      v-if="modelValue"
      class="lc-modal"
      data-testid="lc-modal"
    >
      <div
        class="lc-modal__shadow"
        data-testid="lc-modal__shadow"
        @click="clickOnShadow"
      />
      <div
        class="lc-modal__content"
      >
        <div class="lc-modal__container">
          <header
            v-if="!noHeader"
            class="lc-modal__header"
            data-testid="lc-modal__header"
          >
            <slot name="header">
              <h2 class="lc-modal__header--title" data-testid="lc-modal__header--title">
                {{ title }}
              </h2>
            </slot>
            <LcIcon
              v-if="!disableCloseModal"
              class="lc-modal__close"
              data-testid="lc-modal__close"
              name="cross"
              size="3xs"
              @click="closeModal"
            />
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
            data-testid="lc-modal__footer"
          >
            <slot name="footer" />
          </footer>
        </div>
      </div>
    </div>
  </transition>
</template>

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
    @apply text-sm cursor-pointer text-gray-600;
  }
  .lc-modal__header {
    @apply relative p-6 border-b border-gray-200 flex justify-between items-center;
  }
  .lc-modal__header--title {
    @apply text-base m-0;
  }
  .lc-modal__container--content {
    @apply overflow-y-auto px-6 py-8;
  }
  .lc-modal__container--footer {
    @apply relative p-6 text-right border-t border-gray-200;
  }
</style>
