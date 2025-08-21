<template>
  <header class="header responsive-header">
    <ResponsiveHeader
      :responsive-nav-links="responsiveNavLinks"
      :gap-between-first-and-second-nav="12"
      :style-class-passthrough="['srcdev-design-system-nav']"
      :overflow-details-summary-icons="{
        more: 'gravity-ui:ellipsis',
        burger: 'gravity-ui:bars',
      }"
      :collapse-at-main-nav-intersection="false"
      :allow-expand-on-gesture="false"
    />
  </header>
</template>

<script setup lang="ts">
import type { ResponsiveHeaderProp } from "srcdev-nuxt-components/app/types/responsiveHeader"

const { t } = useI18n()

const responsiveNavLinks = computed(() => ({
  firstNav: [
    { name: t("navigation.home"), path: "/" },
    { name: t("navigation.login"), path: "/account/login" },
    { name: t("navigation.dashboard"), path: "/account/dashboard" },
  ],
})) as ComputedRef<ResponsiveHeaderProp>

const responsiveNavLinksOld = computed(() => ({
  firstNav: [
    {
      name: t("navigation.components"),
      iconName: "material-symbols:widgets",
      childLinksTitle: t("navigation.childLinksTitle.uiComponents"),
      childLinks: [{ name: t("navigation.placeholderLink"), path: "/" }],
    },
    {
      name: t("navigation.layouts"),
      iconName: "material-symbols:responsive-layout",
      childLinksTitle: t("navigation.childLinksTitle.uiLayouts"),
      childLinks: [{ name: t("navigation.placeholderLink"), path: "/" }],
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
    padding-block: 12px;
    padding-inline: 24px;
    background-color: #000;

    position: relative;
    z-index: 999999;

    width: 100%;

    .home-link {
      display: flex;
      align-items: center;
      text-wrap-mode: nowrap;
      color: var(--gray-0);
      text-decoration: none;
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
        background-color: Canvas;

        &:hover,
        &:focus-visible {
          --_icon-zoom: 1.2;
          outline: var(--_outline-width) solid #ffffff;
        }

        .icon {
          scale: var(--_icon-zoom);
        }
      }

      .overflow-details-nav {
        top: 135%;
        right: 0;
        background-color: #000;
        border: 1px solid #ffffff90;
        border-radius: 8px;
        padding: 12px;
        margin: 0;
        gap: 8px;

        /* Override for NavigationItems START */

        .overflow-navigation-wrapper {
          gap: 12px;

          .overflow-navigation-list {
            &.visible {
              flex-direction: column;
              gap: 12px;
            }

            .overflow-navigation-item {
              .overflow-navigation-link {
                text-decoration: none;
                color: inherit;
              }

              .overflow-navigation-details {
                --_overflow-navigation-sub-nav-list-margin-block-start: 0;

                &[open] {
                  --_overflow-navigation-sub-nav-list-margin-block-start: 12px;
                }

                &.display-details {
                  .display-details-summary {
                    color: var(--gray-0);

                    .label {
                      .overflow-navigation-text {
                        text-wrap: nowrap;
                      }
                    }

                    /* .icon {} */
                  }

                  .display-details-content {
                    .overflow-navigation-sub-nav-inner {
                      .overflow-navigation-sub-nav-list {
                        gap: 12px;

                        .overflow-navigation-sub-nav-item {
                          .overflow-navigation-sub-nav-link {
                            text-decoration: none;
                            color: inherit;

                            .overflow-navigation-sub-nav-text {
                              color: green;
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
        /* Override for NavigationItems END */
      }
    }
  }
}
</style>
