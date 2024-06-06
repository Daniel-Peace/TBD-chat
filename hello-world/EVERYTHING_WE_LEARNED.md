# Everything we learned

This document will be a place to put anything we learn in the development process, for future reference.

## Node files

Package.json, package-lock.json, and node_modules/ are all used for the Node.js configuration.

Package.json is the project settings for node, including:

- dependencies
- scripts that can be activated with `npm run [script_name]`

node_modules stores the actual dependency binaries and can be .gitignored and rebuilt from package.json

package-lock.json lists the actual versions of the dependencies used (I think)

## Other root-folder settings files

`.eslintrc.cjs` is used for the linter, `.prettierrc.json` and `.prettierignore` are used for the formatter, and `tsconfig.json` and `tsconfig.node.json` are used for TypeScript.

## Debugging typescript

In VSCode, if Typescript is giving strange errors such as "Not Found", open up the editor commands with `cmd-shift-p` and select "Restart typescript server". (Must be in a .ts file at the time)

## Adding pages with Vue

To create a new page,

- add a component file to the `/views` folder
- include that component in the router with a URL path
- Add a link to the URL in the App.vue component (or wherever you want to have a hypertext link).
