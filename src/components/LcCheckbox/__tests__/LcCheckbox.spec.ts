import { mount } from '@vue/test-utils'
import LcCheckbox from '../LcCheckbox'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcCheckbox', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcCheckbox, {
      props: {
        modelValue: false,
        name: 'newsletter',
      },
    })
    expect(wrapper.vm).toBeTruthy()
  })

  describe('Input behaviour', () => {
    beforeEach(() => {
      wrapper = mount(LcCheckbox, {
        props: {
          modelValue: false,
          name: 'newsletter',
          label: 'Je souhaite recevoir occasionnellement une sélection d’expériences et de maisons.',
        },
      })
    })
    it('should emit the event', async() => {
      const checkbox = wrapper.find('[data-testid="lc-checkbox"]')
      await checkbox.setChecked()

      expect(wrapper.emitted()).toHaveProperty('update:modelValue')
    })

    it('should emit the right value', async() => {
      const checkbox = wrapper.find('[data-testid="lc-checkbox"]')
      await checkbox.setChecked()

      const changeEvent = wrapper.emitted('update:modelValue')

      expect(changeEvent[0]).toEqual([true])
    })

    it('should disabled the checkbox button', async() => {
      await wrapper.setProps({ disabled: true })
      const checkbox = wrapper.find('[data-testid="lc-checkbox"]')

      expect(checkbox.attributes()).toHaveProperty('disabled')
    })

    it('should render correct color style when unchecked', async() => {
      await wrapper.setProps({ color: '#77a6dc' })
      const checkbox = wrapper.find('[data-testid="lc-checkbox"]')

      expect(checkbox.element.style.getPropertyValue('border-color')).toBe('#77a6dc')
      expect(checkbox.element.style.getPropertyValue('background-color')).toBe('')
    })

    it('should render correct color style when checked', async() => {
      await wrapper.setProps({ color: '#77a6dc' })
      const checkbox = wrapper.find('[data-testid="lc-checkbox"]')
      await checkbox.setChecked()

      expect(checkbox.element.style.getPropertyValue('border-color')).toBe('#77a6dc')
      expect(checkbox.element.style.getPropertyValue('background-color')).toBe('rgb(119, 166, 220)')
    })
  })

  describe('Multiple input behaviour', () => {
    beforeEach(() => {
      wrapper = mount(LcCheckbox, {
        props: {
          modelValue: [],
          name: 'schedule',
          label: 'Schedule',
          fields: [
            {
              label: 'Morning',
              value: 'morning',
            },
            {
              label: 'Midday',
              value: 'midday',
            },
            {
              label: 'Evening',
              value: 'evening',
            },
          ],
        },
      })
    })

    it('should render 3 checkbox', () => {
      const checkboxs = wrapper.findAll('[data-testid="lc-checkbox"]')

      expect(checkboxs).toHaveLength(3)
    })

    it('should emit the right value', async() => {
      const checkbox = wrapper.findAll('[data-testid="lc-checkbox"]')
      await checkbox[0].setChecked()

      const eventEmitted = wrapper.emitted('update:modelValue')
      expect(eventEmitted).toHaveLength(1)

      expect(eventEmitted[0][0]).toEqual(['morning'])
    })

    it('should emit the right values', async() => {
      const checkbox = wrapper.findAll('[data-testid="lc-checkbox"]')
      await checkbox[0].setChecked()
      await checkbox[1].setChecked()

      const eventEmitted = wrapper.emitted('update:modelValue')

      expect(eventEmitted).toHaveLength(2)
      expect(eventEmitted[0][0]).toEqual(['morning'])
      expect(eventEmitted[1][0]).toEqual(['morning', 'midday'])
    })
  })

  describe('Multiple input behaviour custom color', () => {
    it('should render correct color style', () => {
      wrapper = mount(LcCheckbox, {
        props: {
          modelValue: [],
          name: 'schedule',
          label: 'Schedule',
          fields: [
            {
              label: 'Morning',
              value: 'morning',
              color: '#cdcdd6',
            },
            {
              label: 'Midday',
              value: 'midday',
              color: '#cdcdd6',
            },
            {
              label: 'Evening',
              value: 'evening',
              color: '#cdcdd6',
            },
          ],
        },
      })

      const checkboxs = wrapper.findAll('[data-testid="lc-checkbox"]')
      const firstCheckbox = checkboxs[0]

      expect(firstCheckbox.element.style.getPropertyValue('border-color')).toBe('#cdcdd6')
      expect(firstCheckbox.element.style.getPropertyValue('background-color')).toBe('rgb(205, 205, 214)')
    })
  })
})
