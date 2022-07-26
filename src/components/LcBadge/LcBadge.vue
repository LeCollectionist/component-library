<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcBadge',
  inheritAttrs: false,
  props: {
    colorClass: {
      type: String,
      default: 'lc-badge-primary',
    },
    text: {
      type: String,
      default: '',
    },
  },
})
</script>

<template>
  <div
    class="lc-badge"
    :class="colorClass"
  >
    <p v-bind="$attrs">
      {{ text }}
    </p>
  </div>
</template>

<style scoped>
p {
  @apply m-0;
}

.lc-badge {
  @apply px-2 py-1 w-max rounded font-medium;
}

.lc-badge-primary {
  @apply bg-primary-400 text-primary-700;
}
</style>
