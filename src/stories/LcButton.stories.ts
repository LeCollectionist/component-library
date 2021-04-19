import LcButton from '../components/LcButton'
import { vColor, vFontWeight, vSize, vVariant } from '../validators/LcButton'

export default {
  title: 'Example/LcButton',
  component: LcButton,
  argTypes: {
    size: { control: { type: 'select', options: vSize } },
    color: { control: { type: 'select', options: vColor } },
    variant: { control: { type: 'select', options: vVariant } },
    fontWeight: { control: { type: 'select', options: vFontWeight } },
  },
}

const Template = (args: any) => ({
  components: { LcButton },
  setup() {
    return { args }
  },
  template: '<lc-button v-bind="args">Hello world</lc-button>',
})

export const Primary = Template.bind({}) as any
Primary.args = {
  color: 'primary',
  variant: 'btn',
}

export const Secondary = Template.bind({}) as any
Secondary.args = {
  color: 'secondary',
  variant: 'btn',
}
