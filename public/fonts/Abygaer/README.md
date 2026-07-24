# Drop the Abygaer font file here

`src/index.css` already points at:

```
/fonts/Abygaer/Abygaer-Regular.woff2
```

Add your licensed `.woff2` file with that exact name (right in this folder)
and it will load automatically — no other change needed, and it'll resolve
correctly whether you deploy to a GitHub Pages subpath, a custom domain, or
`localhost`.

Until then, the browser silently falls back to `Playfair Display` (loaded
from Google Fonts in `index.html`), so nothing breaks.

If your file has a different name or you have multiple weights, edit the
`@font-face` block(s) in `src/index.css` to match. Files in `public/` are
copied into the build as-is — do not import this file from TypeScript.
