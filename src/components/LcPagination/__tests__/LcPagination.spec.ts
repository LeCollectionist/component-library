import { mount } from '@vue/test-utils'
import LcPagination from '../LcPagination'

let wrapper: any

beforeEach(() => {
  wrapper = mount(LcPagination)
})

afterEach(() => {
  wrapper?.unmount()
})

describe('LcPagination', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  describe('PaginateArr', () => {
    describe('Has 3 pages', () => {
      beforeEach(async () => {
        await wrapper.setProps({ nbPages: 3 })
      })

      it('should return 2 empty cases at the start', () => {
        expect(wrapper.vm.paginateArr).toEqual([0, 0, 1, 2, 3])
      })

      it('should return 2 empty cases, at start and at end', async () => {
        await wrapper.setProps({ modelValue: 2 })

        expect(wrapper.vm.paginateArr).toEqual([0, 1, 2, 3, 0])
      })

      it('should return 2 empty cases at the end', async () => {
        await wrapper.setProps({ modelValue: 3 })

        expect(wrapper.vm.paginateArr).toEqual([1, 2, 3, 0, 0])
      })
    })

    describe('Has 10 pages', () => {
      beforeEach(async () => {
        await wrapper.setProps({ nbPages: 10 })
      })

      it('should return [0, 0, 1, \'...\', 10]', () => {
        expect(wrapper.vm.paginateArr).toEqual([0, 0, 1, '...', 10])
      })

      it('should return [0, 1, 2, \'...\', 10]', async () => {
        await wrapper.setProps({ modelValue: 2 })

        expect(wrapper.vm.paginateArr).toEqual([0, 1, 2, '...', 10])
      })

      it('should return [1, 2, 3, \'...\', 10]', async () => {
        await wrapper.setProps({ modelValue: 3 })

        expect(wrapper.vm.paginateArr).toEqual([1, 2, 3, '...', 10])
      })

      it('should return [1, \'...\', 4, \'...\', 10]', async () => {
        await wrapper.setProps({ modelValue: 4 })

        expect(wrapper.vm.paginateArr).toEqual([1, '...', 4, '...', 10])
      })

      it('should return [1, \'...\', 8, 9, 10]', async () => {
        await wrapper.setProps({ modelValue: 8 })

        expect(wrapper.vm.paginateArr).toEqual([1, '...', 8, 9, 10])
      })

      it('should return [1, \'...\', 9, 10, 0]', async () => {
        await wrapper.setProps({ modelValue: 9 })

        expect(wrapper.vm.paginateArr).toEqual([1, '...', 9, 10, 0])
      })

      it('should return [1, \'...\', 10, 0, 0]', async () => {
        await wrapper.setProps({ modelValue: 10 })

        expect(wrapper.vm.paginateArr).toEqual([1, '...', 10, 0, 0])
      })
    })
  })

  describe('Click on next page', () => {
    it('should be clickable', async () => {
      await wrapper.setProps({ nbPages: 3 })
      const nextButton = wrapper.find('[data-testid="nextPage"]')
      await nextButton.trigger('click')

      expect(wrapper.emitted('update:model-value')).toBeTruthy()
      expect(wrapper.emitted('update:model-value')[0]).toEqual([2])
    })

    it('shouldn\'t be clickable', async () => {
      await wrapper.setProps({ nbPages: 2, modelValue: 2 })
      const nextButton = wrapper.find('[data-testid="nextPage"]')
      await nextButton.trigger('click')

      expect(wrapper.emitted('update:model-value')).toBeFalsy()
    })
  })

  describe('Click on prev page', () => {
    it('should be clickable', async () => {
      await wrapper.setProps({ nbPages: 3, modelValue: 2 })
      const prevButton = wrapper.find('[data-testid="prevPage"]')
      await prevButton.trigger('click')

      expect(wrapper.emitted('update:model-value')).toBeTruthy()
      expect(wrapper.emitted('update:model-value')[0]).toEqual([1])
    })

    it('shouldn\'t be clickable', async () => {
      await wrapper.setProps({ nbPages: 2 })
      const prevButton = wrapper.find('[data-testid="prevPage"]')
      await prevButton.trigger('click')

      expect(wrapper.emitted('update:model-value')).toBeFalsy()
    })
  })

  describe('Click on number page 2', () => {
    it('should be clickable', async () => {
      await wrapper.setProps({ nbPages: 3 })
      const numberPages = wrapper.findAll('[data-testid="numberPage"]')
      await numberPages[1].trigger('click')

      expect(wrapper.emitted('update:model-value')).toBeTruthy()
      expect(wrapper.emitted('update:model-value')[0]).toEqual([2])
    })
  })
})
