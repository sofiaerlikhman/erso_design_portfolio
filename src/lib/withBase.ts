// withBase.ts: One small helper function that fixes up file links (like
// the résumé PDF) so they keep working no matter where the site is
// hosted.
//
// Why this is needed: this site can be deployed at a plain domain
// (example.com) *or* at a sub-folder, like GitHub Pages does
// (username.github.io/repo-name/). If we hard-coded a link as
// "/resume.pdf", it would work at the plain domain but break at a
// sub-folder deploy, because the browser would look for the file at the
// very root of the domain instead of inside the repo-name folder.
// import.meta.env.BASE_URL is a value Vite fills in automatically at
// build time with whatever base path was configured (see the "base"
// setting in vite.config.ts) — this function just glues that prefix onto
// the front of whatever filename you give it.
export function withBase(path: string) {
  // path.replace(/^\//, "") strips a leading "/" if someone accidentally
  // included one, so we never end up with an accidental double slash.
  return `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
}
