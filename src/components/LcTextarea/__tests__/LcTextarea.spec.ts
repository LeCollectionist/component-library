import { mount } from '@vue/test-utils'
import LcTextarea from '../index'

let wrapper: any

beforeEach(() => {
  wrapper = mount(LcTextarea, { props: { name: 'request' } })
})

afterEach(() => {
  wrapper?.unmount()
})

describe('LcTextarea', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should set good id and name attributes', () => {
    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('id')).toEqual('request')
    expect(textarea.attributes('name')).toEqual('request')
  })

  it('should render a label', async() => {
    await wrapper.setProps({ label: 'Your request' })
    const label = wrapper.find('label')
    expect(label).toBeTruthy()
  })

  it('should set the right input class', async() => {
    await wrapper.setProps({ inputClass: 'foo' })
    const container = wrapper.find('.foo')
    expect(container.classes()).toContain('foo')
  })

  it('should set a placeholder', async() => {
    await wrapper.setProps({ placeHolder: 'your request' })
    const textarea = wrapper.find('textarea')
    expect(textarea.attributes('placeholder')).toEqual('your request')
  })
})
