import LcButton from '../LcButton/index'
import LcModal from './index'

export default {
  title: 'Example/LcModal',
  component: LcModal,
  parameters: {
    layout: 'centered',
  },
}

const Template = (args: any) => ({
  components: { LcModal, LcButton },
  setup() {
    return { args }
  },
  data() {
    return { open: args.modelValue }
  },
  template: `
    <lc-button @click="open = !open">Open modal</lc-button>
    <lc-modal v-bind="args" v-model="open">
      <template #content>Hello world</template>
      <template #footer>
        <lc-button>Validate</lc-button>
      </template>
    </lc-modal>
  `,
})

export const Base = Template.bind({}) as any
Base.args = {
  modelValue: false,
  title: 'Hello',
}

export const OpenDefault = Template.bind({}) as any
OpenDefault.args = {
  ...Base.args,
  modelValue: true,
}

export const WithoutHeader = Template.bind({}) as any
WithoutHeader.args = {
  ...Base.args,
  noHeader: true,
}

export const WithoutFooter = Template.bind({}) as any
WithoutFooter.args = {
  ...Base.args,
  noFooter: true,
}

export const WithoutBoth = Template.bind({}) as any
WithoutBoth.args = {
  ...Base.args,
  noHeader: true,
  noFooter: true,
}
