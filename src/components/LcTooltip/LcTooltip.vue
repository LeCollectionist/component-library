<template>
  <div
    :class="[
      'relative lc_tooltip',
      {
        'lc_tooltip--appear': showTooltip && clickable,
        'lc_tooltip--hover': showTooltip,
      },
    ]"
    @click.stop="toggleTooltip"
  >
    <slot name="element" />

    <div v-if="show && $slots['text']" :class="tooltipClass">
      <slot name="text" />
      <lc-icon
        v-if="clickable"
        class="lc_tooltip-icon"
        name="exit"
        size="xs"
        @click.stop="toggleTooltip"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcIcon from '../LcIcon'
import { vPosition, vVariant, vSize } from './validators/LcTooltip'

export default defineComponent({
  name: 'LcTooltip',
  components: { LcIcon },
  props: {
    blockFull: {
      type: Boolean,
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    hoveringTooltip: {
      type: Boolean,
      default: true,
    },
    position: {
      type: String,
      default: 'top',
      validator: (value) => {
        return vPosition.includes(value)
      },
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    show: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value) => {
        return vSize.includes(value)
      },
    },
    variant: {
      type: String,
      default: 'grey',
      validator: (value) => {
        return vVariant.includes(value)
      },
    },
  },
  data() {
    return {
      showTooltip: !this.clickable,
    }
  },
  computed: {
    tooltipClass() {
      const baseClass = 'lc_tooltip-content'

      if (!this.hoveringTooltip) return `text-center ${baseClass}`

      return [
        baseClass,
        `${baseClass}--${this.position}`,
        `${baseClass}--${this.size}`,
        `${baseClass}--${this.variant}`,
        `${baseClass}--absolute`,
        { rounded: this.rounded },
        this.blockFull ? `${baseClass}--full` : null,
      ]
    },
  },
  methods: {
    toggleTooltip() {
      if (this.clickable) this.showTooltip = !this.showTooltip
    },
  },
})
</script>

<style>
.lc_tooltip-content {
  @apply mt-6 mx-0 mb-0;
}
.lc_tooltip-icon {
  @apply absolute cursor-pointer top-4 right-3;
}
.lc_tooltip-content--absolute {
  @apply opacity-0 invisible absolute w-max text-white font-normal transition-opacity m-0 z-10;
  display: inline-table;
}
.lc_tooltip-content--grey {
  @apply bg-gray-600 border border-gray-600;
}
.lc_tooltip-content--white {
  @apply bg-white border border-gray-400 text-gray-700 shadow-sm;
}
.lc_tooltip--appear .lc_tooltip-content--absolute,
.lc_tooltip--hover:hover .lc_tooltip-content--absolute {
  @apply opacity-100 visible;
}
.lc_tooltip--appear .lc_tooltip-content:before,
.lc_tooltip--hover:hover .lc_tooltip-content:before {
  @apply absolute;
  content: "";
  height: 0.8rem;
  width: 0.8rem;
}
.lc_tooltip--appear .lc_tooltip-content--grey:before,
.lc_tooltip--hover:hover .lc_tooltip-content--grey:before {
  @apply bg-gray-600 border-gray-600;
}
.lc_tooltip--appear .lc_tooltip-content--white:before,
.lc_tooltip--hover:hover .lc_tooltip-content--white:before {
  @apply bg-white border-gray-400;
}
.lc_tooltip-content--top {
  @apply my-0 mx-auto left-0;
  bottom: calc(100% + 10px);
}
@screen md {
  .lc_tooltip-content--top {
    @apply left-1/2;
    transform: translateX(-50%);
  }
}
.lc_tooltip-content--top:before {
  @apply border-b border-r bottom-[-2px] left-[15px];
  transform: translateX(-50%) translateY(calc(50% - 1px)) rotate(45deg);
}
@screen md {
  .lc_tooltip-content--top:before {
    @apply left-1/2;
  }
}
.lc_tooltip-content--bottom {
  @apply my-0 mx-auto left-0;
  top: calc(100% + 10px);
}
@screen md {
  .lc_tooltip-content--bottom {
    @apply left-1/2;
    transform: translateX(-50%);
  }
}
.lc_tooltip-content--bottom:before {
  @apply border-l border-t top-0;
  left: 15px;
  transform: translateX(-50%) translateY(calc(-50% - 1px)) rotate(45deg);
}
@screen md {
  .lc_tooltip-content--bottom:before {
    @apply left-1/2;
  }
}
.lc_tooltip-content--right {
  @apply top-1/2;
  left: calc(100% + 10px);
  transform: translateY(-50%);
}
.lc_tooltip-content--right:before {
  @apply border-b border-l left-0 top-1/2;
  transform: translate(-50%, -50%) rotate(45deg);
}
.lc_tooltip-content--left {
  @apply top-1/2;
  right: calc(100% + 10px);
  transform: translateY(-50%);
}
.lc_tooltip-content--left:before {
  @apply left-auto border-t border-r top-1/2;
  right: -0.85rem;
  transform: translate(-50%, -50%) rotate(45deg);
}
.lc_tooltip-content--small {
  @apply text-sm py-2 px-3;
  max-width: 15rem;
}
.lc_tooltip-content--medium {
  @apply max-w-xs text-base p-4 text-center;
}
.lc_tooltip-content--full {
  @apply max-w-full;
}
</style>
