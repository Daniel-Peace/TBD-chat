// Recommended fix from https://github.com/zed-industries/zed/issues/8336 for TypeScript not recognizing .vue files

declare module '*.vue' {
  import type { DefineComponent } from 'vue'

  const component: DefineComponent<object, object, any>
  export default component
}
