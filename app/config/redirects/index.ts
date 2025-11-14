import type { DynamicRedirectRule } from "./types";
import { docsRedirects } from "./docs";
import { appRedirects } from "./app";

export const dynamicRedirects: DynamicRedirectRule[] = [...docsRedirects, ...appRedirects];
