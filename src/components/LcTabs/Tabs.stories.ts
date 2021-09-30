import LcButton from '../LcButton'
import LcTabs from './LcTabs'
import LcTab from './LcTab'

export default {
  title: 'Example/LcTabs',
  component: LcTabs,
}

const Template = (args: any) => ({
  components: { LcTabs, LcTab },
  setup() {
    return { args }
  },
  data() {
    return { currentTab: args.modelValue }
  },
  template: `
    <lc-tabs v-model="currentTab">
      <lc-tab title="Tab A">Content A</lc-tab>
      <lc-tab title="Tab B">Content B</lc-tab>
      <lc-tab title="Tab C">Content C</lc-tab>
    </lc-tabs>
  `,
})

const TemplateSlotSideContent = (args: any) => ({
  components: { LcTabs, LcTab, LcButton },
  setup() {
    return { args }
  },
  data() {
    return { currentTab: args.modelValue }
  },
  template: `
  <lc-tabs v-model="currentTab">
    <template #sideContent>
      <lc-button>button side</lc-button>
    </template>
    <lc-tab title="Tab A">Content A</lc-tab>
    <lc-tab title="Tab B">Content B</lc-tab>
    <lc-tab title="Tab C">Content C</lc-tab>
  </lc-tabs>
  `,
})

export const Base = Template.bind({}) as any
Base.args = {
  modelValue: 0,
}

export const WithSlot = TemplateSlotSideContent.bind({}) as any
WithSlot.args = {
  modelValue: 0,
}
