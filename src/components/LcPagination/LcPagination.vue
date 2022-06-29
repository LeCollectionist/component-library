<template>
  <div class="lc-pagination">
    <button
      :disabled="modelValue === 1"
      :class="[
        'lc-pagination__prev',
        {'lc-pagination__prev--hover': modelValue > 1}
      ]"
      data-testid="prevPage"
      type="button"
      @click="prevPage"
    >
      <lc-icon
        class="lc-pagination__arrow"
        name="left-chevron"
        size="xs"
      />
    </button>

    <template v-for="(item, i) in paginateArr">
      <span
        v-if="item === '...'"
        :key="`etc-${i}`"
        data-testid="etc"
        class="lc-pagination__etc"
      >
        ...
      </span>
      <span
        v-if="item === 0"
        :key="`empty-${i}`"
        data-testid="empty"
        class="lc-pagination__empty"
      />

      <button
        v-if="item > 0"
        :key="`index-${i}`"
        :class="['lc-pagination__number', {'lc-pagination__number--active': item === modelValue}]"
        data-testid="numberPage"
        @click="clickOnNumber(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      :disabled="modelValue === nbPages"
      class="lc-pagination__next"
      :class="[
        'lc-pagination__next',
        {'lc-pagination__next--hover': modelValue !== nbPages}
      ]"
      data-testid="nextPage"
      type="button"
      @click="nextPage"
    >
      <lc-icon
        class="lc-pagination__arrow"
        name="right-chevron"
        size="xs"
      />
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcIcon from '../LcIcon'

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
    nbPages: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  computed: {
    paginateArr(): (string|number)[] {
      const firstItem = this.modelValue > 2 ? 1 : 0 as number
      const secondItem = this.modelValue < 4 ? this.modelValue - 1 : '...' as number | string
      const thirdItem = this.modelValue as number
      let fourthItem = this.modelValue + 1 as number | string

      if (this.modelValue > this.nbPages - 1)
        fourthItem = 0

      else if (this.modelValue < this.nbPages - 2)
        fourthItem = '...'

      const fifthItem = this.modelValue < this.nbPages - 1 ? this.nbPages : 0

      return [firstItem, secondItem, thirdItem, fourthItem, fifthItem]
    },
  },
  methods: {
    clickOnNumber(value: number|string) {
      this.$emit('update:modelValue', value)
    },
    prevPage() {
      if (this.modelValue > 1) {
        const value = this.modelValue - 1

        this.$emit('update:modelValue', value)
      }
    },
    nextPage() {
      if (this.modelValue < this.nbPages) {
        const value = this.modelValue + 1

        this.$emit('update:modelValue', value)
      }
    },
  },
})
</script>

<style>
  .lc-pagination { @apply flex items-center; }
  .lc-pagination__number,
  .lc-pagination__prev,
  .lc-pagination__etc,
  .lc-pagination__next,
  .lc-pagination__arrow { @apply border-0 cursor-pointer; }
  .lc-pagination__prev { @apply w-8 h-8 mr-2 outline-none focus:outline-none rounded-full disabled:opacity-40; }
  .lc-pagination__prev--hover { @apply hover:bg-gray-200; }
  .lc-pagination__etc { @apply flex items-center justify-center w-8 h-8 mx-2; }
  .lc-pagination__empty { @apply flex items-center justify-center w-8 h-8 mx-2; }
  .lc-pagination__number { @apply w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-gray-200 outline-none focus:outline-none mx-2; }
  .lc-pagination__number--active { @apply font-medium bg-primary-300; }
  .lc-pagination__next { @apply w-8 h-8 ml-2 outline-none focus:outline-none rounded-full disabled:opacity-40; }
  .lc-pagination__next--hover { @apply hover:bg-gray-200; }
  .lc-pagination__arrow { @apply font-bold lg:text-[.8rem]; }
</style>
