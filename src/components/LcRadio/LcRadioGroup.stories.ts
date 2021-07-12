// import { action } from '@storybook/addon-actions'

import LcRadio from './LcRadio.vue'
import LcRadioGroup from './LcRadioGroup.vue'

export default {
  title: 'Example/LcRadioGroup',
  component: LcRadioGroup,
  subcomponents: { LcRadio },
}

const Template = (args: any) => ({
  components: { LcRadioGroup, LcRadio },
  setup() {
    return { args }
  },
  template: '<lc-radio-group v-bind="args" />',
})

export const Base = Template.bind({}) as any
Base.args = {
  modelValue: '',
  name: 'civility',
  options: [
    {
      label: 'Monsieur',
      value: 'mr',
    },
    {
      label: 'Madame',
      value: 'ms',
    },
    {
      label: 'Non binaire',
      value: 'unknown',
    },
  ],
}

export const WithLabel = Template.bind({}) as any
WithLabel.args = {
  ...Base.args,
  label: 'Choisir votre civilité :',
}

export const Vertical = Template.bind({}) as any
Vertical.args = {
  ...Base.args,
  vertical: true,
}

export const VerticalWithLabel = Template.bind({}) as any
VerticalWithLabel.args = {
  ...Base.args,
  label: 'Choisir votre civilité :',
  vertical: true,
}

export const Disabled = Template.bind({}) as any
Disabled.args = {
  ...Base.args,
  label: 'Choisir votre civilité :',
  options: [
    {
      label: 'Monsieur',
      value: 'mr',
      disabled: true,
    },
    {
      label: 'Madame',
      value: 'ms',
    },
    {
      label: 'Non binaire',
      value: 'unknown',
    },
  ],
}
