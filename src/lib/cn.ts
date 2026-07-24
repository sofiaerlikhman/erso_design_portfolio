// cn.ts: A small helper for combining CSS class names safely. It's used
// on almost every element in this project wherever the styling needs to
// change based on a condition (e.g. "add this extra class only if the
// button is disabled").
//
// It solves two problems at once:
//  1. clsx lets you pass classes conditionally, e.g.
//     cn("btn", isActive && "btn-active") — if isActive is false, that
//     second class is simply skipped instead of adding the text "false".
//  2. tailwind-merge then cleans up the result so that conflicting
//     Tailwind classes don't both end up on the element. For example
//     cn("text-sm", "text-lg") would keep only "text-lg", instead of
//     shipping both to the browser and letting the *last one written in
//     the CSS file* win by accident.
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
