import LcTextarea from './index'

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
  label: 'Entrez votre texte ici :',
  name: 'content',
  modelValue: '',
  inputClass: 'w-full',
}
