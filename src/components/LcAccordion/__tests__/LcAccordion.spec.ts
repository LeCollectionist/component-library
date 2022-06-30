import { mount } from '@vue/test-utils'
import LcAccordion from '../LcAccordion'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcAccordion', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcAccordion)
    expect(wrapper.vm).toBeTruthy()
  })

  describe('Default behavior', () => {
    beforeEach(() => {
      wrapper = mount(LcAccordion)
    })

    it('should render title', async () => {
      await wrapper.setProps({ title: 'My title' })

      const title = wrapper.find('[data-testid="lc-accordion-header-title"]')

      expect(title.exists()).toBeTruthy()
      expect(title.text()).toBe('My title')
    })

    it('shouldn\'t render title', () => {
      const title = wrapper.find('[data-testid="lc-accordion-header-title"]')

      expect(title.exists()).toBeFalsy()
    })

    it('should body is hide', async () => {
      await wrapper.setProps({ modelValue: false })

      const body = wrapper.find('[data-testid="lc-accordion-body"]')
      expect(body.isVisible()).toBe(false)
    })

    it('should body is visible', () => {
      const body = wrapper.find('[data-testid="lc-accordion-body"]')
      expect(body.isVisible()).toBe(true)
    })

    it('should set bodypadding class on body-wrapper', () => {
      const bodyWrapper = wrapper.find('[data-testid="lc-accordion-body"] > div')
      expect(bodyWrapper.classes()).toContain('lc-accordion-body-wrapper--withpadding')
    })

    it('should not set bodypadding class on body-wrapper', async () => {
      await wrapper.setProps({ hasBodyPadding: false })

      const bodyWrapper = wrapper.find('[data-testid="lc-accordion-body"] > div')
      expect(bodyWrapper.classes()).not.toContain('lc-accordion-body-wrapper--withpadding')
    })
  })

  describe('Toggle button', () => {
    it('shouldn\'t render button toggle', () => {
      wrapper = mount(LcAccordion)

      const button = wrapper.find('[data-testid="lc-accordion-header-toggle-button"]')

      expect(button.exists()).toBeFalsy()
    })

    it('should render button toggle', () => {
      wrapper = mount(LcAccordion, {
        props: { haveToggle: true },
      })

      const button = wrapper.find('[data-testid="lc-accordion-header-toggle-button"]')

      expect(button.exists()).toBeTruthy()
    })

    it('should emit update:modelValue with value false', async () => {
      wrapper = mount(LcAccordion, {
        props: { haveToggle: true },
      })

      const button = wrapper.find('[data-testid="lc-accordion-header-toggle-button"]')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([false])
    })

    it('should emit update:modelValue with value true', async () => {
      wrapper = mount(LcAccordion, {
        props: { haveToggle: true, modelValue: false },
      })

      const button = wrapper.find('[data-testid="lc-accordion-header-toggle-button"]')
      await button.trigger('click')

      expect(wrapper.emitted('update:modelValue')).toBeTruthy()
      expect(wrapper.emitted('update:modelValue')[0]).toStrictEqual([true])
    })

    it('should render body accordion visible then hide', async () => {
      const wrapper = mount({
        data() {
          return { open: true }
        },
        template: '<lc-accordion v-model="open" :have-toggle="true" />',
        components: { LcAccordion },
      })

      const lcAccordion = wrapper.findComponent(LcAccordion)
      const bodyBeforeClick = lcAccordion.find('[data-testid="lc-accordion-body"]')

      const button = wrapper.find('[data-testid="lc-accordion-header-toggle-button"]')
      await button.trigger('click')
      const bodyAfterClick = lcAccordion.find('[data-testid="lc-accordion-body"]')

      expect(bodyBeforeClick.isVisible()).toBe(true)
      expect(bodyAfterClick.isVisible()).toBe(false)
    })

    it('should render body accordion hide then visible', async () => {
      const wrapper = mount({
        data() {
          return { open: false }
        },
        template: '<lc-accordion v-model="open" :have-toggle="true" />',
        components: { LcAccordion },
      })

      const lcAccordion = wrapper.findComponent(LcAccordion)
      const bodyBeforeClick = lcAccordion.find('[data-testid="lc-accordion-body"]')

      const button = wrapper.find('[data-testid="lc-accordion-header-toggle-button"]')
      await button.trigger('click')
      const bodyAfterClick = lcAccordion.find('[data-testid="lc-accordion-body"]')

      expect(bodyBeforeClick.isVisible()).toBe(false)
      expect(bodyAfterClick.isVisible()).toBe(true)
    })
  })

  describe('Before slot', () => {
    beforeEach(() => {
      wrapper = mount(LcAccordion, {
        slots: { 'content-before': '<button data-testid="button-before-slot">test</button>' },
      })
    })

    it('should render content before slot', () => {
      const contentSlot = wrapper.find('[data-testid="button-before-slot"]')
      expect(contentSlot.exists()).toBeTruthy()
    })

    it('should render HTML header with before slot', () => {
      const header = wrapper.find('[data-testid="lc-accordion-header"]')

      expect(header.html()).toMatchSnapshot()
    })

    it('should render HTML header with button toogle + befor slot', async () => {
      await wrapper.setProps({ haveToggle: true })

      const header = wrapper.find('[data-testid="lc-accordion-header"]')
      expect(header.html()).toMatchSnapshot()
    })
  })

  describe('After slot', () => {
    beforeEach(() => {
      wrapper = mount(LcAccordion, {
        slots: { 'content-after': '<button data-testid="button-after-slot">test</button>' },
      })
    })

    it('should render content after slot', () => {
      const contentSlot = wrapper.find('[data-testid="button-after-slot"]')
      expect(contentSlot.exists()).toBeTruthy()
    })

    it('should render HTML header with after slot', () => {
      const header = wrapper.find('[data-testid="lc-accordion-header"]')

      expect(header.html()).toMatchSnapshot()
    })

    it('should render HTML header with button toogle + after slot', async () => {
      await wrapper.setProps({ haveToggle: true })

      const header = wrapper.find('[data-testid="lc-accordion-header"]')
      expect(header.html()).toMatchSnapshot()
    })
  })

  describe('Without slots', () => {
    beforeEach(() => {
      wrapper = mount(LcAccordion, {
        props: { title: 'My title' },
      })
    })

    it('should render HTML header (only title)', async () => {
      const header = wrapper.find('[data-testid="lc-accordion-header"]')

      expect(header.html()).toMatchSnapshot()
    })

    it('should render HTML header with button toggle', async () => {
      await wrapper.setProps({ haveToggle: true })

      const header = wrapper.find('[data-testid="lc-accordion-header"]')

      expect(header.html()).toMatchSnapshot()
    })
  })
})
