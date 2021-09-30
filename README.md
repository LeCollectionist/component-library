# Lc Component Library

This repo provides a basic setup for developing component libraries in Vite with Vue 3 typescript and TailwindCss

## Features

- Create a component library using Vue3 Vite and typescript
- Tailwind CSS
- Automatically export and register all components in `./src/components`

## Components

- [x] LcBadge
- [x] LcButton
- [x] LcIcon
- [x] LcModal
- [x] LcPagination
- [x] LcTab
- [x] LcTable
- [x] LcTabs
- [x] LcTooltip

## Commands

```bash
yarn dev # Will run the demos app so you can see your components
yarn build # Will build your components into a library and generate types
```

## Publish on NPM

### Generate build

Upgrade version package :

- Patch releases: 1.0 or 1.0.x or ~1.0.4
- Minor releases: 1 or 1.x or ^1.0.4
- Major releases: \* or x

```
$ yarn build
```

### Logged on NPM

```bash
$ npm login // Entrer your email + mdp
```

### Publish on NPM

Push on NPM when the branch is merged on master :

```bash
$ npm publish
```
