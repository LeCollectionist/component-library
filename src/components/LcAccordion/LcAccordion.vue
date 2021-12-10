<template>
  <div class="lc-accordion">
    <div
      class="lc-accordion-header"
      data-testid="lc-accordion-header"
    >
      <div>
        <span
          v-if="title"
          class="lc-accordion-header-title"
          data-testid="lc-accordion-header-title"
        >
          {{ title }}
        </span>
        <slot name="content-before" />
      </div>
      <div
        v-if="$slots['content-after'] || haveToggle"
        class="lc-accordion-header-right"
      >
        <slot name="content-after" />
        <lc-button
          v-if="haveToggle"
          class="lc-accordion-header-toggle-button"
          data-testid="lc-accordion-header-toggle-button"
          variant="icon"
          size="xs"
          @click="toggle"
        >
          <slot name="button-toggle-icon">
            <lc-icon
              class="lc-accordion-header-toggle-button-icon"
              :name="modelValue ? 'bottom-chevron' : 'top-chevron'"
              size="xxs"
            />
          </slot>
        </lc-button>
      </div>
    </div>

    <transition
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-show="modelValue"
        ref="lc-accordion-body"
        class="lc-accordion-body"
        data-testid="lc-accordion-body"
        :style="containerStyle"
      >
        <div ref="wrapper" :class="['lc-accordion-body-wrapper', {'lc-accordion-body-wrapper--withpadding': hasBodyPadding}]">
          <slot name="body" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcButton from '../LcButton'
import LcIcon from '../LcIcon'

type Height = number | 'auto'

export default defineComponent({
  components: {
    LcButton,
    LcIcon,
  },
  props: {
    duration: {
      type: Number,
      default: 250,
    },
    hasBodyPadding: {
      type: Boolean,
      default: true,
    },
    haveToggle: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  computed: {
    containerStyle(): Record<string, string> {
      return {
        transitionDuration: `${this.duration}ms`,
      }
    },
  },
  mounted() {
    if (this.modelValue) {
      const el = this.$refs['lc-accordion-body'] as HTMLElement
      this.setContainerHeight('auto', el)
    }
  },
  methods: {
    getContentHeight() {
      const wrapper = this.$refs.wrapper as HTMLElement
      return wrapper?.getBoundingClientRect().height || 0
    },
    onEnter(el: HTMLElement) {
      this.setContainerHeight(this.getContentHeight(), el)
      el.style.overflow = 'hidden'
    },
    onAfterEnter(el: HTMLElement) {
      this.setContainerHeight('auto', el)
      el.style.overflow = 'visible'
    },
    onBeforeLeave(el: HTMLElement) {
      this.setContainerHeight(this.getContentHeight(), el)
      el.style.overflow = 'hidden'
    },
    onLeave(el: HTMLElement) {
      this.setContainerHeight(0, el)
    },
    setContainerHeight(height: Height, el: HTMLElement) {
      el.style.height = typeof height === 'number' ? `${height}px` : height
    },
    toggle() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
})
</script>

<style>
.lc-accordion {
  @apply bg-white shadow-md;
}

.lc-accordion-header {
  @apply px-9 py-4 border-b border-gray-300 flex items-center justify-between;
}
.lc-accordion-header-title {
  @apply text-xl font-medium mr-4;
}
.lc-accordion-header-toggle-button {
  @apply ml-4;
}
.lc-accordion-header-toggle-button-icon {
  @apply text-white;
}
.lc-accordion-header-right {
  @apply flex items-center;
}

.lc-accordion-body {
   @apply h-0 ease-in-out transition-height;
}
.lc-accordion-body-wrapper {
  @apply w-full;
}
.lc-accordion-body-wrapper--withpadding {
  @apply px-9 py-5;
}
</style>
