<template>
  <div class="py-4 px-4 flex flex-col">
    <h1 class="font-bold mb-4 text-5xl">
      Component library
    </h1>

    <div class="px-4">
      <lc-button-demo />
      <lc-form-demo />
      <lc-icon-demo />
      <lc-input-demo />
      <lc-modal-demo />
      <lc-table-demo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcButtonDemo from './components/LcButtonDemo.vue'
import LcFormDemo from './components/LcFormDemo.vue'
import LcIconDemo from './components/LcIconDemo.vue'
import LcInputDemo from './components/LcInputDemo.vue'
import LcModalDemo from './components/LcModalDemo.vue'
import LcTableDemo from './components/LcTableDemo.vue'

export default defineComponent({
  name: 'App',
  components: {
    LcButtonDemo,
    LcFormDemo,
    LcIconDemo,
    LcInputDemo,
    LcModalDemo,
    LcTableDemo,
  },
})
</script>
