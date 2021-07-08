import LcTextarea from './LcTextarea'

export default {
  title: 'Example/LcTextarea',
  component: LcTextarea,
  argTypes: {
    rules: { control: { type: 'select', options: [] } },
  },
}

const Template = (args: any) => ({
  components: { LcTextarea },
  setup() {
    return { args }
  },
  template: '<lc-textarea v-bind="args"/>',
})

export const Base = Template.bind({}) as any
Base.args = {
  label: 'Votre demande :',
  name: 'content',
  modelValue: '',
  inputClass: 'w-full',
}

export const withCustomRows = Template.bind({}) as any
withCustomRows.args = {
  label: 'Votre demande :',
  name: 'content',
  modelValue: '',
  inputClass: 'w-full',
  rows: 10,
}

export const withPlaceholder = Template.bind({}) as any
withPlaceholder.args = {
  label: 'Votre demande :',
  name: 'content',
  modelValue: '',
  inputClass: 'w-full',
  placeholder: 'Décrire votre demande ...',
}
