export function applyParams(template: string, params: Record<string, string>) {
  return template.replace(/:([A-Za-z0-9_]+)/g, (_, key) => params[key] ?? "");
}
