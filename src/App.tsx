// App.tsx: The root component — this is where the whole page gets
// assembled by stacking every section in order. If you ever want to
// reorder sections (e.g. move Contact above Selected Projects), this is
// the only file where that order is decided; each section's own content
// still comes from portfolioData.ts regardless of where it's placed here.
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { MarqueeStrip } from "./components/sections/MarqueeStrip";
import { About } from "./components/sections/About";
import { ServicesResume } from "./components/sections/ServicesResume";
import { SelectedProjects } from "./components/sections/SelectedProjects";
import { Contact } from "./components/sections/Contact";

function App() {
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

export default App;
