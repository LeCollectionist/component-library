import { action } from '@storybook/addon-actions'

import LcForm from './LcForm'

export default {
  title: 'Example/LcForm',
  component: LcForm,
}

const Template = (args: any) => ({
  components: { LcForm },
  setup() {
    return { args }
  },
  template: '<lc-form v-bind="args" @onSubmit="onSubmit" @onCancel="onCancel"/>',
  methods: {
    onSubmit: action('onSubmit'),
    onCancel: action('onCancel'),
  },
})

export const Base = Template.bind({}) as any
Base.args = {
  idForm: 'lcForm',
  buttonPrimary: {
    attrs: {
      color: 'secondary',
      class: 'btn-primary',
    },
    full: true,
    text: 'Valider',
  },
  buttonSecondary: {
    attrs: {
      color: 'secondary',
      class: 'btn-secondary',
    },
    full: true,
    text: 'Annuler',
  },
  fields: [
    {
      model: 'Bob',
      inputType: 'input',
      attr: {
        disabled: true,
        wrapperClass: 'w-full mb-4',
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
        wrapperClass: 'w-full mb-4',
        label: 'addresse',
        name: 'address',
        rules: 'required',
      },
    },
    {
      model: '',
      inputType: 'textarea',
      attr: {
        wrapperClass: 'w-full mb-4',
        label: 'Votre demande',
        placeholder: 'Détailler votre demande',
        name: 'request',
        rules: 'required',
        cols: 5,
        rows: 5,
      },
    },
    {
      model: false,
      inputType: 'checkbox',
      attr: {
        class: 'mb-4',
        label: 'Je souhaite recevoir occasionnellement une sélection d’expériences et de maisons.',
        name: 'newsletter',
        rules: 'required',
      },
    },
    {
      model: '',
      inputType: 'radio',
      attr: {
        label: 'Votre civilité :',
        name: 'civility',
        rules: 'required',
        vertical: false,
      },
      options: [
        { label: 'Monsieur', value: 'mr' },
        { label: 'Madame', value: 'ms' },
        { label: 'Non spécifié', value: 'unspecified' },
      ],
    },
    {
      model: null,
      inputType: 'select',
      options: ['France', 'Indonésie', 'Espagne'],
      attr: {
        labelText: 'Pays',
        name: 'coutnry',
        rules: 'required',
        wrapperClass: 'mb-4',
      },
    },
    {
      model: '',
      inputType: 'mask',
      attr: {
        label: 'Siret',
        mask: '### ### ### #####',
        name: 'siret',
        placeholder: '### ### ### #####',
        rules: { required: true, regex: /^[0-9]{3} [0-9]{3} [0-9]{3} [0-9]{5}$/ },
        wrapperClass: 'w-full lc-col mb-4',
      },
    },
  ],
}
