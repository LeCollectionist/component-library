import { action } from '@storybook/addon-actions'

import LcMaskInput from './LcMaskInput'

export default {
  title: 'Example/LcMaskInput',
  component: LcMaskInput,
}

const Template = (args: any) => ({
  components: { LcMaskInput },
  setup() {
    return { args }
  },
  template: `<lc-mask-input
    v-bind="args"
    @blur="onBlur"
    @raw-value="rawValue"
  />`,
  methods: {
    onBlur: action('onBlur'),
    rawValue: action('rawValue'),
  },
})

export const Base = Template.bind({}) as any
Base.args = {
  label: 'Siret',
  name: 'siret',
  modelValue: '',
  wrapperClass: 'w-full',
  mask: '### ### ### #####',
}

export const Value = Template.bind({}) as any
Value.args = {
  ...Base.args,
  modelValue: '11122233355555',
}
