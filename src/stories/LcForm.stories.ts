import LcForm from '../components/LcForm'

export default {
  title: 'Example/LcForm',
  component: LcForm,
}

const Template = (args: any) => ({
  components: { LcForm },
  setup() {
    return { args }
  },
  template: '<lc-form v-bind="args"/>',
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
      model: '',
      inputType: 'input',
      attr: {
        disabled: true,
        inputClass: 'w-full lc-col mb-4',
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
        inputClass: 'w-full lc-col mb-4',
        label: 'addresse',
        name: 'address',
        rules: 'required',
      },
    },
    {
      model: '',
      inputType: 'textarea',
      attr: {
        inputClass: 'w-full lc-col mb-4',
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
        label: 'Je souhaite recevoir occasionnellement une sélection d’expériences et de maisons.',
        name: 'newsletter',
        rules: 'required',
      },
    },
    {
      model: null,
      inputType: 'select',
      attr: {
        labelText: 'Pays',
        name: 'coutnry',
        options: ['France', 'Indonésie', 'Espagne'],
        rules: 'required',
        wrapperClass: 'mb-4',
      },
    },
  ],
}
