import LcButton from '../LcButton/index'
import LcAccordion from './index'

export default {
  title: 'Example/LcAccordion',
  component: LcAccordion,
}

const Template = (args: any) => ({
  components: { LcAccordion, LcButton },
  setup() {
    return { args }
  },
  data() {
    return { open: args.modelValue }
  },
  template: `
    <lc-accordion v-bind="args" v-model="open">
      <template #body>
        My content
      </template>
    </lc-accordion>
  `,
})

const TemplateSlotActionsAfter = (args: any) => ({
  components: { LcAccordion, LcButton },
  setup() {
    return { args }
  },
  data() {
    return { open: args.modelValue }
  },
  template: `
    <lc-accordion v-bind="args" v-model="open">
      <template #content-after>
        <lc-button>button after</lc-button>
      </template>
      <template #body>
        My content
      </template>
    </lc-accordion>
  `,
})

const TemplateSlotActionsBefore = (args: any) => ({
  components: { LcAccordion, LcButton },
  setup() {
    return { args }
  },
  data() {
    return { open: args.modelValue }
  },
  template: `
    <lc-accordion v-bind="args" v-model="open">
      <template #content-before>
        <lc-button>button before</lc-button>
      </template>
      <template #body>
        My content
      </template>
    </lc-accordion>
  `,
})

export const Base = Template.bind({}) as any
Base.args = {
  title: '1. House information',
  modelValue: true,
}

export const HaveToogle = Template.bind({}) as any
HaveToogle.args = {
  ...Base.args,
  haveToggle: true,
}

export const HaveToogleButClose = Template.bind({}) as any
HaveToogleButClose.args = {
  ...HaveToogle.args,
  modelValue: false,
}

export const HaveButtonRight = TemplateSlotActionsAfter.bind({}) as any
HaveButtonRight.args = {
  title: '1. House information',
  modelValue: true,
}

export const HaveButtonRightAndToggle = TemplateSlotActionsAfter.bind({}) as any
HaveButtonRightAndToggle.args = {
  ...HaveButtonRight.args,
  haveToggle: true,
}

export const HaveButtonLeft = TemplateSlotActionsBefore.bind({}) as any
HaveButtonLeft.args = {
  title: '1. House information',
  modelValue: true,
}

export const HaveButtonLeftAndToggle = TemplateSlotActionsBefore.bind({}) as any
HaveButtonLeftAndToggle.args = {
  ...HaveButtonLeft.args,
  haveToggle: true,
}

export const HaveNoBodyPadding = Template.bind({}) as any
HaveNoBodyPadding.args = {
  ...Base.args,
  hasBodyPadding: false,
}
