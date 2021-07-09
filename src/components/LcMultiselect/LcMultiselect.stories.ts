import { action } from '@storybook/addon-actions'

import LcMultiselect from './LcMultiselect'

export default {
  title: 'Example/LcMultiselect',
  component: LcMultiselect,
}

const Template = (args: any) => ({
  components: { LcMultiselect },
  setup() {
    return { args }
  },
  template: `<lc-multiselect
    v-bind="args"
    @clear="onClear"
    @change="onChange"
    @select="onSelect"
    @deselect="onDeselect"
    @open="onOpen"
    @close="onClose"
  />`,
  methods: {
    onClear: action('onClear'),
    onChange: action('onChange'),
    onSelect: action('onSelect'),
    onDeselect: action('onDeselect'),
    onOpen: action('onOpen'),
    onClose: action('onClose'),
  },
})

export const Default = Template.bind({}) as any
Default.args = {
  labelText: 'Pays',
  name: 'country',
  options: ['France', 'Indonésie', 'Espagne'],
}

export const DefaultValue = Template.bind({}) as any
DefaultValue.args = {
  ...Default.args,
  modelValue: 'Indonésie',
}

export const Placeholder = Template.bind({}) as any
Placeholder.args = {
  ...Default.args,
  placeholder: 'Choisir un pays',
}

export const Searchable = Template.bind({}) as any
Searchable.args = {
  ...Default.args,
  searchable: true,
}

export const ObjectOptions = Template.bind({}) as any
ObjectOptions.args = {
  ...Searchable.args,
  options: [
    { value: 'FR', label: 'France' }, { value: 'ID', label: 'Indonésie' }, { value: 'ES', label: 'Espagne' }],
}

export const ObjectOptionsKeyCustom = Template.bind({}) as any
ObjectOptionsKeyCustom.args = {
  ...Searchable.args,
  valueProp: 'iso',
  options: [
    { iso: 'FR', label: 'France' }, { iso: 'ID', label: 'Indonésie' }, { iso: 'ES', label: 'Espagne' }],
}

export const DisabledOption = Template.bind({}) as any
DisabledOption.args = {
  ...Searchable.args,
  options: [
    { value: 'FR', label: 'France' }, { value: 'ID', label: 'Indonésie', disabled: true }, { value: 'ES', label: 'Espagne' }],
}

export const Tag = Template.bind({}) as any
Tag.args = {
  ...ObjectOptions.args,
  mode: 'tags',
  modelValue: ['FR', 'ID'],
  options: [
    { value: 'FR', label: 'France' }, { value: 'ID', label: 'Indonésie' }, { value: 'ES', label: 'Espagne' }],
}
