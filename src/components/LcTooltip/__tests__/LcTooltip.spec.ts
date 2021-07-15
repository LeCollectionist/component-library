import { mount } from '@vue/test-utils'
import LcTooltip from '../LcTooltip'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcTooltip', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcTooltip)
    expect(wrapper.vm).toBeTruthy()
  })

  describe('Props format', () => {
    it('should have a clickable props (default: false)', () => {
      const { clickable } = LcTooltip.props

      expect(clickable.default).toBe(false)
      expect(clickable.required).toBeFalsy()
      expect(clickable.type).toBe(Boolean)
    })

    it('should have a position props (defaul: top)', () => {
      const { position } = LcTooltip.props
      const validPosition = ['top', 'left', 'right', 'bottom']

      expect(position.default).toBe('top')
      expect(position.type).toBe(String)
      validPosition.forEach(pos => expect(position.validator(pos)).toBeTruthy())
      expect(position.validator('upper')).toBeFalsy()
    })
  })

  describe('Slots', () => {
    it('should render an element which should have the tooltip', () => {
      const buttonEl = '<button>Click to see tooltip!</button>'

      wrapper = mount(LcTooltip, {
        slots: { element: buttonEl },
      })

      expect(wrapper.html()).toContain(buttonEl)
      expect(wrapper.html()).toMatchSnapshot()
    })

    it('should display some text in the tooltip', () => {
      const buttonEl = '<button>Click to see tooltip!</button>'
      const tooltipMessage = 'Hi! I\'m the tooltip message.'

      wrapper = mount(LcTooltip, {
        props: { show: true },
        slots: {
          element: buttonEl,
          text: tooltipMessage,
        },
      })

      expect(wrapper.html()).toContain(tooltipMessage)
      expect(wrapper.html()).toMatchSnapshot()
    })
  })

  describe('Position', () => {
    it('should be at the top if position=top', () => {
      wrapper = mount(LcTooltip, {
        props: { show: true },
        slots: { text: 'Hello' },
      })

      const tooltip = wrapper.get('[data-testid="tooltip"]')

      expect(tooltip.classes('lc_tooltip-content--top')).toBeTruthy()
    })

    it('should be on the left if position=left', () => {
      wrapper = mount(LcTooltip, {
        props: { position: 'left', show: true },
        slots: { text: 'Hello' },
      })

      const tooltip = wrapper.get('[data-testid="tooltip"]')

      expect(tooltip.classes('lc_tooltip-content--left')).toBeTruthy()
    })
  })

  describe('If tooltip is clickable', () => {
    beforeEach(() => {
      wrapper = mount(LcTooltip, {
        props: { show: true, clickable: true },
        slots: { text: 'Tooltip text' },
      })
    })

    it('should appear on click', async() => {
      expect(wrapper.classes('lc_tooltip--appear')).toBeFalsy()

      await wrapper.trigger('click')
      expect(wrapper.classes('lc_tooltip--appear')).toBeTruthy()
    })

    it('should hide when close button is clicked', async() => {
      await wrapper.trigger('click')
      expect(wrapper.classes('lc_tooltip--appear')).toBeTruthy()

      const closeIcon = wrapper.get('[data-testid="tooltip__close"]')

      await closeIcon.trigger('click')
      expect(wrapper.classes('lc_tooltip--appear')).toBeFalsy()
    })
  })
})
