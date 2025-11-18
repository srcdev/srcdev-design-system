<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :styleClassPassthrough="['mbe-20']">
          <h1 class="page-heading-3">Masonry Grid Ordered</h1>
          <p class="page-body-normal">Masonry grid ordered displaying dummy posts data</p>
        </LayoutRow>

        <LayoutRow tag="div" variant="popout" :styleClassPassthrough="['mbe-20']">
          <h2 class="page-heading-4 pb-6">API Result cache duration: 2 mins (swr cache)</h2>
          <h3 class="page-heading-5 pb-6">
            How
            <code>swr: true</code>
            Works
          </h3>

          <h3 class="page-heading-5 pb-6">Cache exists but expired</h3>
          <ul>
            <li>The old cached response is served immediately to the client (“stale” data).</li>
            <li>In the background, Nitro fetches fresh data from your API/external source.</li>
            <li>Once the new data arrives, the cache is updated for the next request.</li>
          </ul>

          <h3 class="page-heading-5 pb-6">Cache exists and not expired</h3>
          <ul>
            <li>The cached response is served immediately (same as normal caching).</li>
          </ul>

          <h3 class="page-heading-5 pb-6">No cache</h3>
          <ul>
            <li>First request fetches data normally and stores it in cache.</li>
          </ul>
          <p class="page-body-bold">Timestamp: {{ quotesData?.timestamp }}</p>
          <MasonryGridOrdered
            v-if="status === 'success'"
            :gridData="quotesData?.quotes.slice(0, displayCount) ?? <IQuotes>{}"
            :gap="12"
            :min-tile-width="300"
            :fixed-width="useFixedWidth"
            :styleClassPassthrough="['mi-auto']"
          >
            <template v-for="(item, index) in quotesData?.quotes.slice(0, displayCount)" v-slot:[item.id]>
              <div class="p-10 border border-1 border-grey-dark border-r-4">
                <p class="text-normal wght-700">{{ index + 1 }}: {{ item.author }}</p>
                <p class="text-normal">{{ item.quote }}</p>
              </div>
            </template>
          </MasonryGridOrdered>
          <p v-else class="page-body-normal">&hellip;Loading</p>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { IQuotes } from "~~/types/types.quotes"
// import type { MediaCanvas } from "@/types/types.canvasName"

definePageMeta({
  layout: false,
})

useHead({
  title: "Masonry Grid Ordered",
  meta: [{ name: "description", content: "Masonry Grid Ordered" }],
  bodyAttrs: {
    class: "",
  },
})
// const canvasName = ref<MediaCanvas>("desktopCanvas")

const useFixedWidth = true
const displayCount = 12
const { data: quotesData, status } = await useFetch<IQuotes>("/api/sample-quotes")
</script>

<style lang="css"></style>
