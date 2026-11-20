// fmt.ts: Fills {placeholders} in a UI string with real values.
//
// The locale files (src/content/ui.en.ts, ui.de.ts) store text with
// placeholders in braces, e.g. "Go to image {n}" or "Portrait of
// {name}". This one function swaps them for actual values at the moment
// a component renders:
//
//   fmt("Go to image {n}", { n: 3 })            → "Go to image 3"
//   fmt("Portrait of {name}", { name: "Sofia" }) → "Portrait of Sofia"
//
// Why placeholders instead of just gluing strings together: word order
// differs between languages. German can put the number or the name in a
// different place in the sentence than English does, and a placeholder
// lets each translation decide where it goes.
//
// A placeholder with no matching value is left exactly as it was, rather
// than replaced with "undefined" — so a typo in a translation shows up
// as a visible {n} to fix instead of silently corrupting the sentence.
export function fmt(
  template: string,
  values: Record<string, string | number>,
): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}
