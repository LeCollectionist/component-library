<template>
  <div class="lc-input">
    <h2 class="text-3xl my-1 cursor-pointer" @click="lcTable = !lcTable">
      LcTable
    </h2>

    <div v-if="lcTable" class="w-full">
      <lc-table
        :headers="[
          {
            key: 'name',
            value: 'Nom',
          },
          {
            key: 'status',
            value: 'Statut',
          },
          {
            key: 'actions',
            value: 'Actions',
          },
        ]"
        :body="lists"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcTableDemo',
  data() {
    return {
      lcTable: false,
      lists: [
        {
          id: 1,
          name: { name: 'Le Figaro' },
          status: { name: 'Published' },
          actions: [
            {
              key: 'download',
              iconSize: 'sm',
              iconName: 'download',
              method: 'download',
            },
          ],
        },
        {
          id: 2,
          name: { name: 'Le Figaro' },
          status: { name: 'Published' },
          actions: [
            {
              key: 'download',
              iconSize: 'sm',
              iconName: 'download',
              method: 'download',
            },
          ],
        },
        {
          id: 3,
          name: { name: 'Le Figaro' },
          status: { name: 'Published' },
          actions: [
            {
              key: 'download',
              iconSize: 'sm',
              iconName: 'download',
              method: 'download',
            },
          ],
        },
      ],
    }
  },
})
</script>
