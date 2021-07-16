<template>
  <table class="w-full">
    <thead>
      <tr>
        <th v-for="head in headers" :key="head.key" scope="col">
          {{ head.value }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="list in body" :key="list.id">
        <td
          v-for="head in headers"
          :key="head.key"
          :data-label="head.value"
          :class="head.class"
        >
          <template v-if="head.key === 'actions'">
            <lc-icon
              v-for="action in list[head.key]"
              :key="action.key"
              class="bg-primary-400 rounded-full text-primary-600 cursor-pointer"
              :size="action.iconSize"
              :name="action.iconName"
              @click="actionClick(action.method, list.id)"
            />
          </template>
          <span v-else-if="list[head.key]" :class="tdClass(list, head)">
            {{ list[head.key].name }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import LcIcon from '../LcIcon'

interface HeadClass {
  class: string
}
interface List {
  [key: string]: HeadClass
}
interface Head {
  key: string
}

export default defineComponent({
  name: 'LcTable',
  components: { LcIcon },
  props: {
    headers: {
      type: Array,
      default: () => {
        return []
      },
    },
    body: {
      type: Array,
      default: () => {
        return []
      },
    },
  },
  methods: {
    tdClass(list: List, head: Head): string {
      return list[head.key]?.class || ''
    },
    actionClick(method: string, actionId: string) {
      this.$emit(method, actionId)
    },
  },
})
</script>

<style scoped>
  table {
    @apply w-full p-0 m-0 table-fixed border-collapse;
  }
  table tbody tr {
    @apply border-b border-gray-300 bg-gray-100 p-1.5;
  }
  table tr:nth-child(2n) {
    @apply bg-white;
  }
  table th,
  table td {
    @apply text-left py-3 px-2.5;
  }
  table th.center,
  table td.center {
    @apply text-center;
  }
  table th {
    @apply h-16 text-sm text-gray-500 font-bold uppercase;
  }

  @media screen and (max-width: 900px) {
    table {
      @apply border-0;
    }
    table thead {
      clip: rect(0 0 0 0);
      height: 1px;
      margin: -1px;
      width: 1px;
      @apply border-none hidden absolute p-0;
    }
    table tr {
      @apply border-b-2 border-gray-300 block mb-2;
    }
    table td {
      @apply border-b border-gray-300 block text-sm text-right;
    }
    table td::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
    }
    table td:last-child {
      border-bottom: 0;
    }
  }
</style>
