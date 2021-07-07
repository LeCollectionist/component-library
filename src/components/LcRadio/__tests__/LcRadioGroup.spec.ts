import { mount } from '@vue/test-utils'
import { LcRadioGroup, LcRadio } from '../index'

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
    global: {
      components: { LcRadio },
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

  describe('input behaviour', () => {
    it('should render good number of radio-buttons', () => {
      const radiosButtons = wrapper.findAll('input[type="radio"]')

      expect(radiosButtons).toHaveLength(3)
    })

    it('should set good name attribute', () => {
      const radiosButtons = wrapper.findAll('input[type="radio"]')

      expect(radiosButtons[1].attributes('value')).toEqual('ms')
    })

    it('should set good value attributes', () => {
      const radiosButtons = wrapper.findAll('input[type="radio"]')

      expect(radiosButtons[1].attributes('value')).toEqual('ms')
    })

    it('should emit the event', () => {
      const radioButton = wrapper.find('input[type="radio"]')
      radioButton.trigger('change')

      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })
  })

  describe('input layout', () => {
    it('it should render the right label', async() => {
      await wrapper.setProps({ label: 'Your civility :' })

      const label = wrapper.find('label')
      expect(label.text()).toEqual('Your civility :')
    })

    it('it should render vertical layout', async() => {
      await wrapper.setProps({ vertical: true })

      const wrapperBtn = wrapper.findAll('div')[1]
      expect(wrapperBtn.classes()).toContain('flex-col')
    })
  })
})
