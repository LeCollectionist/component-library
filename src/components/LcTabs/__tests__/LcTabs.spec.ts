/* eslint-disable @typescript-eslint/no-explicit-any */
import { mount } from '@vue/test-utils'

import LcTabs from '../LcTabs'
import LcTab from '../LcTab'

let wrapper: any = {}

beforeEach(() => {
  wrapper = mount({
    data() {
      return { active: 0 }
    },
    template: `
    <lc-tabs v-model="active" >
      <lc-tab title="Tab A">
      Content A
      </lc-tab>
      <lc-tab title="Tab B">
      Content B
      </lc-tab>
      <lc-tab title="Tab C">
      Content C
      </lc-tab>
    </lc-tabs>`,
    components: { LcTabs, LcTab },
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('LcTabs.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('is should render the right number of tab-links', () => {
    const tabLinks = wrapper.findAll('[data-testid="lc-tabs-link"]')
    expect(tabLinks.length).toEqual(3)
  })

  it('is should set the right active class on link', async() => {
    const tabLinks = wrapper.findAll('[data-testid="lc-tabs-link"]')
    expect(tabLinks[0].classes('lc-tabs-link--active')).toBeTruthy()
  })

  it('is should render the right active tab', async() => {
    await wrapper.setData({ active: 2 })
    const tabActive = wrapper.find('[data-testid="lc-tab-tabpanel"]')
    expect(tabActive.text()).toBe('Content C')
  })
})
