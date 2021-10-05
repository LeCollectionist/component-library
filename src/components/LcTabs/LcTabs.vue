<template>
  <div :class="['lc-tabs-container', {'lc-tabs-container--sidecontent': isSideContent }]">
    <ul class="lc-tabs-navigation" role="tablist">
      <li
        v-for="(tab, i) of tabs"
        :key="i"
        :aria-selected="active === i"
        :aria-controls="`panel-${i}`"
        :class="['lc-tabs-link', {'lc-tabs-link--active': active === i}]"
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

<script lang="ts">
import { ComponentInternalInstance, computed, defineComponent, provide, ref } from 'vue'

export default defineComponent({
  name: 'LcTabs',
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit, slots }) {
    const active = computed(() => props.modelValue)
    const tabs = ref<ComponentInternalInstance[]>([])

    const isSideContent = computed(() => {
      return Boolean(slots.sideContent) ?? null
    })

    function selectTab(tab: number) {
      emit('update:modelValue', tab)
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
