<template>
  <div class="lc-form">
    <h2 class="text-3xl my-1 cursor-pointer" @click="lcForm = !lcForm">
      LcForm
    </h2>

    <div v-if="lcForm" class="w-full">
      <lc-form
        id-form="1"
        :fields="formFields"
        :button-primary="lcFormButtonPrimary"
        :button-secondary="lcFormButtonSecondary"
        @onSubmit="onSubmit"
        @onCancel="onCancel"
      />

      <pre>{{ formFields }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
  data() {
    return {
      lcForm: false,
      lcFormButtonPrimary: {
        attrs: {
          color: 'secondary',
          class: 'btn-primary',
        },
        full: true,
        text: 'Valider',
      },
      lcFormButtonSecondary: {
        attrs: {
          color: 'secondary',
          class: 'btn-secondary',
        },
        full: true,
        text: 'Annuler',
      },
      formFields: [
        {
          model: '',
          inputType: 'input',
          attr: {
            disabled: true,
            inputClass: 'w-full lc-col',
            placeholder: 'Ecrit dedans :)',
            label: 'Prénom',
            name: 'firstname',
            rules: 'required',
          },
        },
        {
          model: '',
          inputType: 'input',
          attr: {
            inputClass: 'w-full lc-col',
            label: 'addresse',
            name: 'address',
            rules: 'required',
          },
        },
      ],
    }
  },
  methods: {
    onSubmit(values: Object) {
      console.log('onSubmit', values)
    },
    onCancel(group: String, oldFields: Array<any>) {
      console.log('onCancel', group, oldFields)
      this.formFields = oldFields
    },
  },
})
</script>
