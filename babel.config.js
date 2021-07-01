module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', { useBuiltIns: 'entry', corejs: '2', targets: { node: 'current' } }],
        ['@babel/preset-typescript', { allExtensions: true }],
      ],
    },
  },
}
