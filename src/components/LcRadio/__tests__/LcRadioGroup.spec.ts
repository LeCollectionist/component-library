import { mount } from '@vue/test-utils'
import { LcRadioGroup } from '../index'

let wrapper: any

beforeEach(() => {
  wrapper = mount(LcRadioGroup, {
    props: {
      options: [
        { label: 'Monsieur', value: 'mr' },
        { label: 'Madame', value: 'ms' },
        { label: 'Non spécifié', value: 'unspecified' },
      ],
      name: 'civility',
      modelValue: '',
    },
  })
})

afterEach(() => {
  wrapper?.unmount()
})

describe('LcRadioGroup', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('Input behaviour', () => {
    it('should render good number of radio-buttons', () => {
      const radiosButtons = wrapper.findAll('[data-testid="lc-radio"]')

      expect(radiosButtons).toHaveLength(3)
    })

    it('should set good name attribute', () => {
      const radiosButtons = wrapper.findAll('[data-testid="lc-radio"]')

      expect(radiosButtons[1].attributes('value')).toEqual('ms')
    })

    it('should emit the event', () => {
      const radioButton = wrapper.find('[data-testid="lc-radio"]')
      radioButton.trigger('change')

      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })

    it('should emit the right value', () => {
      const radioButton = wrapper.find('[data-testid="lc-radio"]')
      radioButton.trigger('change')

      const changeEvent = wrapper.emitted('update:modelValue')

      expect(changeEvent[0]).toEqual(['mr'])
    })
  })

  describe('Input layout', () => {
    it('it should render the right label', async() => {
      await wrapper.setProps({ label: 'Your civility :' })

      const label = wrapper.find('[data-testid="lc-radiogroup-label"]')
      expect(label.text()).toEqual('Your civility :')
    })

    it('it should render vertical layout', async() => {
      await wrapper.setProps({ vertical: true })

      const wrapperBtn = wrapper.find('.lc-radiogroup-layout')
      expect(wrapperBtn.classes()).toContain('lc-radiogroup-layout--vertical')
    })
  })
})
