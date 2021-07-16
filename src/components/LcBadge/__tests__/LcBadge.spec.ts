import { mount } from '@vue/test-utils'
import LcBadge from '../LcBadge'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcBadge', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcBadge)
    expect(wrapper.vm).toBeTruthy()
  })

  it('should render text', async() => {
    const text = 'notifications'
    wrapper = mount(LcBadge, { props: { text } })

    expect(wrapper.text()).toBe(text)
  })

  describe('Default behavior', () => {
    beforeEach(() => {
      wrapper = mount(LcBadge)
    })

    it('should render default class', () => {
      expect(wrapper.classes('lc-badge')).toBeTruthy()
    })

    it('should have a primary class color', () => {
      expect(wrapper.classes('lc-badge-primary')).toBeTruthy()
    })
  })

  describe('Custom behavior', () => {
    beforeEach(() => {
      wrapper = mount(LcBadge, { props: { colorClass: 'foo' } })
    })

    it('shouln\'d have a primary class color', () => {
      expect(wrapper.classes('lc-badge-primary')).toBeFalsy()
    })

    it('should have a custom class color', () => {
      expect(wrapper.classes('foo')).toBeTruthy()
    })
  })

  describe('Custom attrs', () => {
    it('should have $attrs class on child element', () => {
      wrapper = mount(LcBadge, { attrs: { class: 'foo' } })
      const child = wrapper.find('p')

      expect(child.attributes('class')).toBe('foo')
    })
  })
})
