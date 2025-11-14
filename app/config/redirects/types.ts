export interface DynamicRedirectRule {
  from: string;
  to: string;
  statusCode?: number;
  external?: boolean;
  preserveQuery?: boolean;
}
