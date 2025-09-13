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

export interface SectionMarkdownI18nContent {
  title?: string
  content: string[] | { list: string[] }
}

export interface SectionMarkdownI18nData {
  sectionTitle: string
  sectionLink: string
  section?: SectionMarkdownI18nContent[]
}

export interface SectionMarkdwnI18nNav {
  sectionTitle: string
  sectionLink: string
}
