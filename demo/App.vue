<template>
  <div class="py-4 px-12 flex flex-col">
    <h1>Component library</h1>

    <h2 class="text-3xl my-1">
      LcButton
    </h2>

    <div class="w-full">
      <h2 class="text-2xl font-bold pl-4">
        Variants :
      </h2>
      <div class="w-full pl-4 my-2">
        <h3 class="text-1xl font-bold">
          Btn :
        </h3>
        <div class="w-full flex my-2 pl-4">
          <div
            v-for="color in btnColors"
            :key="color"
            class="mr-8"
          >
            <lc-button
              variant="btn"
              :disabled="btnIsDisable"
              :color="color"
            >
              {{ color }}
            </lc-button>
          </div>
        </div>
      </div>

      <div class="w-full pl-4 my-2">
        <h3 class="text-1xl font-bold">
          Link :
        </h3>
        <div class="w-full flex my-2 pl-4">
          <div
            v-for="color in colors"
            :key="color"
            class="mr-8"
          >
            <lc-button
              variant="link"
              :disabled="linkIsDisable"
              :color="color"
            >
              {{ color }}
            </lc-button>
          </div>
        </div>
      </div>

      <div class="w-full pl-4 my-2">
        <h3 class="text-1xl font-bold">
          Outline :
        </h3>
        <div class="w-full flex my-2 pl-4">
          <div
            v-for="color in outlineColors"
            :key="color"
            class="mr-8"
          >
            <lc-button
              :disabled="outlineIsDisable"
              variant="outline"
              :color="color"
            >
              {{ color }}
            </lc-button>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold pl-4">
        Sizes :
      </h2>
      <div class="w-full pl-8 my-2">
        <div class="w-full flex my-2 pl-4">
          <div
            v-for="size in buttonSizes"
            :key="size"
            class="mr-8"
          >
            <lc-button
              :size="size"
            >
              {{ size }}
            </lc-button>
          </div>
        </div>
      </div>

      <h2 class="text-2xl font-bold pl-4">
        Loader :
      </h2>
      <div class="w-full pl-8 flex my-2">
        <div class="mr-8">
          <lc-button
            loader
          >
            primary
          </lc-button>
        </div>

        <div class="mr-8">
          <lc-button
            color="secondary"
            loader
          >
            secondary
          </lc-button>
        </div>

        <div>
          <lc-button
            color="grey"
            loader
          >
            grey
          </lc-button>
        </div>
      </div>
    </div>

    <h2 class="text-3xl my-1">
      LcIcon
    </h2>

    <h3 class="text-2xl font-bold pl-4">
      Sizes :
    </h3>
    <div class="w-full flex flex-wrap pl-16 my-2">
      <div
        v-for="size in iconSizes"
        :key="size"
        class="mr-8"
      >
        <strong class="text-sm block mb-2 font-medium">{{ size }}</strong>
        <lc-icon
          name="finances"
          :size="size"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      buttonSizes: ['sm', 'md', 'lg', 'xl'],
      iconSizes: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
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

<style>
  @import 'https://d1azc1qln24ryf.cloudfront.net/192288/AdminTool/style-cf.css?8tpss0';
</style>
