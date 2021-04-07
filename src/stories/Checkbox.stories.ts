import LcCheckbox from '../components/LcCheckbox'

export default {
  title: 'Example/LcCheckbox',
  component: LcCheckbox,
  argTypes: {
    rules: { control: { type: 'select', options: [] } },
  },
}

const Template = args => ({
  components: { LcCheckbox },
  setup() {
    return { args }
  },
  template: '<lc-checkbox v-model="args.modelValue" v-bind="args"/>',
})

export const Base = Template.bind({})
Base.args = {
  modelValue: true,
  label: 'Label de la checkbox',
  name: 'cgv',
  rules: 'required',
}

export const Multiple = Template.bind({})
Multiple.args = {
  modelValue: ['matin'],
  name: 'schedule',
  rules: 'required',
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
}
