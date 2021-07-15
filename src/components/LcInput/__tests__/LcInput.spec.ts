import { mount } from '@vue/test-utils'
import LcInput from '../LcInput'

let wrapper: any

beforeEach(() => {
  wrapper = mount(LcInput, { props: { name: 'firstname' } })
})

afterEach(() => {
  wrapper?.unmount()
})

describe('LcInput', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should set good id and name attributes', () => {
    const input = wrapper.find('input')

    expect(input.attributes('id')).toBe('firstname')
    expect(input.attributes('name')).toBe('firstname')
  })

  it('should render a label', async() => {
    const labelText = 'Your Firstname'
    await wrapper.setProps({ label: labelText })
    const label = wrapper.get('label')

    expect(label.text()).toBe(labelText)
  })

  it('should set the right input class', async() => {
    await wrapper.setProps({ wrapperClass: 'foo' })

    expect(wrapper.classes()).toContain('foo')
  })

  it('should set a placeholder', async() => {
    const placeholderText = 'your firstname'
    await wrapper.setProps({ placeholder: placeholderText })
    const input = wrapper.find('input')

    expect(input.attributes('placeholder')).toBe(placeholderText)
  })

  it('should emit blur event when leave input', async() => {
    const input = wrapper.find('input')
    await input.trigger('blur')

    expect(wrapper.emitted('blur')).toBeTruthy()
  })
})
