// types/i18n.d.ts
export interface LocaleSchema {
  pages: {
    index: {
      header: string
      description: string
      exampleI18nTitle: string
      exampleI18nArray: {
        key: string
        value: string
      }[]
    }
  }
}
