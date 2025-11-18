export default cachedEventHandler(
  async () => {
    const quotes = await $fetch("https://dummyjson.com/quotes")

    return {
      timestamp: new Date().toISOString(), // or new Date().toISOString()
      quotes,
    }
  },
  {
    maxAge: 0,
    swr: true, // optional: stale-while-revalidate
  }
)
