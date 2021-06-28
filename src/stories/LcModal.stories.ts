import LcButton from '../components/LcButton/LcButton'
import LcModal from '../components/LcModal'

export default {
  title: 'Example/LcModal',
  component: LcModal,
}

const Template = (args: any) => ({
  components: { LcModal, LcButton },
  setup() {
    return { args }
  },
  template: `
    <lc-modal v-model="args.modelValue" v-bind="args">
      <template #content>Hello world</template>
      <template #footer>
        <lc-button>Valider</lc-button>
      </template>
    </lc-modal>
  `,
})

export const Base = Template.bind({}) as any
Base.args = {
  modelValue: true,
  title: 'Hello',
}
