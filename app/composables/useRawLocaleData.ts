import { useI18n } from "vue-i18n"

export function useRawLocaleData<T = unknown>(path: string): T | null {
  const { locale, getLocaleMessage } = useI18n()

  // 1. Try to get the raw message object
  const rawMessages = getLocaleMessage(locale.value)

  if (!rawMessages || Object.keys(rawMessages).length === 0) {
    console.warn(`[useRawLocaleData] No locale messages found for ${locale.value}`)
    return null
  }

  // 2. Resolve deep path
  const segments = path.split(".")
  let current: any = rawMessages

  for (const key of segments) {
    if (current[key] === undefined) {
      console.warn(`[useRawLocaleData] Path not found: ${path}`)
      return null
    }
    current = current[key]
  }

  // 3. If it's an AST node (with .body or .static), normalize
  if (Array.isArray(current)) {
    return current.map((item) => normalizeNode(item)) as T
  }

  return normalizeNode(current) as T
}

function normalizeNode(node: any): any {
  if (node == null) return node

  // If plain string, return it
  if (typeof node === "string") return node

  // If it's an AST object (vue-i18n compiled)
  if (node.body?.static) return node.body.static

  // If object with nested AST properties, normalize recursively
  if (typeof node === "object") {
    const result: any = {}
    for (const key in node) {
      result[key] = normalizeNode(node[key])
    }
    return result
  }

  return node
}
