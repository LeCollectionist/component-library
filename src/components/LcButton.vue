<template>
  <component
    :is="type"
    :class="[computedClass]"
    :disabled="disabled"
    v-bind="$attrs"
    @click="callback"
  >
    <span
      v-if="loader"
      class="lc-btn-loader"
    >
      <i class="lc-btn-loader__spin" />
    </span>
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// Types
interface btnVariants {
  [key: string]: string
}
interface btnSizes {
  [key: string]: string
}
interface color {
  [key: string]: string
}
interface btnColors {
  [key: string]: color
}

// Mounted component
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
        const colorList = [
          'primary',
          'primary-light',
          'secondary',
          'light',
          'white',
          'grey',
          'black',
        ]

        return colorList.includes(value)
      },
    },
    disabled: {
      type: Boolean,
      default: false,
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
        const sizeList = ['sm', 'md', 'lg', 'xl']

        return sizeList.includes(value)
      },
    },
    variant: {
      type: String,
      default: 'btn',
      validator: (value: string) => {
        const variantList = ['btn', 'link', 'outline']

        return variantList.includes(value)
      },
    },
  },
  emits: ['click'],
  computed: {
    type(): string {
      if (this.$attrs.to) return 'nuxt-link'
      else if (this.$attrs.href) return 'a'
      else return 'button'
    },
    computedClass(): string[] {
      const btnSizes: btnSizes = {
        sm: 'lc-btn--sm',
        md: 'lc-btn--md',
        lg: 'lc-btn--lg',
        xl: 'lc-btn--xl',
      }
      const btnVariants: btnVariants = {
        btn: 'lc-btn',
        link: 'lc-link',
        outline: 'lc-outline',
      }
      const btnColors: btnColors = {
        btn: {
          primary: 'lc-btn--primary',
          secondary: 'lc-btn--secondary',
          light: 'lc-btn--light',
          white: 'lc-btn--white',
          grey: 'lc-btn--grey',
          black: 'lc-btn--black',
          disabled: 'lc-btn--disabled',
        },
        link: {
          primary: 'lc-link--primary',
          'primary-light': 'lc-link--primary-light',
          secondary: 'lc-link--secondary',
          grey: 'lc-link--grey',
          black: 'lc-link--black',
          white: 'lc-link--white',
          disabled: 'lc-link--disabled',
        },
        outline: {
          primary: 'lc-outline-primary',
          secondary: 'lc-outline-secondary',
          grey: 'lc-outline-grey',
          disabled: 'lc-outline-disabled',
        },
      }

      const size = this.variant === 'link' ? '' : this.size
      const color = this.disabled ? 'disabled' : this.color

      return [
        btnVariants[this.variant],
        btnSizes[size],
        btnColors[this.variant][color],
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
.lc-btn--sm { @apply py-2.5 px-6; }
.lc-btn--md { @apply py-3.5 px-6; }
.lc-btn--lg { @apply py-4 px-8; }
.lc-btn--xl { @apply py-4 px-12; }

/* Types */
.lc-btn {
  user-select: none;
  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  @apply font-bold rounded-sm inline-block text-center cursor-pointer align-middle border border-solid border-transparent text-base leading-tight hover:no-underline focus:outline-none focus:border-primary-focus;
}
.lc-link {
  user-select: none;
  transition: color 0.2s ease-in-out, text-decoration 0.2s ease-in-out;
  @apply font-bold bg-transparent rounded-sm p-0 inline-block border-none outline-none focus:outline-none;
}
.lc-outline { @apply font-bold rounded-sm inline-block text-center cursor-pointer align-middle border border-solid text-base leading-tight hover:no-underline focus:outline-none focus:border-primary-focus; }

/* Btn Colors */
.lc-btn--primary { @apply bg-primary-500 hover:bg-primary-600 text-white hover:text-white; }
.lc-btn--primary:focus { box-shadow: 0 0 0 0.2rem #dbbc8f4d; }
.lc-btn--secondary { @apply bg-secondary-500 hover:bg-secondary-600 text-white; }
.lc-btn--secondary:focus { box-shadow: 0 0 0 0.2rem #1952524d; }
.lc-btn--light { @apply bg-white text-black hover:bg-gray-300; }
.lc-btn--white { @apply text-white hover:text-white hover:underline; }
.lc-btn--grey { @apply text-gray-600 focus:text-gray-600 md:hover:text-black; }
.lc-btn--black { @apply text-black focus:text-black md:hover:text-black; }
.lc-btn--disabled { @apply pointer-events-none bg-gray-400 hover:bg-gray-400 text-white; }

/* Link Colors */
.lc-link--primary { @apply text-primary-700 focus:text-primary-700 md:hover:text-primary-600; }
.lc-link--primary-light { @apply text-primary-500 focus:text-primary-500 md:hover:text-primary-600; }
.lc-link--secondary { @apply text-secondary-600 focus:text-secondary-600 md:hover:text-secondary-500; }
.lc-link--secondary:focus { box-shadow: 0 0 0 0.2rem #1952524d; }
.lc-link--grey { @apply text-gray-600 focus:text-gray-600 md:hover:text-black; }
.lc-link--black { @apply text-black focus:text-black md:hover:text-black; }
.lc-link--white { @apply text-white focus:text-white focus:underline md:hover:text-black; }
.lc-link--disabled { @apply pointer-events-none text-gray-400 md:hover:text-gray-400; }

/* Outline Colors */
.lc-outline-primary { @apply bg-white font-medium text-primary-500 border-primary-500 hover:bg-gray-200 hover:text-primary-500; }
.lc-outline-secondary { @apply bg-white font-medium text-secondary-500 border-secondary-500 focus:bg-white focus:font-medium focus:text-secondary-500 focus:border-secondary-500 hover:bg-gray-200 hover:text-secondary-500; }
.lc-outline-secondary:focus { box-shadow: 0 0 0 0.2rem #1952524d; }
.lc-outline-grey { @apply bg-white font-medium text-black border-gray-400 focus:bg-white focus:font-medium focus:text-black focus:border-gray-400 hover:bg-gray-200 hover:text-black; }
.lc-outline-disabled { @apply pointer-events-none bg-white font-medium text-gray-500 border border-gray-500 text-gray-400 md:hover:text-gray-400; }

/* Btn Loader */
.lc-btn-loader {
  @apply w-5 h-5 inline-block relative align-middle mr-4;
}
.lc-btn-loader__spin {
  transform: rotate(0deg);
  border: 0.1875rem solid #dbbc8f4d;
  border-top: 0.1875rem solid #dbbc8f;
  animation: spin 1s linear infinite;
  @apply absolute inset-1/2 w-5	h-5 rounded-full;
}
.lc-btn--primary .lc-btn-loader__spin {
  border: 0.1875rem solid #1952514d;
  border-top: 0.1875rem solid #195251;
}
@keyframes spin {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
