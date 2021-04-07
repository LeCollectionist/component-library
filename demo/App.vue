<template>
  <div class="flex flex-col px-4 py-4">
    <h1 class="mb-4 text-5xl font-bold">
      Component library
    </h1>

    <div class="px-4">
      <lc-button-demo />
      <lc-checkbox-demo />
      <lc-icon-demo />
      <lc-input-demo />
      <lc-form-demo />
      <lc-modal-demo />
      <lc-table-demo />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcButtonDemo from './components/LcButtonDemo.vue'
import LcCheckboxDemo from './components/LcCheckboxDemo.vue'
import LcFormDemo from './components/LcFormDemo.vue'
import LcIconDemo from './components/LcIconDemo.vue'
import LcInputDemo from './components/LcInputDemo.vue'
import LcModalDemo from './components/LcModalDemo.vue'
import LcTableDemo from './components/LcTableDemo.vue'

export default defineComponent({
  name: 'App',
  components: {
    LcButtonDemo,
    LcCheckboxDemo,
    LcFormDemo,
    LcIconDemo,
    LcInputDemo,
    LcModalDemo,
    LcTableDemo,
  },
})
</script>
