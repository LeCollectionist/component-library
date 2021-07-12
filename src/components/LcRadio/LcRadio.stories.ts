// import { action } from '@storybook/addon-actions'

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
  template: '<lc-radio v-bind="args" />',
})

export const Base = Template.bind({}) as any
Base.args = {
  modelValue: '',
  name: 'civility',
  value: 'mr',
  vertical: false,
}

export const WithLabel = Template.bind({}) as any
WithLabel.args = {
  ...Base.args,
  label: 'Monsieur',
}

export const Disabled = Template.bind({}) as any
Disabled.args = {
  ...Base.args,
  label: 'Monsieur',
  disabled: true,
}
