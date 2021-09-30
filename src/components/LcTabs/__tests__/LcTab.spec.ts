/* eslint-disable @typescript-eslint/no-explicit-any */
import { h, ref } from 'vue'
import { mount } from '@vue/test-utils'

import LcTab from '../LcTab'

let wrapper: any = {}

beforeEach(() => {
  const tabs = ref([])
  const active = ref(0)

  wrapper = mount(LcTab, {
    global: {
      provide: {
        tabsState: { tabs, active },
      },
    },
    slots: {
      default: h('div', 'Content A'),
    },
    props: { title: 'Tab A' },
  })
})

afterEach(() => {
  wrapper.unmount()
})

describe('LcTabs.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.vm).toBeTruthy()
  })

  it('should match with snapshot', async() => {
    const tabPanel = wrapper.find('[data-testid="lc-tab-tabpanel"]')
    expect(tabPanel.html()).toMatchSnapshot()
  })
})
