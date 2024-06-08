# Getting Started

First steps:

1. Install Bun globally (I used Homebrew, `$ brew install oven-sh/bun/bun`)
2. Use Bun to automatically install all dependencies with `$ bun install` from the `hello-world/` directory

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

(No need to manually install vue-tsc as it's included in the dependencies file)

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
bun install
```

### Compile and Hot-Reload for Development

```sh
bun run frontend
```

```sh
bun run backend
```

### Type-Check, Compile and Minify for Production

```sh
bun run type-check
```

```sh
bun run frontend-build
```

### Lint with [ESLint](https://eslint.org/), Format with Prettier

```sh
bun run lint
```

```sh
bun run prettier
```

### Run Vitest testing suite

```sh
bun run test
```
