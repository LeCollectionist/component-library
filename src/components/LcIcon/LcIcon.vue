<script setup lang="ts">
import { computed } from 'vue'

import { iconPaths } from './iconPaths'
const paths = { ...iconPaths }

type pathType = keyof typeof paths

const props = withDefaults(
  defineProps<{
    color?: string
    filled?: boolean
    name: pathType
    size?: number
  }>(),
  {
    color: '',
    size: 1.5,
  },
)

const path = computed(() => {
  if (paths[props.name]) {
    return paths[props.name]
  }

  return ''
})
const strokeWidth = computed(() => {
  return 24 / (props.size * 16)
})

const viewbox = computed(() => {
  return '0 0 24 24'
})
</script>

<template>
  <svg v-if="Array.isArray(path)" :class="color" :style="{
    width: `${size}rem`,
    height: `${size}rem`,
  }" :stroke-width="strokeWidth" :fill="filled ? 'currentColor' : 'none'" stroke-linecap="round"
    stroke-linejoin="round" stroke="currentColor" :viewBox="viewbox">
    <path v-for="p in path" :key="p" :d="p" />
  </svg>

  <svg v-else :class="color" :style="{
    width: `${size}rem`,
    height: `${size}rem`,
  }" :stroke-width="strokeWidth" :fill="filled ? 'currentColor' : 'none'" stroke-linecap="round"
    stroke-linejoin="round" stroke="currentColor" :viewBox="viewbox">
    <path :d="path" />
  </svg>
</template>
