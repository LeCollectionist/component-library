<template>
  <div class="lc-tabs-container">
    <ul class="lc-tabs-navigation" role="tablist">
      <li
        v-for="(tab, i) of tabs"
        :key="i"
        :aria-selected="active === i"
        :aria-controls="`panel-${i}`"
        :class="['lc-tabs-links', {'lc-tabs-links--active': active === i}]"
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
  setup(props, { emit }) {
    const active = computed(() => props.modelValue)
    const tabs = ref<ComponentInternalInstance[]>([])

    function selectTab(tab: number) {
      emit('update:modelValue', tab)
    }

    provide('tabsState', {
      active,
      tabs,
    })

    return {
      tabs,
      active,
      selectTab,
    }
  },
})
</script>

<style>
.lc-tabs-container {
  @apply flex items-center border-gray-400 pb-4;
}
@screen lg {
  .lc-tabs-container {
    @apply items-end border-b;
  }
}

.lc-tabs-navigation {
  @apply h-full flex-1 flex flex-col gap-x-8;
}

@screen lg {
  .lc-tabs-navigation {
    @apply flex-row;
  }
}

.lc-tabs-links {
  @apply relative text-gray-500 font-medium cursor-pointer hover:text-active transition duration-300 ease-in-out;
}

.lc-tabs-links--active {
  @apply text-active;
}

@screen lg {
  .lc-tabs-links--active:after {
    content: '';
      @apply absolute h-0.5 left-0 -bottom-4 w-full bg-active;
  }
}

.lc-tabs-tabpanel {
  @apply mt-6;
}
</style>
