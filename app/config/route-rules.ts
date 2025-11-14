import appRules from "./routes/app";
import docsRules from "./routes/docs";

export const routeRules = {
  ...appRules,
  ...docsRules
};
