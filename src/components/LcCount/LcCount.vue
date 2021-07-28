<template>
  <span
    v-if="nbCount < totalCount && nbCount > 0"
    class="lc-count"
    data-testid="lc-count"
  >
    {{ nbCount }}/{{ totalCount }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BaseCount',
  props: {
    nbCount: {
      type: Number,
      default: 0,
    },
    totalCount: {
      type: Number,
      required: true,
    },
  },
})
</script>

<style>
.lc-count {
  @apply border border-gray-200 bg-gray-200 rounded-full w-8 h-8 flex text-xs items-center justify-center text-gray-400 mx-1;
}
</style>
