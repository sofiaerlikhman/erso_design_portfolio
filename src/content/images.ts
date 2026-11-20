// images.ts: Every image used by the site's content, imported once and
// shared by all locales.
//
// Why this file exists: Vite resolves these imports to hashed,
// cache-busted URLs at build time, which is why the images cannot live
// in a plain .json translation file. Pictures are the same in English
// and in German, so they're defined here once and both
// src/content/en.ts and src/content/de.ts read from this one map —
// nothing is duplicated per language.
//
// To swap an image: drop the new file into src/assets/images/ and change
// the import path below. Nothing else in the codebase needs to change.

// Hero portrait — a transparent-background cutout shown behind the
// headline (see Hero.tsx). To swap it for a different photo later, use
// the same background-removed approach and drop the file in
// src/assets/images/, then point this import at it.
import heroPortrait from "../assets/images/heroPortrait.webp";

// 1. Children of the Sun / Sonnenkinder
import detiSolntsaPackaging from "../assets/images/detiSolntsaPackaging.webp";
import detiSolntsaPoster from "../assets/images/detiSolntsaPoster.webp";
import detiSolntsaCertificate from "../assets/images/detiSolntsaCertificate.webp";

// 2. Zooniam
import zooniamPackaging from "../assets/images/zooniamPackaging.webp";
import zooniamSocial from "../assets/images/zooniamSocial.webp";
import zooniamTotes from "../assets/images/zooniamTotes.webp";

// 3. DOBROVA Brand
import dobrovaMobileMockup from "../assets/images/dobrovaMobileMockup.webp";
import dobrovaDesktopMockup from "../assets/images/dobrovaDesktopMockup.webp";
import dobrovaMultiDevice from "../assets/images/dobrovaMultiDevice.webp";

// 4. Mate & Champagner
import mateChampagnerMockup from "../assets/images/mateChampagnerMockup.webp";
import mateChampagnerUserFlow from "../assets/images/mateChampagnerUserFlow.webp";
import mateChampagnerLaptop from "../assets/images/mateChampagnerLaptop.webp";

// 5. Ukrainian Art Museum App
import museumAppShowcase from "../assets/images/museumAppShowcase.webp";
import museumWireframes from "../assets/images/museumWireframes.webp";
import museumAppInHand from "../assets/images/museumAppInHand.webp";

// 6. Five Bays Resort — PLACEHOLDER artwork. Drop the real images into
// src/assets/images/ and point these three imports at them.
import fiveBaysCover from "../assets/images/project-fivebays-1.svg";
import fiveBaysPrint from "../assets/images/project-fivebays-2.svg";
import fiveBaysMedia from "../assets/images/project-fivebays-3.svg";

// 7. DuTACS GmbH — PLACEHOLDER artwork, same as above.
import dutacsCover from "../assets/images/project-dutacs-1.svg";
import dutacsWebsite from "../assets/images/project-dutacs-2.svg";
import dutacsPrint from "../assets/images/project-dutacs-3.svg";

// 8. MainKreativRaum — PLACEHOLDER artwork, same as above.
import mainKreativRaumCover from "../assets/images/project-mainkreativraum-1.svg";
import mainKreativRaumBooking from "../assets/images/project-mainkreativraum-2.svg";
import mainKreativRaumPages from "../assets/images/project-mainkreativraum-3.svg";

// 9. Hard Skills / tool logos for the marquee
import figma from "../assets/images/figma.webp";
import adobe from "../assets/images/adobe.webp";
import higgsfield from "../assets/images/higgsfield.webp";
import topview from "../assets/images/topview.webp";
import wordpress from "../assets/images/wordpress.webp";
import wix from "../assets/images/wix.webp";
import vscode from "../assets/images/vscode.webp";
import cinema4d from "../assets/images/cinema4d.webp";
import canva from "../assets/images/canva.webp";
import fontlab from "../assets/images/fontlab.webp";
// PLACEHOLDER logo tiles — swap for the real marks when you have them.
import webflow from "../assets/images/marquee-webflow.svg";
import claudeCode from "../assets/images/marquee-claude-code.svg";
import capcut from "../assets/images/marquee-capcut.svg";

export const images = {
  heroPortrait,

  detiSolntsaPackaging,
  detiSolntsaPoster,
  detiSolntsaCertificate,

  zooniamPackaging,
  zooniamSocial,
  zooniamTotes,

  dobrovaMobileMockup,
  dobrovaDesktopMockup,
  dobrovaMultiDevice,

  mateChampagnerMockup,
  mateChampagnerUserFlow,
  mateChampagnerLaptop,

  museumAppShowcase,
  museumWireframes,
  museumAppInHand,

  fiveBaysCover,
  fiveBaysPrint,
  fiveBaysMedia,

  dutacsCover,
  dutacsWebsite,
  dutacsPrint,

  mainKreativRaumCover,
  mainKreativRaumBooking,
  mainKreativRaumPages,

  figma,
  adobe,
  higgsfield,
  topview,
  wordpress,
  wix,
  vscode,
  cinema4d,
  canva,
  fontlab,
  webflow,
  claudeCode,
  capcut,
} as const;
