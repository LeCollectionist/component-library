import { mount } from '@vue/test-utils'
import LcBadge from '../LcBadge'

let wrapper: any

beforeEach(() => {
  wrapper = mount(LcBadge)
})

afterEach(() => {
  wrapper?.unmount()
})

describe('LcBadge', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render text', async() => {
    const text = 'notifications'
    await wrapper.setProps({ text })

    expect(wrapper.text()).toBe(text)
  })

  describe('Default behavior', () => {
    it('should render default class', () => {
      expect(wrapper.classes('lc-badge')).toBeTruthy()
    })

    it('should have a primary class color', () => {
      expect(wrapper.classes('lc-badge-primary')).toBeTruthy()
    })
  })

  describe('Custom behavior', () => {
    beforeEach(async() => {
      await wrapper.setProps({ colorClass: 'foo' })
    })

    it('shouln\'d have a primary class color', () => {
      expect(wrapper.classes('lc-badge-primary')).toBeFalsy()
    })

    it('should have a custom class color', () => {
      expect(wrapper.classes('foo')).toBeTruthy()
    })
  })
})
