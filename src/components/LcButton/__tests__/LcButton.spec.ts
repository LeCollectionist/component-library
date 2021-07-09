import { mount } from '@vue/test-utils'
import LcButton from '../LcButton'
import { vColor, vFontWeight, vSize, vVariant } from '../../../validators/LcButton'

let wrapper: any

afterEach(() => {
  wrapper?.unmount()
})

describe('LcButton', () => {
  it('is a Vue instance', () => {
    wrapper = mount(LcButton)
    expect(wrapper.vm).toBeTruthy()
  })

  it('should be a loader button', () => {
    wrapper = mount(LcButton, { props: { loader: true } })

    const loader = wrapper.get('[data-testid="lc-btn-loader"]')

    expect(wrapper.html()).toMatchSnapshot()
    expect(loader.exists()).toBeTruthy()
  })

  it('should be a block button', () => {
    wrapper = mount(LcButton, { props: { block: true } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes('lc-btn--block')).toBeTruthy()
  })

  it('should be a blockFull button', () => {
    wrapper = mount(LcButton, { props: { blockFull: true } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes('lc-btn--block-full')).toBeTruthy()
  })

  it('should be a hasIcon button', () => {
    wrapper = mount(LcButton, { props: { hasIcon: true } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes('lc-btn--has-icon')).toBeTruthy()
  })

  describe('Colors', () => {
    it('should accept valid color props', () => {
      const validator = LcButton.props.color.validator

      vColor.forEach((color: string) => expect(validator(color)).toBeTruthy())
      expect(validator('blue')).toBeFalsy()
    })

    describe('Btn', () => {
      beforeEach(() => {
        wrapper = mount(LcButton)
      })

      it('must have a primary color as default', () => {
        expect(wrapper.classes('lc-btn--primary')).toBeTruthy()
      })

      const colors = ['secondary', 'light', 'white', 'grey', 'black']
      colors.forEach((color) => {
        it(`should have a ${color} class color`, async() => {
          await wrapper.setProps({ color })

          expect(wrapper.classes(`lc-btn--${color}`)).toBeTruthy()
        })
      })

      it('should have a disabled class color', async() => {
        await wrapper.setProps({ disabled: true })

        expect(wrapper.classes('lc-btn--disabled')).toBeTruthy()
        expect(wrapper.classes('lc-btn--primary')).toBeFalsy()
      })
    })

    describe('Link', () => {
      beforeEach(() => {
        wrapper = mount(LcButton, { props: { variant: 'link' } })
      })

      it('must have a primary color as default', () => {
        expect(wrapper.classes('lc-link--primary')).toBeTruthy()
      })

      const colors = ['primary-light', 'secondary', 'grey', 'black', 'white']
      colors.forEach((color) => {
        it(`should have a ${color} class color`, async() => {
          await wrapper.setProps({ color })

          expect(wrapper.classes(`lc-link--${color}`)).toBeTruthy()
        })
      })

      it('should have a disabled class color', async() => {
        await wrapper.setProps({ disabled: true })

        expect(wrapper.classes('lc-link--disabled')).toBeTruthy()
        expect(wrapper.classes('lc-link--primary')).toBeFalsy()
      })
    })

    describe('Outline', () => {
      beforeEach(() => {
        wrapper = mount(LcButton, { props: { variant: 'outline' } })
      })

      it('must have a primary color as default', () => {
        expect(wrapper.classes('lc-outline--primary')).toBeTruthy()
      })

      const colors = ['secondary', 'grey']
      colors.forEach((color) => {
        it(`should have a ${color} class color`, async() => {
          await wrapper.setProps({ color })

          expect(wrapper.classes(`lc-outline--${color}`)).toBeTruthy()
        })
      })

      it('should have a disabled class color', async() => {
        await wrapper.setProps({ disabled: true })

        expect(wrapper.classes('lc-outline--disabled')).toBeTruthy()
        expect(wrapper.classes('lc-outline--primary')).toBeFalsy()
      })
    })
  })

  describe('FontWeight', () => {
    it('should accept valid font-weight props', () => {
      const validator = LcButton.props.fontWeight.validator

      vFontWeight.forEach(weight => expect(validator(weight)).toBeTruthy())
      expect(validator('font-semibold')).toBeFalsy()
    })

    describe('Global', () => {
      beforeEach(() => {
        wrapper = mount(LcButton)
      })

      it('should have a font-bold class as default', () => {
        expect(wrapper.classes('lc-btn--font-bold')).toBeTruthy()
      })

      const fontWeights = ['font-normal', 'font-medium']
      fontWeights.forEach((fontWeight) => {
        it(`should have a ${fontWeight} class`, async() => {
          await wrapper.setProps({ fontWeight })

          expect(wrapper.classes(`lc-btn--${fontWeight}`)).toBeTruthy()
        })
      })
    })
  })

  describe('Variant button', () => {
    it('should accept valid variant props', () => {
      const validator = LcButton.props.variant.validator

      vVariant.forEach(variant => expect(validator(variant)).toBeTruthy())
      expect(validator('outline-link')).toBeFalsy()
    })

    it('should be a variant link', () => {
      wrapper = mount(LcButton, { props: { variant: 'link' } })

      expect(wrapper.classes('lc-btn')).toBeFalsy()
      expect(wrapper.classes('lc-outline')).toBeFalsy()
      expect(wrapper.classes('lc-link')).toBeTruthy()
    })

    it('should be a variant outline', () => {
      wrapper = mount(LcButton, { props: { variant: 'outline' } })

      expect(wrapper.classes('lc-btn')).toBeFalsy()
      expect(wrapper.classes('lc-link')).toBeFalsy()
      expect(wrapper.classes('lc-outline')).toBeTruthy()
    })
  })

  describe('Sizes', () => {
    it('should accept valid sizes props', () => {
      const validator = LcButton.props.size.validator

      vSize.forEach(size => expect(validator(size)).toBeTruthy())
      expect(validator('xxl')).toBeFalsy()
    })

    describe('Global', () => {
      beforeEach(() => {
        wrapper = mount(LcButton)
      })

      it('should have a md class as default', () => {
        expect(wrapper.classes('lc-btn--md')).toBeTruthy()
      })

      const sizes = ['xs', 'sm', 'lg', 'xl']
      sizes.forEach((size) => {
        it(`should have a ${size} class`, async() => {
          await wrapper.setProps({ size })

          expect(wrapper.classes(`lc-btn--${size}`)).toBeTruthy()
        })
      })
    })
  })

  describe('Click on button', () => {
    it('should be clickable', async() => {
      wrapper = mount(LcButton)

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('shouldn\'t be clickable', async() => {
      wrapper = mount(LcButton, { props: { disabled: true } })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Html tag', () => {
    it('must be a <nuxt-link></nuxt-link>', () => {
      const wrapperNuxtLink = mount(LcButton, { attrs: { to: '/' } })

      expect(wrapperNuxtLink.html()).toMatchSnapshot()
    })

    it('must be a <a></a>', () => {
      const wrapperA = mount(LcButton, { attrs: { href: '/' } })

      expect(wrapperA.html()).toMatchSnapshot()
    })
  })

  describe('Type', () => {
    it('must be a type submit', () => {
      const wrapperTypeSubmit = mount(LcButton, { attrs: { type: 'submit' } })

      expect(wrapperTypeSubmit.attributes('type')).toBe('submit')
    })

    it('must be a type button', () => {
      const wrapperTypeButton = mount(LcButton)

      expect(wrapperTypeButton.attributes('type')).toBe('button')
    })

    describe('Link', () => {
      it('must be a button without attribute type', () => {
        const wrapperLink = mount(LcButton, { attrs: { href: '/' } })

        expect(wrapperLink.attributes('type')).toBeFalsy()
      })

      it('must be a button without attribute type', () => {
        const wrapperNuxtLink = mount(LcButton, { attrs: { to: '/' } })

        expect(wrapperNuxtLink.attributes('type')).toBeFalsy()
      })
    })
  })
})
