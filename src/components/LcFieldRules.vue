<template>
  <div class="text-sm mt-1 ml-2 w-full text-gray-500">
    <p
      class="m-0"
    >
      <template v-if="showRules">
        {{ rulesText(rules) }}
      </template>
      <template v-if="detailText">
        {{ detailText }}
      </template>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcInput',
  props: {
    detailText: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    showRules: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    rulesText(rules: string): string {
      const splitedRules = rules.split('|')
      let key = ''
      const text = {} as Text

      splitedRules.forEach((splitedRule) => {
        if (splitedRule.includes('length')) {
          const decomposeRule = splitedRule.split(':')

          key = decomposeRule[0]
          text[decomposeRule[0]] = decomposeRule[1]
        }

        if (splitedRule.includes('min') || splitedRule.includes('max')) {
          const decomposeRule = splitedRule.split(':')

          key = decomposeRule[0]

          if (rules.includes('min') && rules.includes('max'))
            key = 'minMax'

          text[decomposeRule[0]] = decomposeRule[1]
        }
      })

      return `rulesText.${key}`
      // return this.$i18n.t(`rulesText.${key}`, text)
    },
  },
})
</script>
