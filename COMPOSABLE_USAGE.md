# useI18nArray Composable

A flexible composable for handling i18n array data dynamically in your Nuxt.js application.

## Features

- **Type-safe**: Full TypeScript support with generic types
- **Flexible**: Can handle any i18n array structure with custom transform functions
- **Reactive**: Returns reactive data that updates when locale changes
- **Helper functions**: Includes pre-built functions for common use cases

## Usage Examples

### Basic Key-Value Pairs (useI18nKeyValueArray)

For simple key-value structures in your i18n files:

```json
// i18n/locales/en-GB.json
{
  "pages": {
    "index": {
      "exampleI18nArray": [
        { "key": "example.value", "value": "Example Value" },
        { "key": "example.value2", "value": "Example Value 2" }
      ]
    }
  }
}
```

```vue
<script setup>
interface KeyValuePair {
  key: string
  value: string
}

const { data: exampleData } = useI18nKeyValueArray("pages.index.exampleI18nArray")
// Returns: [{ key: "example.value", value: "Example Value" }, ...]
</script>
```

### Custom Interface with Transform Function

For more complex data structures:

```json
// i18n/locales/en-GB.json
{
  "products": {
    "featured": [
      {
        "name": "Product 1",
        "price": 29.99,
        "category": "Electronics"
      },
      {
        "name": "Product 2",
        "price": 19.99,
        "category": "Books"
      }
    ]
  }
}
```

```vue
<script setup>
interface Product {
  id: string
  name: string
  price: number
  category: string
  isDiscounted: boolean
}

const { data: products } = useTypedI18nArray<Product>(
  "products.featured",
  (item, index) => ({
    id: `product-${index}`,
    name: String(item.name || ''),
    price: Number(item.price || 0),
    category: String(item.category || ''),
    isDiscounted: Number(item.price || 0) < 25
  })
)
</script>
```

### Using the Generic useI18nArray

For maximum flexibility:

```vue
<script setup>
// Without transform (uses default behavior)
const { data: rawData } = useI18nArray("pages.index.exampleI18nArray")

// With custom transform
const { data: customData } = useI18nArray("pages.index.exampleI18nArray", (item, index) => ({
  index,
  displayText: `${item.key}: ${item.value}`,
  timestamp: new Date().toISOString(),
}))

// You can also access the refresh method
const { data, refresh } = useI18nArray("some.i18n.key")
// Call refresh() if you need to manually trigger a reactivity update
</script>
```

### Handling Nested Structures

The composable automatically handles nested structures with `body.static` pattern:

```json
// i18n/locales/en-GB.json
{
  "complex": {
    "data": [
      {
        "title": {
          "body": {
            "static": "Complex Title"
          }
        },
        "description": {
          "body": {
            "static": "Complex Description"
          }
        }
      }
    ]
  }
}
```

```vue
<script setup>
// This will automatically extract the nested values
const { data } = useI18nArray("complex.data")
// Returns: [{ title: "Complex Title", description: "Complex Description" }]
</script>
```

## API Reference

### useI18nArray<T>(i18nKey, transform?)

The main composable function.

**Parameters:**

- `i18nKey: string` - The i18n key to retrieve array data from
- `transform?: (item, index) => T` - Optional transform function

**Returns:**

- `data: ComputedRef<T[]>` - Reactive array of transformed data
- `refresh: () => T[]` - Function to manually refresh the data

### useI18nKeyValueArray(i18nKey)

Helper for simple key-value pair structures.

**Parameters:**

- `i18nKey: string` - The i18n key to retrieve array data from

**Returns:**

- `data: ComputedRef<{key: string, value: string}[]>` - Reactive array of key-value pairs
- `refresh: () => {key: string, value: string}[]` - Function to manually refresh the data

### useTypedI18nArray<T>(i18nKey, mapFunction)

Generic typed version with explicit type safety.

**Parameters:**

- `i18nKey: string` - The i18n key to retrieve array data from
- `mapFunction: (item, index) => T` - Function to map raw i18n data to your interface

**Returns:**

- `data: ComputedRef<T[]>` - Reactive array of your typed interface
- `refresh: () => T[]` - Function to manually refresh the data

## Error Handling

The composable gracefully handles:

- Missing i18n keys (returns empty array)
- Invalid data structures (returns empty array)
- Type mismatches (provides sensible defaults)

## Performance

- Uses computed properties for optimal reactivity
- Only re-computes when locale or data changes
- Minimal overhead with efficient type checking
