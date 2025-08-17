<template>
  <div class="page-layout">
    <header class="header">
      <div class="logo">Header</div>
      <nav class="nav">
        <LocaleSwitcher />
      </nav>
    </header>
    <main class="main-content">
      <nav class="left-nav">
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
      <div class="page">
        <slot name="layout-content">Page content goes here</slot>
      </div>
    </main>
    <footer class="footer">Footer</footer>
  </div>
</template>

<script setup lang="ts">
import LocaleSwitcher from "~/components/locale-switcher/LocaleSwitcher.vue"
</script>

<style lang="css">
.page-layout {
  display: flex;
  flex-direction: column;
  min-height: 100svh;

  .header {
    /* background-color: light-dark(#f0f0f0, #333); */
    display: flex;
    gap: 24px;
    align-items: center;
    padding: 10px;
    justify-content: space-between;

    .nav {
      ul {
        display: flex;
        gap: 16px;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
          a {
            text-decoration: none;
            color: var(--color-text);
            font-size: var(--step-4);
            transition: color 0.3s;

            &:hover {
              color: var(--color-primary);
            }
          }
        }
      }
    }
  }

  .main-content {
    background-color: var(--color-background);
    padding: 20px;

    @media (width >= 768px) {
      flex: 1;
      display: flex;
      gap: 20px;
    }

    .left-nav {
      width: 200px;
      /* background-color: light-dark(#e0e0e0, #444); */
      padding: 10px;
      min-height: 100px;
      position: relative;

      .text {
        display: flex;
        outline: 1px solid black;
        justify-self: end;
      }
    }
    .page {
      flex: 1;
      justify-items: start;
    }
  }

  .footer {
    text-align: center;
    padding: 10px;
    /* background-color: light-dark(#f0f0f0, #333); */
  }
}
</style>
