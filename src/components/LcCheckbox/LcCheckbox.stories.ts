import LcCheckbox from './LcCheckbox'

export default {
  title: 'Example/LcCheckbox',
  component: LcCheckbox,
}

const Template = (args: any) => ({
  components: { LcCheckbox },
  setup() {
    return { args }
  },
  template: '<lc-checkbox v-model="args.modelValue" v-bind="args"/>',
})

export const Base = Template.bind({}) as any
Base.args = {
  modelValue: true,
  label: 'Label de la checkbox',
  name: 'cgv',
  rules: 'required',
}

export const Multiple = Template.bind({}) as any
Multiple.args = {
  modelValue: ['matin'],
  name: 'schedule',
  rules: 'required',
  fields: [
    {
      label: 'Matin',
      value: 'matin',
      color: '#CDCDD6',
    },
    {
      label: 'Midi',
      value: 'midi',
      color: '#77A6DC',
    },
    {
      label: 'Soirée',
      value: 'soiree',
      color: '#B5DCF3',
    },
  ],
}
