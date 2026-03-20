import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enHome from "./Home/en.json";
import grHome from "./Home/gr.json";
import plHome from "./Home/pl.json";
import trHome from "./Home/tr.json";

import enAbout from "./About/en.json";
import grAbout from "./About/gr.json";
import plAbout from "./About/pl.json";
import trAbout from "./About/tr.json";

import enGuide from "./Guide/en.json";
import grGuide from "./Guide/gr.json";
import plGuide from "./Guide/pl.json";
import trGuide from "./Guide/tr.json";

import enWorkshops from "./Workshops/en.json";
import grWorkshops from "./Workshops/gr.json";
import plWorkshops from "./Workshops/pl.json";
import trWorkshops from "./Workshops/tr.json";

import enGallery from "./Gallery/en.json";
import grGallery from "./Gallery/gr.json";
import plGallery from "./Gallery/pl.json";
import trGallery from "./Gallery/tr.json";

import enLayouts from "./layouts/en.json";
import grLayouts from "./layouts/gr.json";
import plLayouts from "./layouts/pl.json";
import trLayouts from "./layouts/tr.json";

import enAccessibilityMenu from "./AccessibilityMenu/en.json";
import grAccessibilityMenu from "./AccessibilityMenu/gr.json";
import plAccessibilityMenu from "./AccessibilityMenu/pl.json";
import trAccessibilityMenu from "./AccessibilityMenu/tr.json";

const resources = {
  en: {
    home: enHome,
    about: enAbout,
    guide: enGuide,
    workshops: enWorkshops,
    gallery: enGallery,
    layouts: enLayouts,
    accessibilityMenu: enAccessibilityMenu,
  },
  ελ: {
    home: grHome,
    about: grAbout,
    guide: grGuide,
    workshops: grWorkshops,
    gallery: grGallery,
    layouts: grLayouts,
    accessibilityMenu: grAccessibilityMenu,
  },
  pl: {
    home: plHome,
    about: plAbout,
    guide: plGuide,
    workshops: plWorkshops,
    gallery: plGallery,
    layouts: plLayouts,
    accessibilityMenu: plAccessibilityMenu,
  },
  tr: {
    home: trHome,
    about: trAbout,
    guide: trGuide,
    workshops: trWorkshops,
    gallery: trGallery,
    layouts: trLayouts,
    accessibilityMenu: trAccessibilityMenu,
  },
};

const savedLanguage = localStorage.getItem("oteship-lang") || "en";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLanguage,
  fallbackLng: "en",
  defaultNS: "home",
  interpolation: {
    escapeValue: false,
  },
  ns: [
    "home",
    "layouts",
    "about",
    "guide",
    "workshops",
    "gallery",
    "accessibilityMenu",
  ],
});

export default i18n;
