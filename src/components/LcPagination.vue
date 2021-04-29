<template>
  <div class="flex items-center">
    <button
      :disabled="modelValue === 1"
      class="w-8 h-8 mr-4 outline-none focus:outline-none disabled:opacity-40"
      data-testid="prevPage"
      type="button"
      @click="prevPage"
    >
      <lc-icon
        name="left-chevron"
        size="xs"
        @click="prevPage"
      />
    </button>

    <template v-for="(number, i) in paginateArr">
      <span
        v-if="number === '...'"
        :key="`etc-${i}`"
        data-testid="etc"
        class="w-8 h-8 flex items-center justify-center"
      >
        ...
      </span>
      <span
        v-if="number === 0"
        :key="`empty-${i}`"
        data-testid="empty"
        class="w-8 h-8 flex items-center justify-center"
      />

      <button
        v-if="number > 0"
        :key="`index-${i}`"
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-gray-200 focus:outline-none',
          {'medium bg-primary-300 font-bold': number === modelValue}
        ]"
        @click="clickOnNumber(number)"
      >
        {{ number }}
      </button>
    </template>

    <button
      :disabled="modelValue === page"
      class="w-8 h-8 ml-4 outline-none focus:outline-none disabled:opacity-40"
      data-testid="nextPage"
      type="button"
      @click="nextPage"
    >
      <lc-icon
        name="right-chevron"
        size="xs"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcIcon from './LcIcon.vue'

export default defineComponent({
  name: 'LcPagination',
  components: {
    LcIcon,
  },
  props: {
    modelValue: {
      type: Number,
      default: 1,
    },
    page: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    paginateArr(): (string|number)[] {
      const firstNumber = this.modelValue > 2 ? 1 : 0 as number
      const secondNumber = this.modelValue < 4 ? this.modelValue - 1 : '...' as number | string
      const thirdNumber = this.modelValue as number
      let fourthNumber = this.modelValue + 1 as number | string

      if (this.modelValue > this.page - 1)
        fourthNumber = 0

      else if (this.modelValue < this.page - 2)
        fourthNumber = '...'

      const fifthNumber = this.modelValue < this.page - 1 ? this.page : 0 as number

      return [firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber]
    },
  },
  methods: {
    clickOnNumber(value: number) {
      this.$emit('update:modelValue', value)
    },
    prevPage() {
      if (this.modelValue > 1) {
        const value = this.modelValue - 1

        this.$emit('update:modelValue', value)
      }
    },
    nextPage() {
      if (this.modelValue < this.page) {
        const value = this.modelValue + 1

        this.$emit('update:modelValue', value)
      }
    },
  },
})
</script>
