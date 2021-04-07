<template>
  <div class="py-4 px-4 flex flex-col">
    <h1 class="font-bold mb-4 text-5xl">
      Component library
    </h1>

    <div class="px-4">
      <lc-button-demo />
      <lc-icon-demo />
      <lc-input-demo />
      <lc-form-demo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcButtonDemo from './components/LcButtonDemo.vue'
import LcIconDemo from './components/LcIconDemo.vue'
import LcInputDemo from './components/LcInputDemo.vue'
import LcFormDemo from './components/LcFormDemo.vue'

export default defineComponent({
  name: 'App',
  components: {
    LcButtonDemo,
    LcIconDemo,
    LcInputDemo,
    LcFormDemo,
  },
})
</script>
