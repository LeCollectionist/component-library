<template>
  <div class="lc-icon">
    <h2 class="text-3xl my-1 cursor-pointer" @click="lcIcon = !lcIcon">
      LcIcon
    </h2>

    <div v-if="lcIcon" class="w-full">
      <h3 class="text-2xl font-bold pl-4">
        Sizes :
      </h3>
      <div class="w-full flex flex-wrap pl-16 my-2">
        <template
          v-for="size in iconSizes"
          :key="size"
        >
          <strong class="text-sm block mb-2 font-medium">{{ size }}</strong>
          <lc-icon
            name="finances"
            :size="size"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcIconDemo',
  data() {
    return {
      lcIcon: false,
      iconSizes: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
    }
  },
})
</script>

<style>
  @import 'https://d1azc1qln24ryf.cloudfront.net/192288/AdminTool/style-cf.css?8tpss0';
</style>
