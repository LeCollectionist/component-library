<script lang="ts">
import type { ComponentInternalInstance } from 'vue'
import { computed, defineComponent, provide, ref } from 'vue'

export default defineComponent({
  name: 'LcTabs',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:model-value'],
  setup(props, { emit, slots }) {
    const active = computed(() => props.modelValue)
    const tabs = ref<ComponentInternalInstance[]>([])

    const isSideContent = computed(() => {
      return Boolean(slots.sideContent)
    })

    function selectTab(tab: number) {
      emit('update:model-value', tab)
    }

    provide('tabsState', {
      active,
      tabs,
    })

    return {
      active,
      isSideContent,
      selectTab,
      tabs,
    }
  },
})
</script>

<template>
  <div
    :class="{ 'lc-tabs-container--sidecontent': isSideContent }"
    class="lc-tabs-container"
    data-testid="lc-tabs-container"
  >
    <ul class="lc-tabs-navigation" role="tablist">
      <li
        v-for="(tab, i) of tabs"
        :key="i"
        :aria-controls="`panel-${i}`"
        :aria-selected="active === i"
        :class="{ 'lc-tabs-link--active': active === i }"
        class="lc-tabs-link"
        data-testid="lc-tabs-link"
        role="tab"
        tabindex="0"
        @click="selectTab(i)"
      >
        {{ tab.props.title }}
      </li>
    </ul>
    <slot name="sideContent" />
  </div>
  <div class="lc-tabs-tabpanel">
    <slot />
  </div>
</template>

<style>
.lc-tabs-container {
  @apply flex border-gray-400 pb-4;
}

.lc-tabs-container--sidecontent {
  @apply flex-col-reverse;
}

@screen lg {
  .lc-tabs-container {
    @apply items-end border-b;
  }
  .lc-tabs-container--sidecontent {
    @apply flex-row;
  }
}

.lc-tabs-navigation {
  @apply h-full flex-1 flex gap-x-8;
}

.lc-tabs-link {
  @apply relative text-gray-500 font-medium cursor-pointer hover:text-active transition duration-300 ease-in-out;
}

.lc-tabs-link--active {
  @apply text-active;
}

.lc-tabs-link--active:after {
  content: '';
  @apply absolute h-0.5 left-0 -bottom-4 w-full bg-active;
}

.lc-tabs-tabpanel {
  @apply mt-6;
}
</style>
