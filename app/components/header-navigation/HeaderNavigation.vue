<template>
  <header class="header responsive-header">
    <nav class="home-navigation" aria-label="Home Navigation">
      <SkipLinks>
        <template #homeLink>
          <NuxtLink to="/" class="home-link">
            SRCDEV
            <span>design system</span>
          </NuxtLink>
        </template>
      </SkipLinks>
    </nav>
    <ResponsiveHeader
      :responsive-nav-links="responsiveNavLinks"
      :gap-between-first-and-second-nav="12"
      :style-class-passthrough="['srcdev-design-system-nav']"
      :overflow-details-summary-icons="{
        more: 'gravity-ui:ellipsis',
        burger: 'gravity-ui:bars',
      }"
      :collapse-at-main-nav-intersection="true"
      :allow-expand-on-gesture="false"
    >
      <template #secondaryNavigation>
        <ul class="secondary-navigation-list">
          <li class="secondary-navigation-item">
            <NuxtLink class="secondary-navigation-link" to="/">
              <Icon name="material-symbols:settings-outline-rounded" class="icon" aria-hidden="true" />
              <span class="sr-only">{{ t("navigation.screenReader.settings") }}</span>
            </NuxtLink>
          </li>
        </ul>
      </template>
    </ResponsiveHeader>
  </header>
</template>

<script setup lang="ts">
import type { ResponsiveHeaderProp } from "srcdev-nuxt-components/app/types/responsiveHeader"

const { t } = useI18n()

const responsiveNavLinksSimple = computed(() => ({
  firstNav: [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.login"), path: "/account/login" },
    { name: t("navigation.dashboard"), path: "/account/dashboard" },
  ],
})) as ComputedRef<ResponsiveHeaderProp>

const responsiveNavLinks = computed(() => ({
  firstNav: [
    {
      name: t("navigation.components"),
      iconName: "material-symbols:widgets",
      childLinksTitle: t("navigation.childLinksTitle.uiComponents"),
      childLinks: [
        { name: "Display Prompt Component", path: "/playground/components/ui/display-prompt" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
        { name: t("navigation.placeholderLink"), path: "/" },
      ],
    },
    {
      name: "Typography",
      iconName: "material-symbols:custom-typography",
      childLinksTitle: "Typography",
      childLinks: [
        { name: "Page Headings", path: "/playground/typography/page-heading" },
        { name: "Page Body", path: "/playground/typography/page-body" },
        { name: "Page Links", path: "/playground/typography/page-link" },
      ],
    },
    { name: t("navigation.about"), path: "/" },
  ],
  secondNav: [
    { name: t("navigation.someOtherLink"), iconName: "material-symbols:widgets", path: "#link-description" },
    {
      name: t("navigation.settings"),
      childLinksTitle: t("navigation.childLinksTitle.settings"),
      childLinks: [{ name: t("pages.settings.locale-switcher.header"), path: "/settings/locale-switcher" }],
    },
    {
      name: t("navigation.account"),
      childLinksTitle: t("navigation.childLinksTitle.manageAccount"),
      childLinks: [
        { name: t("navigation.login"), path: "/account/login" },
        { name: t("navigation.dashboard"), path: "/account/dashboard" },
      ],
    },
  ],
})) as ComputedRef<ResponsiveHeaderProp>
</script>

<style lang="css">
.header {
  width: 100%;

  &.responsive-header {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 24px;
    align-items: center;
    padding-block: 0;
    padding-inline: 24px;
    background-color: #000;

    position: relative;
    z-index: 999999;

    width: 100%;

    .home-link {
      display: flex;
      flex-direction: column;
      text-wrap-mode: nowrap;
      font-size: var(--step-5);
      letter-spacing: 0.2em;
      color: var(--gray-0);
      text-decoration: none;

      span {
        font-size: var(--step-3);
        letter-spacing: initial;
      }

      &:hover {
        border-radius: 0.4rem;
        outline: 2px solid var(--green-8);
        outline-offset: 0.4rem;
      }
    }
  }
}

/* Modifiers for ResposiveHeader  */
.navigation.srcdev-design-system-nav {
  margin: 1.2rem;
  border-radius: 0.8rem;
  background-color: #efefef05;
  border: 1px solid transparent;
  padding-block: 1rem;
  padding-inline: 1.2rem;
  inline-size: 100%;
  max-height: 6.4rem;

  /* max-block-size: 4.2rem; */

  .main-navigation {
    gap: 60px;

    .main-navigation-list {
      &:nth-of-type(1) {
        gap: 30px;
      }

      &:nth-of-type(2) {
        gap: 30px;
      }

      .main-navigation-item {
        width: initial;
        .main-navigation-link {
          color: var(--gray-0);
          text-decoration: none;
          margin-inline-start: 0;
        }

        .main-navigation-details {
          margin-inline-start: 0;

          .has-toggle-icon {
            gap: 6px;
          }

          .main-navigation-details-summary {
            color: var(--gray-0);
          }

          .main-navigation-sub-nav {
            padding: 12px;
            border: 1px solid #efefef75;
            border-radius: 8px;
            background-color: #000;
            translate: 0 12px;

            .main-navigation-sub-nav-list {
              display: grid;
              grid-template-columns: repeat(2, auto);
              gap: 12px;

              .main-navigation-sub-nav-item {
                margin-bottom: 0;

                &:last-child {
                  margin-bottom: 0;
                }

                .main-navigation-sub-nav-link {
                  display: block;
                  text-wrap-mode: nowrap;
                  text-decoration: none;
                  color: var(--gray-0);
                }
              }
            }
          }
        }
      }
    }
  }

  .secondary-navigation {
    gap: 12px;

    .secondary-navigation-list {
      .secondary-navigation-item {
        .secondary-navigation-link {
          font: inherit;
          color: var(--gray-0);

          .icon {
            height: 1.35em;
            width: 1.35em;
          }
        }
      }
    }

    .main-navigation-link {
      color: var(--gray-0);
      .icon {
        height: 1.35em;
        width: 1.35em;
      }
    }

    .overflow-details {
      padding: 0;
      margin: 0;

      .overflow-details-summary {
        --_icon-zoom: 1;
        --_icon-size: 20px;
        --_border-width: 1px;
        --_outline-width: 1px;
        padding-inline: 5px;

        border-radius: 4px;
        border: var(--_border-width) solid #ffffff90;
        outline: var(--_outline-width) solid #ffffff10;
        background-color: var(--gray-8);

        width: 3rem;
        height: 3rem;

        &:hover,
        &:focus-visible {
          --_icon-zoom: 1.2;
          outline: 2px solid var(--green-8);
          outline-offset: 0.3rem;

          .icon {
            scale: 0.9;
          }
        }

        .icon {
          color: var(--gray-0);
          width: 2.6rem;
          height: 2.6rem;
        }
      }

      .overflow-details-nav {
        top: 135%;
        right: 0;
        background-color: #000;
        border: 0.1rem solid #ffffff90;
        border-radius: 8px;
        padding-block: 0;
        margin-block-end: -0.1rem;
        gap: 0.8rem;

        .overflow-navigation-wrapper {
          --overflow-nav-padding-inline: 0.8rem;
          --overflow-nav-items-gap: 0px;
          --overflow-nav-items-padding-block: 0.8rem;
          display: flex;
          flex-direction: column;
          gap: var(--overflow-nav-items-gap);

          .overflow-navigation-list {
            display: none;

            &.visible {
              display: flex;
              flex-direction: column;
              gap: var(--overflow-nav-items-gap);
              min-width: var(--_overflow-navigation-list-min-width, auto);
            }

            .overflow-navigation-item {
              display: none;

              &.visible {
                display: block;
              }

              .overflow-navigation-link {
                text-decoration: none;
                color: inherit;
                padding-block: var(--overflow-nav-items-padding-block);
                padding-inline: var(--overflow-nav-padding-inline);
                display: flex;
                color: var(--gray-0);
                border-bottom: 0.2rem solid #efefef75;

                &:hover {
                  background-color: var(--gray-7);
                  border-color: var(--green-8);
                }
              }

              .overflow-navigation-details {
                &.expanding-panel {
                  margin-block-end: 0;

                  .expanding-panel-details {
                    .expanding-panel-summary {
                      padding-block: var(--overflow-nav-items-padding-block);
                      padding-inline: var(--overflow-nav-padding-inline);
                      gap: 1rem;
                      color: var(--gray-0);
                      border-bottom: 0.2rem solid #efefef75;

                      &:hover {
                        background-color: var(--gray-7);
                        border-color: var(--green-8);
                      }

                      .label-wrapper {
                        .overflow-navigation-text {
                          text-wrap: nowrap;
                        }
                      }
                      .icon-wrapper {
                        padding: 0;
                      }
                    }

                    &[open] {
                      .expanding-panel-summary {
                        border-color: transparent;

                        &:hover {
                          background-color: var(--gray-7);
                          border-color: var(--green-8);
                        }
                      }
                      + .expanding-panel-content {
                        border-bottom: 0.2rem solid #efefef75;
                        .inner {
                          .overflow-navigation-sub-nav-inner {
                            margin-top: var(--overflow-nav-items-gap);
                          }
                        }
                      }
                    }
                  }

                  .expanding-panel-content {
                    border-bottom: 0.2rem solid transparent;

                    .inner {
                      margin-top: 0;

                      .overflow-navigation-sub-nav-inner {
                        margin-top: 0;

                        .overflow-navigation-sub-nav-list {
                          display: flex;
                          flex-direction: column;
                          gap: 2px;

                          .overflow-navigation-sub-nav-item {
                            padding-block: var(--overflow-nav-items-padding-block);
                            padding-inline: var(--overflow-nav-padding-inline);
                            font-size: var(--step-4);
                            color: var(--gray-0);

                            &:hover {
                              background-color: var(--gray-7);
                              border-color: var(--green-8);
                            }
                            .overflow-navigation-sub-nav-link {
                              text-decoration: none;
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
