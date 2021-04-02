<template>
  <form
    :id="idForm"
    :ref="`form-${group}`"
    :class="{'flex flex-wrap': columnMode}"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div
      v-for="field in fields"
      :key="field.attr.name"
      :class="baseFormClass(field)"
    >
      <template v-if="!editionMode && !field.hidden">
        <strong>{{ field.attr.label }} : </strong>
        {{ showText(field) }}
      </template>
      <template v-else>
        <lc-input
          v-if="field.inputType === 'input' && !field.hidden"
          v-model="field.model"
          :class="{'flex-wrap': field.rulesText}"
          :detail-text="field.detailText"
          :append-class="field.attr && field.attr.class"
          :rules-text="field.rulesText"
          class="flex items-start"
          v-bind="field.attr"
        >
          <template #content>
            <lc-button
              v-if="field.showAddMoreBtn && !field.hidden && siblingInputIsHidden(field)"
              class="relative border-0 top-3 left-3 base__form-btn"
              color="light"
              size="xs"
              type="button"
              @click="toggleField(field)"
            >
              <lc-icon
                :name="toggleIcon[field.attr.name] ? 'delete' : 'add'"
                size="sm"
              />
            </lc-button>
          </template>
        </lc-input>
      </template>
    </div>

    <slot name="before-submit-button" />

    <div
      v-if="editionMode"
      :class="computedContainerButtonClass"
    >
      <lc-button
        :disabled="disabledButton"
        block-full
        class="form__submit"
        name="submit"
        type="submit"
        v-bind="buttonPrimary.attrs"
      >
        <span>{{ buttonPrimary.text }}</span>
        <lc-icon
          v-if="Boolean(buttonPrimary.attrs && buttonPrimary.attrs.hasIcon)"
          v-bind="buttonPrimary.iconAttrs"
        />
      </lc-button>
      <!-- <lc-errors :errors="errors" /> -->

      <lc-button
        v-if="buttonSecondary"
        class="order-1 mr-0 md:mr-6"
        type="button"
        v-bind="buttonSecondary.attrs"
        @click="onCancel"
      >
        {{ buttonSecondary.text }}
      </lc-button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'LcForm',
  props: {
    activeErrorScrollTo: {
      type: Boolean,
      default: true,
    },
    activeOffsetScrollTo: {
      type: Number,
      default: -10,
    },
    buttonPrimary: {
      type: Object,
      default: null,
    },
    buttonSecondary: {
      type: Object,
      default: null,
    },
    columnMode: {
      type: Boolean,
      default: false,
    },
    containerButtonClass: {
      type: String,
      default: '',
    },
    disabledButton: {
      type: Boolean,
      default: false,
    },
    editionMode: {
      type: Boolean,
      default: false,
    },
    fields: {
      type: Array,
      default: () => [],
    },
    group: {
      type: String,
      default: '',
    },
    hiddenFieldsName: {
      type: Array,
      default: () => [],
    },
    idForm: {
      type: String,
      required: true,
    },
    titleList: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['on-submit', 'on-cancel'],
  data() {
    return {
      oldFields: [],
    }
  },
  computed: {
    computedContainerButtonClass() {
      return [
        'flex flex-col justify-end base__form-wrap-button md:flex-row w-full',
        this.containerButtonClass,
      ]
    },
    toggleIcon() {
      const obj = {}

      this.fields
        .filter(field => this.hiddenFieldsName.includes(field.attr.name))
        .forEach((field) => {
          if (!field.hidden) obj[field.attr.name] = true
        })

      return obj
    },
  },
  watch: {
    editionMode(newVal) {
      if (newVal) {
        // Only way to copy an array without mutation
        this.oldFields = JSON.parse(JSON.stringify(this.fields))
      }
    },
  },
  methods: {
    siblingInputIsHidden(field) {
      if (this.hiddenFieldsName.length > 0) {
        const siblingField = this.fields.find(
          f =>
            f.type === field.type && this.hiddenFieldsName.includes(f.attr.name),
        )

        if (
          (!siblingField?.hidden
            && this.hiddenFieldsName.includes(field.attr.name))
          || siblingField?.hidden
        )
          return true
      }

      return false
    },
    baseFormClass(field) {
      if (this.editionMode && field.inputClass)
        return `${field.inputClass}`

      return ''
    },
    toggleField(field) {
      const hasHiddenField = this.fields.some(
        f => f.type === field.type && f.hidden,
      )
      const hasVisibleField = this.fields.some(
        f => f.type === field.type && f.hidden === false,
      )

      if (hasHiddenField) {
        this.$set(
          this.fields.find(f => f.type === field.type && f.hidden),
          'hidden',
          false,
        )
      }
      else if (hasVisibleField) {
        this.$set(
          this.fields.find(f => f.type === field.type && f.hidden === false),
          'hidden',
          true,
        )
        this.$set(
          this.fields.find(f => f.type === field.type && f.hidden),
          'model',
          '',
        )
      }
    },
    onCancel() {
      this.$emit('on-cancel', this.group, this.oldFields)
    },
    showText(text) {
      if (text.inputType == 'select')
        return text.model ? text.model.text : '/'

      if (text.inputType === 'file')
        return text.model.split('/').pop() || '/'

      return text.model || '/'
    },
    async onSubmit() {
      // let isFrontValid = await this.$refs.observer.validate()
      const isFrontValid = false

      // Erreur à gérer avec VeeValidate
      // if (!isFrontValid && this.activeErrorScrollTo) {
      //   const errors = Object.fromEntries(
      //     Object.entries(this.$refs.observer.errors).filter(
      //       ([_, value]) => value.length > 0,
      //     ),
      //   )
      //   const firstErrorKey = Object.keys(errors)?.[0]

      //   if (firstErrorKey) {
      //     const elementDOM = this.$refs.observer?.$el?.querySelector(
      //       `[data-id="${firstErrorKey}"]`,
      //     )

      //     if (elementDOM) {
      //       this.$scrollTo(elementDOM, {
      //         offset: this.activeOffsetScrollTo,
      //         easing: 'ease',
      //       })
      //     }
      //   }
      // }

      if (isFrontValid) this.$emit('on-submit')
    },
    setDates(dates) {
      this.$refs.calendarProvider[0]?.setErrors([])

      const startDate = dates?.checkIn
        ? this.$dayjs(dates.checkIn).format('YYYY-MM-DD')
        : null
      const endDate = dates?.checkOut
        ? this.$dayjs(dates.checkOut).format('YYYY-MM-DD')
        : null

      this.fields.find(field => field.inputType === 'calendar').model = {
        startDate,
        endDate,
      }
    },
  },
}
</script>

<style>
.base__form-btn {
  margin: 1.5rem 0 0 2px;
}
.base__form-btn:focus {
  box-shadow: none !important;
}
.base__form-btn:hover {
  background-color: transparent;
}
.base__form .base-multiselect {
  @apply z-0;
}
.base__form-rules-text {
  margin-top: -10px;
  @apply text-sm;
}
.form__submit {
  margin-bottom: 1rem;
}
@screen md {
  .form__submit {
    margin-bottom: 0;
  }
}
</style>
