import { mount } from '@vue/test-utils'
import { LcRadio } from '../index'

let wrapper: any

beforeEach(() => {
  wrapper = mount(LcRadio, {
    props: {
      name: 'civility',
      value: 'mr',
      vertical: false,
    },
  })
})

afterEach(() => {
  wrapper?.unmount()
})

describe('LcRadio', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('input behaviour', () => {
    it('should emit the event', () => {
      const radioButton = wrapper.find('input[type="radio"]')
      radioButton.trigger('change')

      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })

    it('should emit the right value', () => {
      const radioButton = wrapper.find('input[type="radio"]')
      radioButton.trigger('change')

      const changeEvent = wrapper.emitted('update:modelValue')

      expect(changeEvent[0]).toEqual(['mr'])
    })

    it('should disabled the radio button', async() => {
      await wrapper.setProps({ disabled: true })
      const radioButton = wrapper.find('input[type="radio"]')

      expect(radioButton.attributes()).toHaveProperty('disabled')
    })
  })

  describe('input style', () => {
    it('should set style for vertical layout', async() => {
      await wrapper.setProps({ vertical: true })
      const label = wrapper.find('label')

      expect(label.classes()).toContain('mb-2')
    })
  })
})
