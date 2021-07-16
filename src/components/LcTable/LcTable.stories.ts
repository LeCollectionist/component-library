import LcTable from './LcTable'

export default {
  title: 'Example/LcTable',
  component: LcTable,
}

const Template = (args: any) => ({
  components: { LcTable },
  setup() {
    return { args }
  },
  template: '<lc-table v-bind="args"/>',
})

export const Base = Template.bind({}) as any
Base.args = {
  headers: [
    {
      key: 'name',
      value: 'Nom',
    },
    {
      key: 'status',
      value: 'Statut',
    },
    {
      key: 'actions',
      value: 'Actions',
    },
  ],
  body: [
    {
      id: 1,
      name: { name: 'Le Figaro' },
      status: { name: 'Published' },
      actions: [
        {
          key: 'download',
          iconSize: 'sm',
          iconName: 'download',
          method: 'download',
        },
      ],
    },
    {
      id: 2,
      name: { name: 'Le Figaro' },
      status: { name: 'Published' },
      actions: [
        {
          key: 'download',
          iconSize: 'sm',
          iconName: 'download',
          method: 'download',
        },
      ],
    },
    {
      id: 3,
      name: { name: 'Le Figaro' },
      status: { name: 'Published' },
      actions: [
        {
          key: 'download',
          iconSize: 'sm',
          iconName: 'download',
          method: 'download',
        },
      ],
    },
  ],
}
