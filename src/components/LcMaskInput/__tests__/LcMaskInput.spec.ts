import { mount } from '@vue/test-utils'
import LcMaskInput from '../LcMaskInput'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcInput', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcMaskInput, { props: { name: 'siret' } })
    expect(wrapper.vm).toBeTruthy()
  })

  describe('Global input behavior', () => {
    beforeEach(() => {
      wrapper = mount(LcMaskInput, { props: { name: 'siret' } })
    })

    it('should set good id and name attributes', () => {
      const input = wrapper.find('[data-testid="lc-mask-input"]')

      expect(input.attributes('id')).toBe('siret')
      expect(input.attributes('name')).toBe('siret')
    })

    it('should render a label', async() => {
      const labelText = 'Your Siret'
      await wrapper.setProps({ label: labelText })
      const label = wrapper.get('label')

      expect(label.text()).toBe(labelText)
    })

    it('should set the right input class', async() => {
      await wrapper.setProps({ wrapperClass: 'foo' })

      expect(wrapper.classes()).toContain('foo')
    })

    it('should set a placeholder', async() => {
      const placeholderText = 'your siret'
      await wrapper.setProps({ placeholder: placeholderText })
      const input = wrapper.find('[data-testid="lc-mask-input"]')

      expect(input.attributes('placeholder')).toBe(placeholderText)
    })

    it('should emit blur event when leave input', async() => {
      const input = wrapper.find('[data-testid="lc-mask-input"]')
      await input.trigger('blur')

      expect(wrapper.emitted('blur')).toBeTruthy()
    })
  })

  describe('Maska behavior', () => {
    it('should value input is formatted', () => {
      wrapper = mount(LcMaskInput, {
        props: {
          name: 'siret',
          mask: '### ### ### #####',
          modelValue: '12345678910112',
        },
      })

      const input = wrapper.find('[data-testid="lc-mask-input"]')

      expect(input.element.value).toBe('123 456 789 10112')
    })

    it('should value input is empty', async() => {
      wrapper = mount(LcMaskInput, {
        props: {
          name: 'number',
          mask: '###',
          modelValue: '',
        },
      })

      const input = wrapper.find('[data-testid="lc-mask-input"]')
      await input.setValue('AZE')

      expect(input.element.value).toBe('')
    })

    it('should emit raw-value event when value change', async() => {
      wrapper = mount(LcMaskInput, {
        props: {
          name: 'number',
          mask: '### ####',
          modelValue: '',
        },
      })

      const input = wrapper.find('[data-testid="lc-mask-input"]')
      await input.setValue('123 456')

      const eventEmitted = wrapper.emitted('raw-value')
      // take the last event because maska launches several
      const lastEvent = eventEmitted.length - 1

      expect(eventEmitted[lastEvent]).toEqual(['123456'])
    })
  })
})
