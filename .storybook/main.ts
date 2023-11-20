module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/*.css",
  ],

  "addons": [
    "@storybook/addon-a11y",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-mdx-gfm"
  ],

  "framework": {
    name: "@storybook/vue3-vite",
    options: {}
  },

  "features": {
    "storyStoreV7": false
  },

  docs: {
    autodocs: true
  }
}
