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
    @focus-out="onFocusOut"
  />`,
  methods: {
    onUpdate: action('onUpdate'),
    onFocusOut: action('onFocusOut'),
  },
})

export const Base = Template.bind({}) as any
Base.args = {
  label: 'Prénom',
  name: 'firstname',
  modelValue: '',
  inputClass: 'w-full',
}
