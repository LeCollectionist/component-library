/* eslint-disable @typescript-eslint/no-explicit-any */

import { mount } from '@vue/test-utils'

import LcCount from '../LcCount'

let wrapper: any = {}

beforeEach(() => {
  wrapper = mount(LcCount, { props: { totalCount: 6 } })
})

afterEach(() => {
  wrapper.unmount()
})

describe('LcCount.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should not show counts with no count', async() => {
    await wrapper.setProps({ nbCount: 0 })
    const countElt = wrapper.find('[data-testid="lc-count"]')

    expect(countElt.exists()).toBeFalsy()
  })

  it('should not show counts with equality', async() => {
    await wrapper.setProps({ nbCount: 6 })
    const countElt = wrapper.find('[data-testid="lc-count"]')

    expect(countElt.exists()).toBeFalsy()
  })

  it('should show the number of count', async() => {
    await wrapper.setProps({ nbCount: 5 })
    const countElt = wrapper.find('[data-testid="lc-count"]')

    expect(countElt.text()).toBe('5/6')
  })
})
