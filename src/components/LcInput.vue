<template>
  <div>
    <slot name="label">
      <label
        v-if="label"
        :for="$attrs.id || name"
      >
        {{ label }}
      </label>
    </slot>

    <div
      class="w-full"
      :class="{'grid grid-cols-12': hasSlotPrepend || hasSlotAppend}"
    >
      <slot name="prepend" />

      <input
        :id="$attrs.id || name"
        :ref="name"
        v-bind="$attrs"
        :value="modelValue"
        :class="computedClass"
        :name="name"
        :placeholder="placeholder"
        @input="updateValue"
        @change="updateValue"
        @blur="focusOut"
      >

      <slot name="append" />
    </div>

    <!-- <lc-errors :errors="errors" /> -->

    <lc-field-rules
      v-if="rulesText || detailText"
      :detail-text="detailText"
      :rules="rules"
      :show-rules="rulesText"
    />

    <slot
      name="content"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LcInput',
  inheritAttrs: false,
  props: {
    detailText: {
      type: String,
      default: '',
    },
    appendClass: {
      type: String,
      default: '',
    },
    noBorder: {
      type: Boolean,
      default: false,
    },
    inputClass: {
      type: String,
      default: 'w-full mb-4',
    },
    label: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: '',
    },
    rules: {
      type: String,
      default: '',
    },
    rulesText: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    vid: {
      type: String,
      default: '',
    },
    vname: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue', 'focus-out'],
  computed: {
    hasSlotPrepend(): any {
      return this.$slots?.prepend && this.$slots?.prepend.length > 0
    },
    hasSlotAppend(): any {
      return this.$slots?.append && this.$slots?.append.length > 0
    },
    computedClass(): any {
      return [
        'base-input--input block bg-clip-padding w-full text-gray-700 font-normal text-base leading-normal py-1.5 px-4 bg-white focus:text-gray-700 focus:bg-white focus:border-input-focus focus:shadow-focus',
        { 'border border-gray-400 rounded-sm': !this.noBorder },
        { 'bg-gray-300 pointer-events-none text-gray-500': this.$attrs.disabled },
        // { 'border-red': this.errors?.length },
        {
          'border-l-0 rounded-l-none border border-gray-400': this
            .hasSlotPrepend,
        },
        {
          'border-r-0 rounded-r-none border border-gray-400': this.hasSlotAppend,
        },
        this.appendClass,
      ]
    },
  },
  methods: {
    focusOut() {
      this.$emit('focus-out')
    },
    updateValue(event: Event) {
      this.$emit('update:modelValue', event.target.value)
    },
  },
})
</script>

<style scoped>
.base-input--input {
  height: 51px;
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}
.base-input--input[disabled=disabled] {
  -webkit-text-fill-color: #aaaaaa;
}
.base-input--input:focus {
  outline: 0;
}
</style>
