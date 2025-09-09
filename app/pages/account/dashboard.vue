<template>
  <div>
    <NuxtLayout name="default">
      <template #layout-content>
        <LayoutRow tag="div" variant="popout" :style-class-passthrough="['mb-24']">
          <h1 class="page-heading-1">Dashboard</h1>
          <p class="page-body-normal">Welcome to your protected dashboard!</p>
          <div v-if="loggedIn">
            <p>Your data:</p>
            <pre>{{ user }}</pre>
            <button @click="clear">Logout</button>
          </div>
        </LayoutRow>
      </template>
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const { loggedIn, user, clear } = useUserSession()

definePageMeta({
  layout: false,
  middleware: "auth",
})

useHead({
  title: "Dashboard",
  meta: [{ name: "description", content: "Your protected dashboard" }],
})
</script>

<style lang="css"></style>
