import { action } from '@storybook/addon-actions'

import LcInput from './LcInput'

export default {
  title: 'Example/LcInput',
  component: LcInput,
}

const Template = (args: any) => ({
  components: { LcInput },
  setup() {
    return { args }
  },
  template: `<lc-input
    v-bind="args"
    @update:modelValue="onUpdate"
    @blur="onBlur"
  />`,
  methods: {
    onUpdate: action('onUpdate'),
    onBlur: action('onBlur'),
  },
})

export const Base = Template.bind({}) as any
Base.args = {
  label: 'Prénom',
  name: 'firstname',
  modelValue: '',
  wrapperClass: 'w-full',
}

export const Placeholder = Template.bind({}) as any
Placeholder.args = {
  ...Base.args,
  placeholder: 'Votre prénom',
}
