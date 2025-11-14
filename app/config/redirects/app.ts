import type { DynamicRedirectRule } from "./types";

export const appRedirects: DynamicRedirectRule[] = [
  {
    from: "/knowledge/:topic",
    to: "/new-knowledge/:topic",
    statusCode: 302,
    external: false,
    preserveQuery: true
  }
];
