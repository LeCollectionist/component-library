<template>
  <ul
    v-show="isError"
    class="list-none p-0 ml-1"
  >
    <li
      v-for="(error, id) in errors"
      :key="id"
      class="m-0 text-small text-red"
    >
      {{ error }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcErrors',
  props: {
    errors: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    isError(): boolean {
      return Boolean(this.errors.length)
    },
  },
})
</script>
