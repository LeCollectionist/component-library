import LcInput from '../components/LcInput'

export default {
  title: 'Example/LcInput',
  component: LcInput,
  argTypes: {
    rules: { control: { type: 'select', options: [] } },
  },
}

const Template = args => ({
  components: { LcInput },
  setup() {
    return { args }
  },
  template: '<lc-input v-bind="args"/>',
})

export const Base = Template.bind({})
Base.args = {
  label: 'Prénom',
  name: 'firstname',
  modelValue: '',
  inputClass: 'w-full',
}
