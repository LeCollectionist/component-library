import LcButton from '../components/LcButton'

export default {
  title: 'Example/LcButton',
  component: LcButton,
  argTypes: {
    size: { control: { type: 'select', options: ['sm', 'md', 'lg', 'xl'] } },
    color: { control: { type: 'select', options: ['primary', 'primary-light', 'secondary', 'light', 'white', 'grey', 'black'] } },
    variant: { control: { type: 'select', options: ['btn', 'link', 'outline'] } },
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
