<template>
  <div class="py-4 px-12 flex flex-col">
    <h1>Component library</h1>

    <div class="lc-button">
      <h2 class="text-3xl my-1" @click="lcButton = !lcButton">
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

    <div class="lc-icon">
      <h2 class="text-3xl my-1" @click="lcIcon = !lcIcon">
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

    <div class="lc-input">
      <h2 class="text-3xl my-1">
        LcInput
      </h2>

      <div class="w-full">
        <lc-input
          v-model="formInput[0].model"
          name="lcinput"
        />
        <pre>{{ formInput[0].model }}</pre>
      </div>
    </div>

    <div class="lc-form">
      <h2 class="text-3xl my-1">
        LcForm
      </h2>

      <div class="w-full">
        <lc-form
          id-form="1"
          :fields="formInput"
          :button-primary="lcFormButtonPrimary"
          edition-mode
          @onSubmit="onSubmit"
        />
        <pre>{{ formInput }}</pre>
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
      lcButton: false,
      lcIcon: false,
      lcFormButtonPrimary: {
        attrs: {
          color: 'secondary',
          class: 'btn-primary',
        },
        full: true,
        text: 'Valider',
      },
      formInput: [{
        model: '',
        inputType: 'input',
        inputClass: 'w-full lc-col',
        attr: {
          placeholder: 'Ecrit dedans :)',
          label: 'addresse',
          name: 'address',
          rules: 'required',
        },
      }],
      buttonSizes: ['sm', 'md', 'lg', 'xl'],
      iconSizes: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'],
      btnColors: ['primary',
        'secondary',
        'light',
        'grey',
        'black'],
      btnIsDisable: false,
      name: '',
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
  methods: {
    onSubmit() {
      console.log('on submit')
    },
  },
})
</script>

<style>
  @import 'https://d1azc1qln24ryf.cloudfront.net/192288/AdminTool/style-cf.css?8tpss0';
</style>
