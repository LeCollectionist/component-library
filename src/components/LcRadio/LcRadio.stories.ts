import { action } from '@storybook/addon-actions'

import LcRadio from './LcRadio.vue'

export default {
  title: 'Example/LcRadio',
  component: LcRadio,
}

const Template = (args: any) => ({
  components: { LcRadio },
  setup() {
    return { args }
  },
  template: '<lc-radio v-bind="args" @update:modelValue="onChange" />',
  methods: {
    onChange: action('onChange'),
  },
})

export const Base = Template.bind({}) as any
Base.args = {
  label: 'Monsieur',
  modelValue: '',
  name: 'civility',
  value: 'mr',
  vertical: false,
}

export const Disabled = Template.bind({}) as any
Disabled.args = {
  ...Base.args,
  disabled: true,
}
