import { appRules } from "./app"
import { docsRules } from "./docs"

export const routeRules = {
  ...appRules,
  ...docsRules,
}
