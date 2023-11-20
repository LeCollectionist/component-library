import LcIcon from '../LcIcon/index'
import { vColor, vFontWeight, vSize, vVariant } from './validators/LcButton'
import LcButton from './index'

export default {
  title: 'Example/LcButton',
  component: LcButton,
  tags: ['autodocs'],
  argTypes: {
    size: { control: { type: 'select' }, options: vSize },
    color: { control: { type: 'select' }, options: vColor },
    variant: { control: { type: 'select' }, options: vVariant },
    fontWeight: { control: { type: 'select' }, options: vFontWeight },
  },
}

const Template = (args: any) => ({
  components: { LcButton },
  setup() {
    return { args }
  },
  template: '<lc-button v-bind="args">Hello world</lc-button>',
})

const TemplateTextIcon = (args: any) => ({
  components: { LcButton, LcIcon },
  setup() {
    return { args }
  },
  template: `
  <lc-button v-bind="args">
    <lc-icon name="requests" /> Hello world
  </lc-button>`,
})

const TemplateIcon = (args: any) => ({
  components: { LcButton, LcIcon },
  setup() {
    return { args }
  },
  template: `
  <lc-button v-bind="args" size="sm">
    <lc-icon name="requests" class="text-white" />
  </lc-button>`,
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

export const IconPrimary = TemplateIcon.bind({}) as any
IconPrimary.args = {
  color: 'primary',
  variant: 'icon',
}

export const IconSecondary = TemplateIcon.bind({}) as any
IconSecondary.args = {
  color: 'secondary',
  variant: 'icon',
}

export const IconRed = TemplateIcon.bind({}) as any
IconRed.args = {
  color: 'red',
  variant: 'icon',
}

export const TextAndIcon = TemplateTextIcon.bind({}) as any
TextAndIcon.args = {
  color: 'primary',
  variant: 'btn',
  hasIcon: true,
}
