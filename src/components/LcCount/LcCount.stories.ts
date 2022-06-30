import LcCount from './index'

export default {
  title: 'Example/LcCount',
  component: LcCount,
}

const Template = (args: any) => ({
  components: { LcCount },
  setup() {
    return { args }
  },
  template: '<lc-count v-bind="args"/>',
})

export const Base = Template.bind({}) as any
Base.args = {
  nbCount: 1,
  totalCount: 10,
}
