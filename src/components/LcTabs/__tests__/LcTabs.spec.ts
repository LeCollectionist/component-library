/* eslint-disable @typescript-eslint/no-explicit-any */
import { h } from 'vue'
import { mount } from '@vue/test-utils'

import LcTabs from '../LcTabs'

let wrapper: any = {}

beforeEach(() => {
  wrapper = mount(LcTabs, {
    slots: {
      default: h('div',
        Array.from({ length: 4 }).map((_, idx) => {
          return h('p', { title: `title ${idx}` }, `content ${idx}`)
        }),
      ),
    },
    props: { modelValue: 0 },
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('LcTabs.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('is should render slots tab panels', () => {
    const tabPanels = wrapper.findAll('p')
    expect(tabPanels.length).toEqual(4)
  })
})
