import { useI18n } from "vue-i18n"

/**
 * Safely retrieves raw locale data with full type safety
 * @param path - Dot-separated path to the locale data (e.g., 'pages.index.exampleI18nArray')
 * @returns Typed locale data or null if not found
 *
 * @example
 * interface User { id: string; name: string; }
 * const users = useRawLocaleDataV1<User[]>("data.users")
 */
export function useRawLocaleDataV1<T = unknown>(path: string): T | null {
  const { locale, getLocaleMessage } = useI18n()

  // 1. Try to get the raw message object
  const rawMessages = getLocaleMessage(locale.value)

  if (!rawMessages || Object.keys(rawMessages).length === 0) {
    console.warn(`[useRawLocaleDataV1] No locale messages found for ${locale.value}`)
    return null
  }

  // 2. Resolve deep path
  const segments = path.split(".")
  let current: unknown = rawMessages

  for (const key of segments) {
    if (typeof current !== "object" || current === null || !(key in current)) {
      console.warn(`[useRawLocaleDataV1] Path not found: ${path}`)
      return null
    }
    current = (current as Record<string, unknown>)[key]
  }

  // 3. If it's an AST node (with .body or .static), normalize
  if (Array.isArray(current)) {
    return current.map((item) => normalizeNode(item)) as T
  }

  return normalizeNode(current) as T
}

/**
 * Reactive version that updates when locale changes
 * @param path - Dot-separated path to the locale data
 * @returns Reactive ref containing the typed locale data
 */
export function useReactiveRawLocaleData<T = unknown>(path: string) {
  return computed(() => {
    return useRawLocaleDataV1<T>(path)
  })
}

function normalizeNode(node: unknown): unknown {
  if (node == null) return node

  // If plain string, return it
  if (typeof node === "string") return node

  // If plain number or boolean, return it
  if (typeof node === "number" || typeof node === "boolean") return node

  // If it's an AST object (vue-i18n compiled)
  if (typeof node === "object" && node !== null && "body" in node) {
    const astNode = node as { body?: { static?: unknown } }
    if (astNode.body?.static !== undefined) {
      return astNode.body.static
    }
  }

  // If object with nested AST properties, normalize recursively
  if (typeof node === "object" && node !== null) {
    if (Array.isArray(node)) {
      return node.map((item) => normalizeNode(item))
    }

    const result: Record<string, unknown> = {}
    const obj = node as Record<string, unknown>
    for (const key in obj) {
      result[key] = normalizeNode(obj[key])
    }
    return result
  }

  return node
}
