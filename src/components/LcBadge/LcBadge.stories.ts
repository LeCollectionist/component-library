import LcBadge from './index'

export default {
  title: 'Example/LcBadge',
  component: LcBadge,
}

const Template = (args: any) => ({
  components: { LcBadge },
  setup() {
    return { args }
  },
  template: '<lc-badge v-bind="args"/>',
})

export const Base = Template.bind({}) as any
Base.args = {
  text: 'Notifications',
}

export const ColorClass = Template.bind({}) as any
ColorClass.args = {
  ...Base.args,
  colorClass: 'bg-secondary-300 text-secondary-500',
}

export const AttrClass = Template.bind({}) as any
AttrClass.args = {
  ...Base.args,
  class: 'font-bold text-white',
}
