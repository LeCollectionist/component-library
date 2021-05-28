import LcTooltip from '../components/LcTooltip'
import LcButton from '../components/LcButton'

import { vPosition, vVariant, vSize } from '../validators/LcTooltip'

export default {
  title: 'Example/LcTooltip',
  component: LcTooltip,
  argTypes: {
    position: { control: { type: 'select', options: vPosition } },
    variant: { control: { type: 'select', options: vVariant } },
    size: { control: { type: 'select', options: vSize } },
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
        <p class="mb-0">
          Texte
        </p>
      </template>
    </lc-tooltip>
  `,
})

export const Base = Template.bind({}) as any
Base.args = {
  position: 'bottom',
  variant: 'white',
  blockFull: true,
}
