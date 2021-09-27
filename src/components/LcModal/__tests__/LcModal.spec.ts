import { mount } from '@vue/test-utils'
import LcModal from '../LcModal'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcModal', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcModal, {
      props: { modelValue: true },
    })

    expect(wrapper.vm).toBeTruthy()
  })

  describe('Close button', () => {
    beforeEach(() => {
      wrapper = mount({
        data() {
          return { open: true }
        },
        template: '<lc-modal v-model="open" />',
        components: { LcModal },
      })
    })

    it('should have close button', () => {
      const closeButton = wrapper.find('[data-testid="lc-modal__close"]')

      expect(closeButton.exists()).toBeTruthy()
    })

    it('shouldn\'t have close button', async() => {
      await wrapper.setProps({ disableCloseModal: true })
      const closeButton = wrapper.find('[data-testid="lc-modal__close"]')

      expect(closeButton.exists()).toBeFalsy()
    })

    it('should close modal when click button', async() => {
      const closeButton = wrapper.find('[data-testid="lc-modal__close"]')
      const modalBefore = wrapper.find('[data-testid="lc-modal"]')

      expect(wrapper.vm.open).toBe(true)
      expect(modalBefore.exists()).toBeTruthy()
      expect(document.body.style.overflow).toBe('hidden')

      await closeButton.trigger('click')

      const modalAfter = wrapper.find('[data-testid="lc-modal"]')

      expect(wrapper.vm.open).toBe(false)
      expect(modalAfter.exists()).toBeFalsy()
      expect(document.body.style.overflow).toBe('auto')
    })

    it('should close modal when click shadow', async() => {
      const shadow = wrapper.find('[data-testid="lc-modal__shadow"]')
      const modalBefore = wrapper.find('[data-testid="lc-modal"]')

      expect(wrapper.vm.open).toBe(true)
      expect(modalBefore.exists()).toBeTruthy()
      expect(document.body.style.overflow).toBe('hidden')

      await shadow.trigger('click')

      const modalAfter = wrapper.find('[data-testid="lc-modal"]')

      expect(wrapper.vm.open).toBe(false)
      expect(modalAfter.exists()).toBeFalsy()
      expect(document.body.style.overflow).toBe('auto')
    })
  })

  describe('Header + Footer', () => {
    beforeEach(() => {
      wrapper = mount(LcModal, {
        props: { modelValue: true },
      })
    })

    it('should have header and footer', () => {
      const header = wrapper.find('[data-testid="lc-modal__header"]')
      const footer = wrapper.find('[data-testid="lc-modal__footer"]')

      expect(header.exists()).toBeTruthy()
      expect(footer.exists()).toBeTruthy()
    })

    it('should have header and not footer', async() => {
      await wrapper.setProps({ noFooter: true })

      const header = wrapper.find('[data-testid="lc-modal__header"]')
      const footer = wrapper.find('[data-testid="lc-modal__footer"]')

      expect(header.exists()).toBeTruthy()
      expect(footer.exists()).toBeFalsy()
    })

    it('should have footer and not header', async() => {
      await wrapper.setProps({ noHeader: true })

      const header = wrapper.find('[data-testid="lc-modal__header"]')
      const footer = wrapper.find('[data-testid="lc-modal__footer"]')

      expect(header.exists()).toBeFalsy()
      expect(footer.exists()).toBeTruthy()
    })

    it('shouldn\'t have header and footer', async() => {
      await wrapper.setProps({ noHeader: true, noFooter: true })

      const header = wrapper.find('[data-testid="lc-modal__header"]')
      const footer = wrapper.find('[data-testid="lc-modal__footer"]')

      expect(header.exists()).toBeFalsy()
      expect(footer.exists()).toBeFalsy()
    })
  })

  describe('Title', () => {
    beforeEach(() => {
      wrapper = mount(LcModal, {
        props: { modelValue: true },
      })
    })

    it('should have title', async() => {
      const title = 'My title'
      await wrapper.setProps({ title })

      const titleWrapper = wrapper.get('[data-testid="lc-modal__header--title"]')

      expect(titleWrapper.text()).toBe(title)
    })

    it('shouldn\'t have title', async() => {
      const titleWrapper = wrapper.get('[data-testid="lc-modal__header--title"]')

      expect(titleWrapper.text()).toBe('')
    })
  })

  describe('Multiple modals', () => {
    it('should render correct style document', async() => {
      wrapper = mount(LcModal, {
        props: { modelValue: true },
      })

      // simulate watch
      await wrapper.setProps({ multipleModals: true })

      expect(document.body.style.overflow).toBe('hidden')

      // simulate watch
      await wrapper.setProps({ multipleModals: false })

      expect(document.body.style.overflow).toBe('auto')
    })
  })
})
