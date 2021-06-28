import { mount } from '@vue/test-utils'
import LcButton from '../LcButton.vue'
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

  it('Should be a loader button', () => {
    wrapper = mount(LcButton, { props: { loader: true } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('Should be a block button', () => {
    wrapper = mount(LcButton, { props: { block: true } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes('lc-btn--block')).toBeTruthy()
  })

  it('Should be a blockFull button', () => {
    wrapper = mount(LcButton, { props: { blockFull: true } })

    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes('lc-btn--block-full')).toBeTruthy()
  })

  it('Should be a hasIcon button', () => {
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

      it('Must have a primary color as default', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Should have a secondary class color', async() => {
        await wrapper.setProps({ color: 'secondary' })

        expect(wrapper.classes('lc-btn--secondary')).toBeTruthy()
      })

      it('Should have a light class color', async() => {
        await wrapper.setProps({ color: 'light' })

        expect(wrapper.classes('lc-btn--light')).toBeTruthy()
      })

      it('Should have a white class color', async() => {
        await wrapper.setProps({ color: 'white' })

        expect(wrapper.classes('lc-btn--white')).toBeTruthy()
      })

      it('Should have a grey class color', async() => {
        await wrapper.setProps({ color: 'grey' })

        expect(wrapper.classes('lc-btn--grey')).toBeTruthy()
      })

      it('Should have a black class color', async() => {
        await wrapper.setProps({ color: 'black' })

        expect(wrapper.classes('lc-btn--black')).toBeTruthy()
      })

      it('Should have a disabled class color', async() => {
        await wrapper.setProps({ disabled: true })

        expect(wrapper.classes('lc-btn--disabled')).toBeTruthy()
        expect(wrapper.classes('lc-btn--primary')).toBeFalsy()
      })
    })

    describe('Link', () => {
      beforeEach(() => {
        wrapper = mount(LcButton, { props: { variant: 'link' } })
      })

      it('Must have a primary color as default', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Should have a primary-light class color', async() => {
        await wrapper.setProps({ color: 'primary-light' })

        expect(wrapper.classes('lc-link--primary-light')).toBeTruthy()
      })

      it('Should have a secondary class color', async() => {
        await wrapper.setProps({ color: 'secondary' })

        expect(wrapper.classes('lc-link--secondary')).toBeTruthy()
      })

      it('Should have a grey class color', async() => {
        await wrapper.setProps({ color: 'grey' })

        expect(wrapper.classes('lc-link--grey')).toBeTruthy()
      })

      it('Should have a black class color', async() => {
        await wrapper.setProps({ color: 'black' })

        expect(wrapper.classes('lc-link--black')).toBeTruthy()
      })

      it('Should have a white class color', async() => {
        await wrapper.setProps({ color: 'white' })

        expect(wrapper.classes('lc-link--white')).toBeTruthy()
      })

      it('Should have a disabled class color', async() => {
        await wrapper.setProps({ disabled: true })

        expect(wrapper.classes('lc-link--disabled')).toBeTruthy()
        expect(wrapper.classes('lc-link--primary')).toBeFalsy()
      })
    })

    describe('Outline', () => {
      beforeEach(() => {
        wrapper = mount(LcButton, { props: { variant: 'outline' } })
      })

      it('Must have a primary color as default', () => {
        expect(wrapper.html()).toMatchSnapshot()
      })

      it('Should have a secondary class color', async() => {
        await wrapper.setProps({ color: 'secondary' })

        expect(wrapper.classes('lc-outline--secondary')).toBeTruthy()
      })

      it('Should have a grey class color', async() => {
        await wrapper.setProps({ color: 'grey' })

        expect(wrapper.classes('lc-outline--grey')).toBeTruthy()
      })

      it('Should have a disabled class color', async() => {
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

      it('Should have a font-bold class as default', () => {
        expect(wrapper.classes('lc-btn--font-bold')).toBeTruthy()
      })

      it('Should have a font-normal class', async() => {
        await wrapper.setProps({ fontWeight: 'font-normal' })

        expect(wrapper.classes('lc-btn--font-normal')).toBeTruthy()
      })

      it('Should have a font-medium class', async() => {
        await wrapper.setProps({ fontWeight: 'font-medium' })

        expect(wrapper.classes('lc-btn--font-medium')).toBeTruthy()
      })
    })
  })

  describe('Variant button', () => {
    it('Should accept valid variant props', () => {
      const validator = LcButton.props.variant.validator

      vVariant.forEach(variant => expect(validator(variant)).toBeTruthy())
      expect(validator('outline-link')).toBeFalsy()
    })

    it('Should be a variant link', () => {
      wrapper = mount(LcButton, { props: { variant: 'link' } })

      expect(wrapper.classes('lc-btn')).toBeFalsy()
      expect(wrapper.classes('lc-outline')).toBeFalsy()
      expect(wrapper.classes('lc-link')).toBeTruthy()
    })

    it('Should be a variant outline', () => {
      wrapper = mount(LcButton, { props: { variant: 'outline' } })
      // await wrapper.setProps({ variant: 'outline' })

      expect(wrapper.classes('lc-btn')).toBeFalsy()
      expect(wrapper.classes('lc-link')).toBeFalsy()
      expect(wrapper.classes('lc-outline')).toBeTruthy()
    })
  })

  describe('Sizes', () => {
    it('Should accept valid sizes props', () => {
      const validator = LcButton.props.size.validator

      vSize.forEach(size => expect(validator(size)).toBeTruthy())
      expect(validator('xxl')).toBeFalsy()
    })

    describe('Global', () => {
      beforeEach(() => {
        wrapper = mount(LcButton)
      })

      it('Should have a xs class size', async() => {
        await wrapper.setProps({ size: 'xs' })

        expect(wrapper.classes('lc-btn--xs')).toBeTruthy()
      })

      it('Should have a sm class size', async() => {
        await wrapper.setProps({ size: 'sm' })

        expect(wrapper.classes('lc-btn--sm')).toBeTruthy()
      })

      it('Should have a md class size', async() => {
        await wrapper.setProps({ size: 'md' })

        expect(wrapper.classes('lc-btn--md')).toBeTruthy()
      })

      it('Should have a lg class size', async() => {
        await wrapper.setProps({ size: 'lg' })

        expect(wrapper.classes('lc-btn--lg')).toBeTruthy()
      })

      it('Should have a xl class size', async() => {
        await wrapper.setProps({ size: 'xl' })

        expect(wrapper.classes('lc-btn--xl')).toBeTruthy()
      })
    })
  })

  describe('Click on button', () => {
    it('Should be clickable', async() => {
      wrapper = mount(LcButton)

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('Shouldn\'t be clickable', async() => {
      wrapper = mount(LcButton, { props: { disabled: true } })

      await wrapper.trigger('click')

      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('Html tag', () => {
    it('Must be a <nuxt-link></nuxt-link>', () => {
      const wrapperNuxtLink = mount(LcButton, { attrs: { to: '/' } })

      expect(wrapperNuxtLink.html()).toMatchSnapshot()
    })

    it('Must be a <a></a>', () => {
      const wrapperA = mount(LcButton, { attrs: { href: '/' } })

      expect(wrapperA.html()).toMatchSnapshot()
    })
  })

  describe('Type', () => {
    it('Must be a type submit', () => {
      const wrapperTypeSubmit = mount(LcButton, { attrs: { type: 'submit' } })

      expect(wrapperTypeSubmit.attributes('type')).toBe('submit')
    })

    it('Must be a type button', () => {
      const wrapperTypeButton = mount(LcButton)

      expect(wrapperTypeButton.attributes('type')).toBe('button')
    })

    describe('Link', () => {
      it('Must be a none button', () => {
        const wrapperLink = mount(LcButton, { attrs: { href: '/' } })

        expect(wrapperLink.attributes('type')).toBeFalsy()
      })

      it('Must be a none button', () => {
        const wrapperNuxtLink = mount(LcButton, { attrs: { to: '/' } })

        expect(wrapperNuxtLink.attributes('type')).toBeFalsy()
      })
    })
  })
})
