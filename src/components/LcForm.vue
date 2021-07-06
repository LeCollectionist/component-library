<template>
  <v-form ref="formValidate" v-slot="{ handleSubmit }" as="">
    <form
      :id="idForm"
      :ref="`form-${group}`"
      :class="{'flex flex-wrap': columnMode}"
      novalidate
      @submit.prevent="handleSubmit($event, onSubmit)"
    >
      <div
        v-for="field in fields"
        :key="field.attr.name"
        :class="baseFormClass(field)"
      >
        <lc-input
          v-if="field.inputType === 'input' && !field.hidden"
          v-model="field.model"
          v-bind="field.attr"
        />
        <lc-checkbox
          v-if="field.inputType === 'checkbox' && !field.hidden"
          v-model="field.model"
          :fields="field.fields || []"
          v-bind="field.attr"
        />
        <lc-multiselect
          v-if="field.inputType === 'select' && !field.hidden"
          v-model="field.model"
          v-bind="field.attr"
        />
      </div>

      <slot name="before-submit-button" />

      <div :class="computedContainerButtonClass" class="mt-4">
        <lc-button
          v-if="buttonSecondary"
          class="mr-0 md:mr-6"
          type="button"
          variant="outline"
          v-bind="buttonSecondary.attrs"
          @click="onCancel"
        >
          {{ buttonSecondary.text }}
        </lc-button>

        <lc-button
          :disabled="disabledPrimaryButton"
          block-full
          class="mb-4 md:m-0"
          name="submit"
          type="submit"
          v-bind="buttonPrimary.attrs"
        >
          <span>{{ buttonPrimary.text }}</span>
        </lc-button>
      </div>
    </form>
  </v-form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Form as vForm, defineRule, configure } from 'vee-validate'
import { required, email, min, numeric, min_value, max_value } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import fr from '@vee-validate/i18n/dist/locale/fr.json'

import { FieldClassContainer, FormValues } from '../types/LcForm'

import LcButton from './LcButton/LcButton.vue'
import LcMultiselect from './LcMultiselect/LcMultiselect.vue'
import LcCheckbox from './LcCheckbox.vue'
import LcInput from './LcInput.vue'

configure({
  generateMessage: localize({
    fr,
  }),
})

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)
defineRule('numeric', numeric)
defineRule('min_value', min_value)
defineRule('max_value', max_value)

export default defineComponent({
  name: 'LcForm',
  components: {
    LcButton,
    LcCheckbox,
    LcInput,
    LcMultiselect,
    vForm,
  },
  props: {
    buttonPrimary: {
      type: Object,
      default: null,
    },
    buttonSecondary: {
      type: Object,
      default: null,
    },
    columnMode: {
      type: Boolean,
      default: false,
    },
    containerButtonClass: {
      type: String,
      default: '',
    },
    disabledPrimaryButton: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    group: {
      type: String,
      default: '',
    },
    idForm: {
      type: String,
      required: true,
    },
  },
  emits: ['on-submit', 'on-cancel'],
  setup(props, { emit }) {
    const formValidate = ref(null)
    const oldFields = JSON.parse(JSON.stringify(props.fields))

    function onSubmit(values: FormValues): void {
      emit('on-submit', values)
    }

    function onCancel(): void {
      emit('on-cancel', props.group, oldFields)
      formValidate?.value?.resetForm()
    }

    return {
      onSubmit,
      onCancel,
      formValidate,
    }
  },
  computed: {
    computedContainerButtonClass(): string[] {
      return [
        'flex flex-col justify-end md:flex-row w-full',
        this.containerButtonClass,
      ]
    },
  },
  methods: {
    baseFormClass(field: FieldClassContainer): string {
      return field.containerInputClass || ''
    },
  },
})
</script>
