import LcButton from '../LcButton'
import { vPosition, vVariant, vSize } from './validators/LcTooltip'
import LcTooltip from './index'

export default {
  title: 'Example/LcTooltip',
  component: LcTooltip,
  argTypes: {
    position: { control: { type: 'select' }, options: vPosition },
    variant: { control: { type: 'select' }, options: vVariant },
    size: { control: { type: 'select' }, options: vSize },
  },
  parameters: {
    layout: 'centered',
  },
}

const Template = (args: any) => ({
  components: { LcTooltip, LcButton },
  setup() {
    return { args }
  },
  template: `
    <lc-tooltip
      v-bind="args"
    >
      <template #element>
        <lc-button
          color="secondary"
        >
          Element
        </lc-button>
      </template>

      <template #text>
        <span>
          Texte
        </span>
      </template>
    </lc-tooltip>
  `,
})

export const Base = Template.bind({}) as any
Base.args = {
  show: true,
}

export const White = Template.bind({}) as any
White.args = {
  ...Base.args,
  variant: 'white',
}

export const Right = Template.bind({}) as any
Right.args = {
  ...White.args,
  position: 'right',
}

export const Small = Template.bind({}) as any
Small.args = {
  ...Base.args,
  size: 'small',
}

export const Clickable = Template.bind({}) as any
Clickable.args = {
  ...White.args,
  clickable: true,
}
