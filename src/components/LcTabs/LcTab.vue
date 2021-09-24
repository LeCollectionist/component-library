<template>
  <div v-if="isActive">
    <slot />
  </div>
</template>

<script lang="ts">
import {
  ComponentInternalInstance,
  Ref,
  computed,
  defineComponent,
  getCurrentInstance,
  inject,
  watchEffect,
} from 'vue'

interface TabsState {
  tabs: Ref<ComponentInternalInstance[]>
  active: Ref<number>
}

export default defineComponent({
  name: 'Tab',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  setup() {
    const instance = getCurrentInstance() as ComponentInternalInstance
    const { tabs, active } = inject('tabsState') as TabsState

    const index = computed(() => tabs.value.findIndex((target: ComponentInternalInstance) => target.uid === instance.uid))
    const isActive = computed(() => index.value === active.value)

    watchEffect(() => {
      if (index.value === -1)
        tabs.value.push(instance)
    })

    return {
      isActive,
    }
  },
})
</script>
