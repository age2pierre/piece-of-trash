// typescript-plugin-css-modules (and other plugins) only works with tsserver but not with tsc
// see https://github.com/Microsoft/TypeScript/issues/16607

declare module '*.module.scss' {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames

  export default classNames
}

declare module '*.module.css' {
  interface ClassNames {
    [className: string]: string
  }
  const classNames: ClassNames

  export default classNames
}
