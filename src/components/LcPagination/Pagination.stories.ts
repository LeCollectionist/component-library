import { action } from '@storybook/addon-actions'

import LcPagination from './index'

export default {
  title: 'Example/LcPagination',
  component: LcPagination,
  argTypes: {
    nbPages: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
    modelValue: { control: { type: 'select' }, options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
  },
}

const Template = (args: any) => ({
  components: { LcPagination },
  setup() {
    return { args }
  },
  data() {
    return { page: args.modelValue }
  },
  template: `
    <lc-pagination v-bind="args" v-model="page" @update:model-value="onUpdate"></lc-pagination>
  `,
  methods: {
    onUpdate: action('onUpdate'),
  },
})

export const FirstCase = Template.bind({}) as any
FirstCase.args = {
  nbPages: 3,
  modelValue: 1,
}

export const SecondCase = Template.bind({}) as any
SecondCase.args = {
  nbPages: 10,
  modelValue: 5,
}
