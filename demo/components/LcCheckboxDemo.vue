<template>
  <div class="lc-input">
    <h2 class="text-3xl my-1 cursor-pointer" @click="lcCheckbox = !lcCheckbox">
      LcCheckbox
    </h2>

    <div v-if="lcCheckbox" class="w-full">
      <div class="mb-4">
        <lc-checkbox
          v-model="oneCheckbox.model"
          v-bind="oneCheckbox.attr"
          name="lccheckbox"
        />
        <pre class="mt-2">{{ oneCheckbox.model }}</pre>
      </div>
      <lc-checkbox
        v-model="multipleCheckbox.model"
        v-bind="multipleCheckbox.attr"
        :fields="multipleCheckbox.fields"
        name="lccheckbox"
      />
      <pre class="mt-2">{{ multipleCheckbox.model }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcCheckboxDemo',
  data() {
    return {
      lcCheckbox: false,
      oneCheckbox: {
        model: true,
        inputType: 'checkbox',
        attr: {
          label: 'Label de la checkbox',
          name: 'cgv',
          rules: 'required',
        },
      },
      multipleCheckbox: {
        model: [],
        inputType: 'checkbox',
        attr: {
          name: 'schedule',
          rules: 'required',
        },
        fields: [
          {
            label: 'Matin',
            value: 'matin',
          },
          {
            label: 'Midi',
            value: 'midi',
          },
          {
            label: 'Soirée',
            value: 'soiree',
          },
        ],
      },
    }
  },
})
</script>
