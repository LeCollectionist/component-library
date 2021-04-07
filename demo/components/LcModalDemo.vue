<template>
  <div class="lc-input">
    <h2 class="text-3xl my-1 cursor-pointer" @click="showModal = true">
      LcModal
    </h2>

    <lc-modal
      v-model="showModal"
      title="Hello"
    >
      <template #content>
        Hello World
      </template>

      <template #footer>
        <lc-button @click="showModal = false">
          Fermer
        </lc-button>
      </template>
    </lc-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcModalDemo',
  data() {
    return {
      showModal: false,
    }
  },
})
</script>
