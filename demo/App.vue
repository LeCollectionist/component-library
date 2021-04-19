<template>
  <div class="flex flex-col px-4 py-4">
    <h1 class="mb-4 text-5xl font-bold">
      Component library
    </h1>

    <div class="px-4">
      Launch storybook :
      <code class="pl-4 block">
        <pre class="text-gray-600">yarn storybook</pre>
      </code>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>
