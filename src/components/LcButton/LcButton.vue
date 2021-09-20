<template>
  <component
    :is="type"
    :class="computedClass"
    :disabled="disabled"
    v-bind="$attrs"
    :type="type === 'button' && !$attrs.type ? 'button' : $attrs.type"
    @click="callback"
  >
    <span
      v-if="loader"
      class="lc-btn-loader"
      data-testid="lc-btn-loader"
    >
      <i class="lc-btn-loader__spin" />
    </span>

    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vColor, vFontWeight, vSize, vVariant } from './validators/LcButton'

// Types
interface ComputedClass {
  [key: string]: string
}

export default defineComponent({
  name: 'LcButton',
  inheritAttrs: false,
  props: {
    block: {
      type: Boolean,
      default: false,
    },
    blockFull: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: 'primary',
      validator: (value: string) => {
        return vColor.includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fontWeight: {
      type: String,
      default: 'font-bold',
      validator: (value: string) => {
        return vFontWeight.includes(value)
      },
    },
    hasIcon: {
      type: Boolean,
      default: false,
    },
    loader: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      validator: (value: string) => {
        return vSize.includes(value)
      },
    },
    variant: {
      type: String,
      default: 'btn',
      validator: (value: string) => {
        return vVariant.includes(value)
      },
    },
  },
  emits: ['click'],
  data() {
    return {
      btnColors: {
        btn: {
          primary: 'lc-btn--primary',
          secondary: 'lc-btn--secondary',
          light: 'lc-btn--light',
          white: 'lc-btn--white',
          grey: 'lc-btn--grey',
          black: 'lc-btn--black',
          red: 'lc-btn--red',
          disabled: 'lc-btn--disabled',
        },
        link: {
          primary: 'lc-link--primary',
          'primary-light': 'lc-link--primary-light',
          secondary: 'lc-link--secondary',
          grey: 'lc-link--grey',
          black: 'lc-link--black',
          white: 'lc-link--white',
          red: 'lc-link--red',
          disabled: 'lc-link--disabled',
        },
        outline: {
          primary: 'lc-outline--primary',
          secondary: 'lc-outline--secondary',
          grey: 'lc-outline--grey',
          red: 'lc-outline--red',
          disabled: 'lc-outline--disabled',
        },
        icon: {
          primary: 'lc-icon--primary',
          secondary: 'lc-icon--secondary',
          red: 'lc-icon--red',
        },
      } as any,
      btnSizes: {
        btn: {
          xs: 'lc-btn--xs',
          sm: 'lc-btn--sm',
          md: 'lc-btn--md',
          lg: 'lc-btn--lg',
          xl: 'lc-btn--xl',
        },
        outline: {
          xs: 'lc-btn--xs',
          sm: 'lc-btn--sm',
          md: 'lc-btn--md',
          lg: 'lc-btn--lg',
          xl: 'lc-btn--xl',
        },
        icon: {
          xs: 'lc-icon--xs',
          sm: 'lc-icon--sm',
          md: 'lc-icon--md',
          lg: 'lc-icon--lg',
          xl: 'lc-icon--xl',
        },
      } as any,
      btnVariants: {
        btn: 'lc-btn',
        link: 'lc-link',
        outline: 'lc-outline',
        icon: 'lc-icon',
      } as any,
    }
  },
  computed: {
    type(): string {
      if (this.$attrs.to) return 'router-link'
      else if (this.$attrs.href) return 'a'
      else return 'button'
    },
    computedClass(): string[] {
      // Variants
      const color = this.disabled ? 'disabled' : this.color as string
      const size = this.variant === 'link' ? '' : this.size as string

      const blockClass: ComputedClass = {
        btn: this.block ? 'lc-btn--block' : '',
        link: this.block ? 'lc-link--block' : '',
        outline: this.block ? 'lc-outline--block' : '',
        icon: this.block ? 'lc-icon--block' : '',
      }
      const blockFullClass: ComputedClass = {
        btn: this.blockFull ? 'lc-btn--block-full' : '',
        link: this.blockFull ? 'lc-link--block-full' : '',
        outline: this.blockFull ? 'lc-outline--block-full' : '',
      }
      const hasIconClass: ComputedClass = {
        btn: this.hasIcon ? 'lc-btn--has-icon' : '',
        link: this.hasIcon ? 'lc-link--has-icon' : '',
        outline: this.hasIcon ? 'lc-outline--has-icon' : '',
      }
      const weightClass: ComputedClass = {
        btn: `lc-btn--${this.fontWeight}`,
        link: `lc-link--${this.fontWeight}`,
        outline: `lc-outline--${this.fontWeight}`,
        icon: `lc-icon--${this.fontWeight}`,
      }

      return [
        blockClass[this.variant],
        blockFullClass[this.variant],
        hasIconClass[this.variant],
        this.btnColors[this.variant] && this.btnColors[this.variant][color] ? this.btnColors[this.variant][color] : '',
        this.btnSizes[this.variant] && this.btnSizes[this.variant][size] ? this.btnSizes[this.variant][size] : '',
        this.btnVariants[this.variant] ? this.btnVariants[this.variant] : '',
        weightClass[this.variant],
      ]
    },
  },
  methods: {
    callback(e: Event) {
      this.$emit('click', e)
    },
  },
})
</script>

<style>
/* Sizes */
/* Btn */
.lc-btn--xs {
  @apply p-0;
}
.lc-btn--sm {
  @apply py-2.5 px-6;
}
.lc-btn--md {
  @apply py-3.5 px-6;
}
.lc-btn--lg {
  @apply py-4 px-8;
}
.lc-btn--xl {
  @apply py-4 px-12;
}
/* Icon */
.lc-icon--xs {
  @apply w-5 h-5 p-2;
}
.lc-icon--sm {
  @apply w-6 h-6 p-2;
}
.lc-icon--md {
  @apply w-8 h-8 p-4;
}
.lc-icon--lg {
  @apply w-8 h-8 p-5;
}
.lc-icon--xl {
  @apply w-8 h-8 p-6;
}

/* Types */
.lc-btn {
  user-select: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @apply rounded-sm inline-block text-center cursor-pointer align-middle border border-solid border-transparent text-base leading-tight hover:no-underline focus:outline-none focus:border-primary-focus;
}
.lc-link {
  user-select: none;
  transition: color 0.2s ease-in-out, text-decoration 0.2s ease-in-out;
  @apply bg-transparent rounded-sm p-0 inline-block border-none outline-none focus:outline-none;
}
.lc-outline {
  @apply rounded-sm inline-block text-center cursor-pointer align-middle border border-solid text-base leading-tight hover:no-underline focus:outline-none focus:border-primary-focus;
}
.lc-icon {
  @apply flex items-center justify-center transition-colors rounded-full outline-none cursor-pointer focus:outline-none box-content;
}

/* HasIcon */
.lc-btn.lc-btn--has-icon,
.lc-link.lc-link--has-icon,
.lc-outline.lc-outline--has-icon {
  @apply flex items-center justify-center gap-x-2;
}

/* Block */
.lc-btn.lc-btn--block,
.lc-link.lc-link--block,
.lc-outline.lc-outline--block {
  @apply block;
}

/* Block */
.lc-btn.lc-btn--block-full,
.lc-link.lc-link--block-full,
.lc-outline.lc-outline--block-full {
  @apply block w-full;
}

/* Weight */
.lc-btn--font-bold,
.lc-link--font-bold,
.lc-outline--font-bold {
  @apply font-bold;
}
.lc-btn--font-normal,
.lc-link--font-normal,
.lc-outline--font-normal {
  @apply font-normal;
}
.lc-btn--font-medium,
.lc-link--font-medium,
.lc-outline--font-medium {
  @apply font-medium;
}

/* Btn Colors */
.lc-btn--primary {
  @apply bg-primary-500 hover:bg-primary-600 text-white hover:text-white;
}
.lc-btn--primary:focus {
  box-shadow: 0 0 0 0.2rem #dbbc8f4d;
}
.lc-btn--secondary {
  @apply bg-secondary-500 hover:bg-secondary-600 text-white hover:text-white;
}
.lc-btn--secondary:focus {
  box-shadow: 0 0 0 0.2rem #1952524d;
}
.lc-btn--light {
  @apply bg-white text-black hover:bg-gray-300;
}
.lc-btn--white {
  @apply text-white hover:text-white hover:underline;
}
.lc-btn--grey {
  @apply text-gray-600 focus:text-gray-600 md:hover:text-black;
}
.lc-btn--black {
  @apply text-black focus:text-black md:hover:text-black;
}
.lc-btn--red {
  @apply text-white bg-red-100 hover:bg-red-200;
}
.lc-btn--disabled {
  @apply pointer-events-none bg-gray-400 hover:bg-gray-400 text-white;
}

/* Link Colors */
.lc-link--primary {
  @apply text-primary-700 focus:text-primary-700 md:hover:text-primary-600;
}
.lc-link--primary-light {
  @apply text-primary-500 focus:text-primary-500 md:hover:text-primary-600;
}
.lc-link--secondary {
  @apply text-secondary-600 focus:text-secondary-600 md:hover:text-secondary-500;
}
.lc-link--secondary:focus {
  box-shadow: 0 0 0 0.2rem #1952524d;
}
.lc-link--grey {
  @apply text-gray-600 focus:text-gray-600 md:hover:text-black;
}
.lc-link--black {
  @apply text-black focus:text-black md:hover:text-gray-400;
}
.lc-link--white {
  @apply text-white focus:text-white focus:underline hover:text-white hover:underline;
}
.lc-link--red {
  @apply text-red-100 focus:text-red-200 md:hover:text-red-200;
}
.lc-link--disabled {
  @apply pointer-events-none text-gray-400 md:hover:text-gray-400;
}

/* Outline Colors */
.lc-outline--primary {
  @apply bg-white font-medium text-primary-500 border-primary-500 hover:bg-gray-200 hover:text-primary-500;
}
.lc-outline--secondary {
  @apply bg-white font-medium text-secondary-500 border-secondary-500 focus:bg-white focus:font-medium focus:text-secondary-500 focus:border-secondary-500 hover:bg-gray-200 hover:text-secondary-500;
}
.lc-outline--secondary:focus {
  box-shadow: 0 0 0 0.2rem #1952524d;
}
.lc-outline--grey {
  @apply bg-white font-medium text-black border-gray-400 focus:bg-white focus:font-medium focus:text-black focus:border-gray-400 hover:bg-gray-200 hover:text-black;
}
.lc-outline--red {
  @apply bg-white font-medium text-red-100 border-red-100 hover:bg-gray-200 hover:text-red-500;
}
.lc-outline--disabled {
  @apply pointer-events-none bg-white font-medium text-gray-500 border border-gray-500 text-gray-400 md:hover:text-gray-400;
}

/* Icon Colors */
.lc-icon--primary {
  @apply bg-primary-400 hover:bg-primary-500;
}
.lc-icon--secondary {
  @apply bg-secondary-400 hover:bg-secondary-500;
}
.lc-icon--red {
  @apply bg-red-100 hover:bg-red-200;
}

/* Btn Loader */
.lc-btn-loader {
  @apply w-5 h-5 inline-block relative align-middle mr-4;
}
.lc-btn-loader__spin {
  transform: rotate(0deg);
  border: 0.1875rem solid #dbbc8f4d;
  border-top: 0.1875rem solid #dbbc8f;
  animation: spinBaseButton 1s linear infinite;
  @apply absolute inset-1/2 w-5	h-5 rounded-full;
}
.lc-btn--primary .lc-btn-loader__spin {
  border: 0.1875rem solid #1952514d;
  border-top: 0.1875rem solid #195251;
}
@keyframes spinBaseButton {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
