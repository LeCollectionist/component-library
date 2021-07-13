<template>
  <span :class="['icon', `icon-${name}`, `icon-${size}`]" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { vSize } from './validators/LcIcon'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    name: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'sm',
      validator: (value: string) =>
        vSize.includes(value),
    },
  },
})
</script>

<style scoped>
  @import 'https://d1azc1qln24ryf.cloudfront.net/192288/AdminTool/style-cf.css?nzzigk';

  .icon {
    font-size: 2rem;
    @apply inline-block align-bottom box-content leading-none;
  }
  .icon-xxs {
    min-width: 1rem;
    font-size: 1rem;
  }
  .icon-xs {
    min-width: 1.5rem;
    font-size: 1.5rem;
  }
  .icon-sm {
    min-width: 2rem;
    font-size: 2rem;
  }
  .icon-md {
    min-width: 3rem;
    font-size: 3rem;
  }
  .icon-lg {
    min-width: 5rem;
    font-size: 5rem;
  }
  .icon-xl {
    min-width: 8rem;
    font-size: 8rem;
  }
  .icon-xxl {
    min-width: 10rem;
    font-size: 10rem;
  }
</style>
