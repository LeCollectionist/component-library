import LcTextarea from './LcTextarea'

export default {
  title: 'Example/LcTextarea',
  component: LcTextarea,
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
  inputWrapper: 'w-full',
}

export const WithCustomRows = Template.bind({}) as any
WithCustomRows.args = {
  ...Base.args,
  rows: 10,
}

export const WithPlaceholder = Template.bind({}) as any
WithPlaceholder.args = {
  ...Base.args,
  placeholder: 'Décrire votre demande ...',
}
