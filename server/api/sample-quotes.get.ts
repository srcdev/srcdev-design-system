import type { IQuote } from "../../types/types.quotes"

export default cachedEventHandler(
  async () => {
    const quotesResponse = await $fetch<{ quotes: IQuote[]; total: number; skip: number; limit: number }>(
      "https://dummyjson.com/quotes"
    )

    return {
      timestamp: new Date().toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }),
      quotes: quotesResponse.quotes,
      total: quotesResponse.total,
      skip: quotesResponse.skip,
      limit: quotesResponse.limit,
    }
  },
  {
    maxAge: 1,
    swr: true, // optional: stale-while-revalidate
  }
)
