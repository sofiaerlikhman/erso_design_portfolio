// App.tsx: The root component — this is where the whole page gets
// assembled by stacking every section in order. If you ever want to
// reorder sections (e.g. move Contact above Selected Projects), this is
// the only file where that order is decided; each section's own content
// still comes from the current language's content file regardless of
// where it's placed here.
import { LocaleProvider } from "./i18n/LocaleContext";
import { useDocumentMeta } from "./i18n/useDocumentMeta";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { MarqueeStrip } from "./components/sections/MarqueeStrip";
import { About } from "./components/sections/About";
import { ServicesResume } from "./components/sections/ServicesResume";
import { SelectedProjects } from "./components/sections/SelectedProjects";
import { Contact } from "./components/sections/Contact";

// The page itself. Split out from App so that it sits *inside*
// <LocaleProvider> below — useDocumentMeta needs to know the current
// language, and a hook can only read the provider from underneath it.
function Site() {
  // Keeps <html lang>, the page title, the search-engine description
  // and the hreflang links in step with the chosen language.
  useDocumentMeta();

  return (
    <>
      {/* Navbar is fixed to the top of the screen, so it's placed
          outside <main> and stays visible no matter which section is
          currently scrolled into view. */}
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <ServicesResume />
        <SelectedProjects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

function App() {
  // LocaleProvider wraps the entire site so that every section, down to
  // the smallest button label, reads from the same language. It decides
  // that language once (from "?lang=de" in the address, the visitor's
  // saved choice, or English) — see src/i18n/LocaleContext.tsx.
  return (
    <LocaleProvider>
      <Site />
    </LocaleProvider>
  );
}

export default App;
