import LcIcon from '../components/LcIcon'

export default {
  title: 'Example/LcIcon',
  component: LcIcon,
  argTypes: {
    name: { control: { type: 'select', options: ['finances', 'requests', 'send', 'star-plain'] } },
    size: { control: { type: 'select', options: ['xxs', 'xs', 'sm', 'md', 'lg', 'xl', 'xxl'] } },
  },
}

const Template = (args: any) => ({
  components: { LcIcon },
  setup() {
    return { args }
  },
  template: '<lc-icon v-bind="args"/>',
})

export const Base = Template.bind({}) as any
Base.args = {
  size: 'md',
  name: 'finances',
}
