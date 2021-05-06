<template>
  <div class="flex items-center">
    <button
      :disabled="modelValue === 1"
      class="w-8 h-8 mr-2 outline-none focus:outline-none disabled:opacity-40"
      data-testid="prevPage"
      type="button"
      @click="prevPage"
    >
      <lc-icon
        name="left-chevron"
        size="xs"
      />
    </button>

    <template v-for="(item, i) in paginateArr">
      <span
        v-if="item === '...'"
        :key="`etc-${i}`"
        data-testid="etc"
        class="flex items-center justify-center w-8 h-8 mx-2"
      >
        ...
      </span>
      <span
        v-if="item === 0"
        :key="`empty-${i}`"
        data-testid="empty"
        class="flex items-center justify-center w-8 h-8 mx-2"
      />

      <button
        v-if="item > 0"
        :key="`index-${i}`"
        :class="[
          'w-8 h-8 flex items-center justify-center rounded-full transition-all hover:bg-gray-200 outline-none focus:outline-none mx-2',
          {'font-medium bg-primary-300': item === modelValue}
        ]"
        @click="clickOnNumber(item)"
      >
        {{ item }}
      </button>
    </template>

    <button
      :disabled="modelValue === nbPages"
      class="w-8 h-8 ml-2 outline-none focus:outline-none disabled:opacity-40"
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
