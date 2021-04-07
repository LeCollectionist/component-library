<template>
  <div class="lc-button">
    <h2 class="text-3xl my-1 cursor-pointer" @click="lcButton = !lcButton">
      LcButton
    </h2>

    <div v-if="lcButton" class="w-full">
      <h2 class="text-2xl font-bold pl-4">
        Variants :
      </h2>
      <div class="w-full pl-4 my-2">
        <h3 class="text-1xl font-bold">
          Btn :
        </h3>
        <div class="w-full flex my-2 pl-4">
          <lc-button
            v-for="color in btnColors"
            :key="color"
            class="mr-8"
            variant="btn"
            :disabled="btnIsDisable"
            :color="color"
          >
            {{ color }}
          </lc-button>
        </div>
      </div>

      <div class="w-full pl-4 my-2">
        <h3 class="text-1xl font-bold">
          Link :
        </h3>
        <div class="w-full flex my-2 pl-4">
          <lc-button
            v-for="color in colors"
            :key="color"
            class="mr-8"
            variant="link"
            :disabled="linkIsDisable"
            :color="color"
          >
            {{ color }}
          </lc-button>
        </div>
      </div>

      <div class="w-full pl-4 my-2">
        <h3 class="text-1xl font-bold">
          Outline :
        </h3>
        <div class="w-full flex my-2 pl-4">
          <lc-button
            v-for="color in outlineColors"
            :key="color"
            class="mr-8"
            :disabled="outlineIsDisable"
            variant="outline"
            :color="color"
          >
            {{ color }}
          </lc-button>
        </div>
      </div>

      <h2 class="text-2xl font-bold pl-4">
        Sizes :
      </h2>
      <div class="w-full pl-8 my-2">
        <lc-button
          v-for="size in buttonSizes"
          :key="size"
          class="mr-8"
          :size="size"
        >
          {{ size }}
        </lc-button>
      </div>

      <h2 class="text-2xl font-bold pl-4">
        Loader :
      </h2>
      <div class="w-full pl-8 flex my-2">
        <lc-button
          loader
        >
          primary
        </lc-button>

        <lc-button
          color="secondary"
          loader
        >
          secondary
        </lc-button>

        <lc-button
          color="grey"
          loader
        >
          grey
        </lc-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcButtonDemo',
  data() {
    return {
      lcButton: false,
      buttonSizes: ['sm', 'md', 'lg', 'xl'],
      btnColors: ['primary',
        'secondary',
        'light',
        'grey',
        'black'],
      btnIsDisable: false,
      colors: [
        'primary',
        'primary-light',
        'secondary',
        'light',
        'white',
        'grey',
        'black',
      ],
      linkIsDisable: false,
      outlineColors: ['primary', 'secondary', 'grey'],
      outlineIsDisable: false,
    }
  },
})
</script>
