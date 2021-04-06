import type { Plugin } from 'vue'

import components from './components'

export default components

export const LcComponents: Plugin = {
  install(app) {
    Object.entries(components).forEach(([key, value]: [string, any]) => {
      app.component(key, value)
    })
  },
}

// START_EXPORTS
export { default as LcButton } from './components/LcButton.vue'
export { default as LcForm } from './components/LcForm.vue'
export { default as LcIcon } from './components/LcIcon.vue'
export { default as LcInput } from './components/LcInput.vue'
export { default as LcModal } from './components/LcModal.vue'
export { default as LcTable } from './components/LcTable.vue'
// END_EXPORTS
