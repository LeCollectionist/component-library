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
    @update:modelValue="onUpdate"
  />`,
  methods: {
    onUpdate: action('onUpdate'),
  },
})

export const Base = Template.bind({}) as any
Base.args = {
  label: 'Prénom',
  name: 'firstname',
  modelValue: '',
  wrapperClass: 'w-full',
  mask: '### ### ### #####',
}

export const Placeholder = Template.bind({}) as any
Placeholder.args = {
  ...Base.args,
  placeholder: 'Votre prénom',
}
