# Everything we learned

This document will be a place to put anything we learn in the development process, for future reference.

First steps:

1. Install Bun globally (I used Homebrew, `$ brew install oven-sh/bun/bun`)
2. Use Bun to automatically install all dependencies with `$ bun install` from the `hello-world/` directory

## Node files

Package.json, package-lock.json, and node_modules/ are all used for the Node.js configuration. (They are also used by other JavaScript runtimes/package managers, such as Yarn and Bun)

Package.json is the project settings for node, including:

- dependencies
- scripts that can be activated with `$ npm run [script_name]` or `$ bun run [script_name]`

node_modules stores the actual dependency binaries and can be .gitignored and rebuilt from package.json

`package-lock.json` is an npm file that lists the actual versions of the dependencies used. I've removed it because Bun uses a binary-encoded file called `bun.lockb` instead.
To view Bun's lockfile use `$ bun bun.lockb`

### Why Bun?

I'm using Bun because:

1. Bun is faster than Node
2. Bun is nice for [auto-reloading files](https://bun.sh/docs/runtime/hot) when the dev server is running
3. Bun can directly execute TypeScript files without compiling to JavaScript first

## Other root-folder settings files

`.eslintrc.cjs` is used for the linter, `.prettierrc.json` and `.prettierignore` are used for the formatter, and `tsconfig.json` and `tsconfig.node.json` are used for TypeScript.

## Typescript

Typescript is just JavaScript with Type Annotations included for statically type-checking code. It's a lot nicer to work with for debugging and catching errors than plain JavaScript, which is dynamically typed.

### Debugging Typescript

In VSCode, if Typescript is giving strange errors such as "Not Found", open up the editor commands with `cmd-shift-p` and select "Restart typescript server" (Must be in a .ts file at the time). I've noticed this fixes the problem 95% of the time.

## Adding pages with Vue

To create a new page,

- add a component file to the `/views` folder
- include that component in the router with a URL path
- Add a link to the URL in the App.vue component (or wherever you want to have a hypertext link).
