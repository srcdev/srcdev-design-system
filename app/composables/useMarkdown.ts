import MarkdownIt from "markdown-it"

const md = new MarkdownIt({
  html: false, // disable raw HTML for extra safety
  linkify: true, // auto-detect URLs
  breaks: true, // line breaks to <br>
})

export function useMarkdown() {
  const renderMarkdown = (text: string): string => {
    return md.renderInline(text) // renderInline for single lines, md.render for blocks
  }

  return { renderMarkdown }
}
