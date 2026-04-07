
import React, { useEffect, useMemo, useState } from "react";
import {
  Building2,
  Bookmark,
  Camera,
  CheckCircle2,
  Church,
  Clock3,
  CloudSun,
  ExternalLink,
  Heart,
  Home,
  Hotel,
  Image as ImageIcon,
  MapPin,
  Mountain,
  Music4,
  Navigation,
  NotebookPen,
  Route,
  Search,
  Share2,
  ShieldPlus,
  Sparkles,
  Star,
  ThermometerSun,
  Trees,
  Trophy,
  UtensilsCrossed,
} from "lucide-react";

const mobileTabs = [
  { key: "explore", label: "Explore", icon: Home },
  { key: "saved", label: "Saved", icon: Bookmark },
  { key: "planner", label: "Planner", icon: NotebookPen },
];

const menu = [
  { key: "cities", label: "Cities", icon: Building2 },
  { key: "attractions", label: "Attractions", icon: MapPin },
  { key: "national-parks", label: "National Parks", icon: Mountain },
  { key: "state-parks", label: "State Parks", icon: Trees },
  { key: "marriotts", label: "Marriotts", icon: Hotel },
  { key: "nutritional", label: "Nutritional Replenishment", icon: UtensilsCrossed },
  { key: "vegas", label: "Vegas Shows", icon: Music4 },
  { key: "catholic", label: "Catholic Significance", icon: Church },
];

const routeStops = [
  { id: "denver", name: "Denver", type: "cities", x: 8, y: 34, overview: "Launch point for the trip.", googleMaps: "https://www.google.com/maps/search/Denver,+Colorado", weather: "https://weather.gov/", bestMonths: "Apr–Oct", temperatureHint: "Cool mornings, variable afternoons" },
  { id: "moab", name: "Moab", type: "cities", x: 28, y: 33, overview: "Gateway to Arches and Canyonlands.", googleMaps: "https://www.google.com/maps/search/Moab,+Utah", weather: "https://forecast.weather.gov/MapClick.php?textField1=38.5733&textField2=-109.5498", bestMonths: "Apr–May, Sept–Oct", temperatureHint: "Dry heat rises quickly" },
  { id: "torrey", name: "Torrey", type: "cities", x: 44, y: 28, overview: "Quiet base for Capitol Reef.", googleMaps: "https://www.google.com/maps/search/Torrey,+Utah", weather: "https://forecast.weather.gov/MapClick.php?textField1=38.2997&textField2=-111.4191", bestMonths: "May–Jun, Sept–Oct", temperatureHint: "Cooler mornings" },
  { id: "bryce-town", name: "Bryce Canyon City", type: "cities", x: 57, y: 36, overview: "Easy base for overlook-heavy days.", googleMaps: "https://www.google.com/maps/search/Bryce+Canyon+City,+Utah", weather: "https://forecast.weather.gov/MapClick.php?textField1=37.6728&textField2=-112.156", bestMonths: "May–Jun, Sept", temperatureHint: "Cooler due to elevation" },
  { id: "springdale", name: "Springdale", type: "cities", x: 74, y: 48, overview: "Pleasant Zion base with easy access.", googleMaps: "https://www.google.com/maps/search/Springdale,+Utah", weather: "https://forecast.weather.gov/MapClick.php?textField1=37.1889&textField2=-112.9986", bestMonths: "Apr–May, Oct", temperatureHint: "Watch heat closely" },
  { id: "vegas", name: "Las Vegas", type: "cities", x: 90, y: 72, overview: "Finale city for shows and comfort.", googleMaps: "https://www.google.com/maps/search/Las+Vegas,+Nevada", weather: "https://forecast.weather.gov/MapClick.php?textField1=36.1699&textField2=-115.1398", bestMonths: "Mar–May, Oct–Nov", temperatureHint: "Indoor culture is your ally" },
];

const photoSets = {
  arches: [
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  ],
  capitol: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
  ],
  bryce: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
  ],
  zion: [
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80",
  ],
  vegas: [
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
  ],
  default: [
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
  ],
};

const places = [
  {
    id: "arches",
    name: "Arches National Park",
    type: "national-parks",
    stopId: "moab",
    x: 30,
    y: 29,
    overview: "Easy big-wow scenery with viewpoints and short walks.",
    seniorNotes: "Prioritize Windows, Balanced Rock, and viewpoint stops.",
    bestTime: "Early morning or sunset",
    comida: 2,
    cost: "$30 vehicle pass",
    weatherTip: "Carry water even for short stops.",
    website: "https://www.nps.gov/arch/index.htm",
    reserveLink: "https://www.nps.gov/arch/planyourvisit/fees.htm",
    weather: "https://www.nps.gov/arch/planyourvisit/weather.htm",
    wiki: "https://en.wikipedia.org/wiki/Arches_National_Park",
    viator: "https://www.viator.com/searchResults/all?text=Arches%20National%20Park",
    googleImages: "https://www.google.com/search?tbm=isch&q=Arches+National+Park",
    googleMaps: "https://www.google.com/maps/search/Arches+National+Park",
    driveFromPrev: 0.5,
    photoKey: "arches",
    highlights: ["Windows", "Balanced Rock", "Delicate Arch viewpoint"],
  },
  {
    id: "capitol-reef",
    name: "Capitol Reef National Park",
    type: "national-parks",
    stopId: "torrey",
    x: 47,
    y: 24,
    overview: "Quiet and scenic with orchards, geology, and gentle touring.",
    seniorNotes: "Scenic drive and Fruita are excellent low-stress options.",
    bestTime: "Morning or late afternoon",
    comida: 1,
    cost: "$20 scenic drive fee or pass",
    weatherTip: "Limited shade, but easy pacing helps.",
    website: "https://www.nps.gov/care/index.htm",
    reserveLink: "https://www.nps.gov/care/planyourvisit/fees.htm",
    weather: "https://www.nps.gov/care/planyourvisit/weather.htm",
    wiki: "https://en.wikipedia.org/wiki/Capitol_Reef_National_Park",
    viator: "https://www.viator.com/searchResults/all?text=Capitol%20Reef%20National%20Park",
    googleImages: "https://www.google.com/search?tbm=isch&q=Capitol+Reef+National+Park",
    googleMaps: "https://www.google.com/maps/search/Capitol+Reef+National+Park",
    driveFromPrev: 0.5,
    photoKey: "capitol",
    highlights: ["Scenic Drive", "Fruita", "Petroglyph panel"],
  },
  {
    id: "bryce",
    name: "Bryce Canyon National Park",
    type: "national-parks",
    stopId: "bryce-town",
    x: 59,
    y: 32,
    overview: "Huge payoff from overlooks close to parking.",
    seniorNotes: "Sunrise, Sunset, Inspiration, and Bryce Point are ideal.",
    bestTime: "Sunrise and evening",
    comida: 1,
    cost: "$35 vehicle pass",
    weatherTip: "Altitude can slow people down.",
    website: "https://www.nps.gov/brca/index.htm",
    reserveLink: "https://www.nps.gov/brca/planyourvisit/fees.htm",
    weather: "https://www.nps.gov/brca/planyourvisit/weather.htm",
    wiki: "https://en.wikipedia.org/wiki/Bryce_Canyon_National_Park",
    viator: "https://www.viator.com/searchResults/all?text=Bryce%20Canyon%20National%20Park",
    googleImages: "https://www.google.com/search?tbm=isch&q=Bryce+Canyon+National+Park",
    googleMaps: "https://www.google.com/maps/search/Bryce+Canyon+National+Park",
    driveFromPrev: 0.25,
    photoKey: "bryce",
    highlights: ["Sunrise Point", "Sunset Point", "Bryce Point"],
  },
  {
    id: "zion",
    name: "Zion National Park",
    type: "national-parks",
    stopId: "springdale",
    x: 76,
    y: 45,
    overview: "Superstar canyon park, best with shuttle use and shade strategy.",
    seniorNotes: "Use the shuttle and keep walks easy.",
    bestTime: "Early morning or evening",
    comida: 2,
    cost: "$35 vehicle pass",
    weatherTip: "Start very early in warm months.",
    website: "https://www.nps.gov/zion/index.htm",
    reserveLink: "https://www.nps.gov/zion/planyourvisit/fees.htm",
    weather: "https://www.nps.gov/zion/planyourvisit/weather.htm",
    wiki: "https://en.wikipedia.org/wiki/Zion_National_Park",
    viator: "https://www.viator.com/searchResults/all?text=Zion%20National%20Park",
    googleImages: "https://www.google.com/search?tbm=isch&q=Zion+National+Park",
    googleMaps: "https://www.google.com/maps/search/Zion+National+Park",
    driveFromPrev: 0.25,
    photoKey: "zion",
    highlights: ["Shuttle access", "Pa'rus Trail", "Temple of Sinawava"],
  },
  {
    id: "dead-horse",
    name: "Dead Horse Point State Park",
    type: "state-parks",
    stopId: "moab",
    x: 24,
    y: 24,
    overview: "Epic canyon view with minimal walking.",
    seniorNotes: "Excellent low-exertion option.",
    bestTime: "Sunrise or sunset",
    comida: 1,
    cost: "State park day-use fee",
    weatherTip: "Wind can make overlooks feel cooler.",
    website: "https://stateparks.utah.gov/parks/dead-horse/",
    reserveLink: "https://stateparks.utah.gov/parks/dead-horse/",
    weather: "https://forecast.weather.gov/MapClick.php?textField1=38.4749&textField2=-109.7404",
    wiki: "https://en.wikipedia.org/wiki/Dead_Horse_Point_State_Park",
    viator: "https://www.viator.com/searchResults/all?text=Dead%20Horse%20Point%20State%20Park",
    googleImages: "https://www.google.com/search?tbm=isch&q=Dead+Horse+Point+State+Park",
    googleMaps: "https://www.google.com/maps/search/Dead+Horse+Point+State+Park",
    driveFromPrev: 0.5,
    photoKey: "default",
    highlights: ["Main overlook", "Short paved walks"],
  },
  {
    id: "kodachrome",
    name: "Kodachrome Basin State Park",
    type: "state-parks",
    stopId: "bryce-town",
    x: 63,
    y: 27,
    overview: "Underrated and calmer than the busiest parks.",
    seniorNotes: "Excellent bonus day with less crowd stress.",
    bestTime: "Morning",
    comida: 1,
    cost: "State park day-use fee",
    weatherTip: "Good place for a shorter scenic visit.",
    website: "https://stateparks.utah.gov/parks/kodachrome-basin/",
    reserveLink: "https://stateparks.utah.gov/parks/kodachrome-basin/",
    weather: "https://forecast.weather.gov/MapClick.php?textField1=37.5268&textField2=-111.9957",
    wiki: "https://en.wikipedia.org/wiki/Kodachrome_Basin_State_Park",
    viator: "https://www.viator.com/searchResults/all?text=Kodachrome%20Basin%20State%20Park",
    googleImages: "https://www.google.com/search?tbm=isch&q=Kodachrome+Basin+State+Park",
    googleMaps: "https://www.google.com/maps/search/Kodachrome+Basin+State+Park",
    driveFromPrev: 0.5,
    photoKey: "default",
    highlights: ["Quiet vistas", "Stone chimneys"],
  },
  {
    id: "springhill-moab",
    name: "SpringHill Suites Moab",
    type: "marriotts",
    stopId: "moab",
    x: 26,
    y: 35,
    overview: "Convenient Moab base with breakfast and easy park access.",
    seniorNotes: "Great for reducing unpacking fatigue.",
    comida: 0,
    website: "https://www.marriott.com/en-us/hotels/cnyms-springhill-suites-moab/overview/",
    googleMaps: "https://www.google.com/maps/search/SpringHill+Suites+Moab",
    driveFromPrev: 0,
    nearby: ["Arches ~ 0.5 hr", "Dead Horse Point ~ 0.5 hr"],
    photoKey: "default",
  },
  {
    id: "springhill-zion",
    name: "SpringHill Suites Springdale Zion National Park",
    type: "marriotts",
    stopId: "springdale",
    x: 72,
    y: 50,
    overview: "Strong senior-friendly Zion base with breakfast.",
    seniorNotes: "Easier mornings and fewer logistics hassles.",
    comida: 0,
    website: "https://www.marriott.com/en-us/hotels/sguzi-springhill-suites-springdale-zion-national-park/overview/",
    googleMaps: "https://www.google.com/maps/search/SpringHill+Suites+Springdale+Zion+National+Park",
    driveFromPrev: 0,
    nearby: ["Zion main access ~ 0.25 hr"],
    photoKey: "default",
  },
  {
    id: "jw-vegas",
    name: "JW Marriott Las Vegas Resort & Spa",
    type: "marriotts",
    stopId: "vegas",
    x: 82,
    y: 64,
    overview: "Calmer Vegas base away from the loudest Strip energy.",
    seniorNotes: "Excellent for a show-first, chaos-light stay.",
    comida: 0,
    website: "https://www.marriott.com/en-us/hotels/lasjw-jw-marriott-las-vegas-resort-and-spa/overview/",
    googleMaps: "https://www.google.com/maps/search/JW+Marriott+Las+Vegas+Resort+%26+Spa",
    driveFromPrev: 0,
    nearby: ["Red Rock access", "Good resort calm"],
    photoKey: "vegas",
  },
  {
    id: "moab-food",
    name: "Moab Nutritional Replenishment",
    type: "nutritional",
    stopId: "moab",
    x: 31,
    y: 37,
    overview: "Protein, hydration, and early dinner strategy.",
    seniorNotes: "Choose shaded seating and easy parking.",
    bestTime: "Lunch before heat",
    comida: 0,
    website: "https://www.google.com/maps/search/best+restaurants+in+Moab+Utah",
    googleMaps: "https://www.google.com/maps/search/best+restaurants+in+Moab+Utah",
    photoKey: "default",
    highlights: ["Hydration stop", "Protein-forward lunch"],
  },
  {
    id: "springdale-food",
    name: "Springdale Nutritional Replenishment",
    type: "nutritional",
    stopId: "springdale",
    x: 73,
    y: 52,
    overview: "The civilized Zion move: breakfast, shuttle, scenic day, early dinner.",
    seniorNotes: "Use it as a recovery anchor after the park.",
    bestTime: "Breakfast or post-park dinner",
    comida: 0,
    website: "https://www.google.com/maps/search/best+restaurants+in+Springdale+Utah",
    googleMaps: "https://www.google.com/maps/search/best+restaurants+in+Springdale+Utah",
    photoKey: "default",
    highlights: ["Cool indoor lunch", "Nice patio dinner"],
  },
  {
    id: "smith-center",
    name: "The Smith Center",
    type: "vegas",
    stopId: "vegas",
    x: 87,
    y: 69,
    overview: "A strong Vegas answer for parents who like polished shows and culture.",
    seniorNotes: "Much easier sell than random Strip wandering.",
    bestTime: "Evening",
    comida: 0,
    website: "https://thesmithcenter.com/",
    googleMaps: "https://www.google.com/maps/search/The+Smith+Center+Las+Vegas",
    photoKey: "vegas",
    highlights: ["Broadway tours", "Music programs"],
  },
  {
    id: "bellagio-fountains",
    name: "Bellagio Conservatory & Fountains",
    type: "vegas",
    stopId: "vegas",
    x: 90,
    y: 76,
    overview: "Low-exertion Vegas beauty and a persuasive anti-chaos argument.",
    seniorNotes: "Good for a pretty, gentle sightseeing stop.",
    bestTime: "Evening fountains",
    comida: 0,
    website: "https://bellagio.mgmresorts.com/en/entertainment/bellagio-fountains.html",
    googleMaps: "https://www.google.com/maps/search/Bellagio+Fountains",
    photoKey: "vegas",
    highlights: ["Fountains", "Conservatory"],
  },
  {
    id: "guardian-angel",
    name: "Guardian Angel Cathedral",
    type: "catholic",
    stopId: "vegas",
    x: 89,
    y: 70,
    overview: "Calm Catholic landmark near the Strip.",
    seniorNotes: "Meaningful and low exertion.",
    bestTime: "Late morning or early evening",
    comida: 0,
    website: "https://www.guardianangelcathedral.org/",
    reserveLink: "https://www.guardianangelcathedral.org/",
    weather: "https://forecast.weather.gov/MapClick.php?textField1=36.137&textField2=-115.162",
    wiki: "https://en.wikipedia.org/wiki/Guardian_Angel_Cathedral_(Las_Vegas,_Nevada)",
    viator: "https://www.viator.com/searchResults/all?text=Guardian%20Angel%20Cathedral%20Las%20Vegas",
    googleImages: "https://www.google.com/search?tbm=isch&q=Guardian+Angel+Cathedral+Las+Vegas",
    googleMaps: "https://www.google.com/maps/search/Guardian+Angel+Cathedral+Las+Vegas",
    driveFromPrev: 0.25,
    photoKey: "vegas",
    highlights: ["Architecture", "Quiet stop"],
  },
];

const allItems = [...routeStops, ...places];

const dayPlans = {
  7: [
    { day: 1, title: "Denver → Moab", drive: 6.5, sleep: "Moab", plan: "Travel day with real rest breaks." },
    { day: 2, title: "Arches", drive: 1.5, sleep: "Moab", plan: "Viewpoints and short walks." },
    { day: 3, title: "Moab bonus + Torrey", drive: 3.5, sleep: "Torrey", plan: "Dead Horse or easy scenic stop, then transfer." },
    { day: 4, title: "Capitol Reef", drive: 1.5, sleep: "Torrey", plan: "Quiet scenery and pie diplomacy." },
    { day: 5, title: "Torrey → Bryce", drive: 2.5, sleep: "Bryce area", plan: "Highway 12 scenic day." },
    { day: 6, title: "Bryce → Zion", drive: 2.5, sleep: "Springdale", plan: "Overlooks first, easy evening later." },
    { day: 7, title: "Zion → Las Vegas", drive: 3, sleep: "Las Vegas", plan: "Easy Zion morning, polished Vegas finish." },
  ],
  8: [
    { day: 1, title: "Denver → Moab", drive: 6.5, sleep: "Moab", plan: "Launch day." },
    { day: 2, title: "Arches", drive: 1.5, sleep: "Moab", plan: "Main icons, short walks." },
    { day: 3, title: "Dead Horse / Moab recovery", drive: 2, sleep: "Moab", plan: "Choose the easier wow option." },
    { day: 4, title: "Moab → Torrey", drive: 2.5, sleep: "Torrey", plan: "Transit plus scenic time." },
    { day: 5, title: "Capitol Reef", drive: 1.5, sleep: "Torrey", plan: "Gentle park day." },
    { day: 6, title: "Torrey → Bryce", drive: 2.5, sleep: "Bryce area", plan: "Scenic transfer." },
    { day: 7, title: "Bryce → Zion", drive: 2.5, sleep: "Springdale", plan: "Overlooks then transfer." },
    { day: 8, title: "Zion → Las Vegas", drive: 3, sleep: "Las Vegas", plan: "Show-first finale." },
  ],
  9: [
    { day: 1, title: "Denver → Moab", drive: 6.5, sleep: "Moab", plan: "Travel day." },
    { day: 2, title: "Arches", drive: 1.5, sleep: "Moab", plan: "Big icons, low overexertion." },
    { day: 3, title: "Dead Horse or Canyonlands-style easy day", drive: 2, sleep: "Moab", plan: "Second Moab wonder day." },
    { day: 4, title: "Moab → Torrey", drive: 2.5, sleep: "Torrey", plan: "Easy transfer." },
    { day: 5, title: "Capitol Reef", drive: 1.5, sleep: "Torrey", plan: "Scenic drive and Fruita." },
    { day: 6, title: "Torrey → Bryce", drive: 2.5, sleep: "Bryce area", plan: "Beautiful highway day." },
    { day: 7, title: "Bryce full day", drive: 1, sleep: "Bryce area", plan: "Overlooks and rest." },
    { day: 8, title: "Bryce → Zion", drive: 2.5, sleep: "Springdale", plan: "Transfer and easy evening." },
    { day: 9, title: "Zion → Las Vegas", drive: 3, sleep: "Las Vegas", plan: "Culture-first finish." },
  ],
  10: [
    { day: 1, title: "Denver → Moab", drive: 6.5, sleep: "Moab", plan: "Travel day." },
    { day: 2, title: "Arches", drive: 1.5, sleep: "Moab", plan: "Low-comida icon day." },
    { day: 3, title: "Dead Horse or Moab recovery", drive: 2, sleep: "Moab", plan: "Flexible second day." },
    { day: 4, title: "Moab → Torrey", drive: 2.5, sleep: "Torrey", plan: "Easy transfer." },
    { day: 5, title: "Capitol Reef", drive: 1.5, sleep: "Torrey", plan: "Gentle touring." },
    { day: 6, title: "Torrey rest or bonus gem", drive: 2, sleep: "Torrey", plan: "Slow morning option." },
    { day: 7, title: "Torrey → Bryce", drive: 2.5, sleep: "Bryce area", plan: "Scenic highway day." },
    { day: 8, title: "Bryce full day", drive: 1, sleep: "Bryce area", plan: "Overlooks and photos." },
    { day: 9, title: "Bryce → Zion", drive: 2.5, sleep: "Springdale", plan: "Transfer and recovery." },
    { day: 10, title: "Zion → Las Vegas", drive: 3, sleep: "Las Vegas", plan: "Show-centered finish." },
  ],
};

const challenges = [
  "Spot three different rock colors in one day.",
  "Name one scenic pullout like a western movie.",
  "Take a family sunset victory photo.",
  "Find one place that proves Vegas can be classy.",
  "Choose shade before pride and earn Grandparent Gold.",
];

function roundedDrive(value) {
  if (value == null) return "—";
  return `${Math.round(value * 2) / 2} hr`;
}

function comidaLabel(value) {
  if (value <= 0) return "0 Comida · Very easy";
  if (value <= 1) return "1 Comida · Easy";
  return "2 Comida · Moderate";
}

function getPhotosFor(item) {
  if (!item) return photoSets.default;
  return photoSets[item.photoKey] || photoSets.default;
}

function getGoogleImageLinks(name) {
  return Array.from({ length: 15 }, (_, i) => ({
    id: `${name}-${i}`,
    url: `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + " scenic photo " + (i + 1))}`,
  }));
}

function IconButton({ icon: Icon, children, onClick, className = "" }) {
  return (
    <button className={`icon-button ${className}`} onClick={onClick}>
      <Icon size={16} />
      <span>{children}</span>
    </button>
  );
}

function RouteMap({ items, selected, onSelect, showRestStops }) {
  const path = routeStops.map((stop) => `${stop.x},${stop.y}`).join(" ");
  const restStops = [
    { id: "r1", x: 18, y: 34 },
    { id: "r2", x: 37, y: 31 },
    { id: "r3", x: 52, y: 32 },
    { id: "r4", x: 70, y: 42 },
    { id: "r5", x: 84, y: 62 },
  ];

  return (
    <div className="map-card">
      <svg viewBox="0 0 100 80" className="route-map">
        <polyline points={path} fill="none" stroke="#c2410c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {showRestStops &&
          restStops.map((s) => (
            <g key={s.id}>
              <circle cx={s.x} cy={s.y} r="1.2" fill="#1d4ed8" />
              <text x={s.x + 1.2} y={s.y - 0.8} fontSize="2.4" fill="#1e3a8a">☕</text>
            </g>
          ))}
        {items.map((item) => {
          const active = selected?.id === item.id;
          return (
            <g key={item.id} onClick={() => onSelect(item)} style={{ cursor: "pointer" }}>
              <circle cx={item.x} cy={item.y} r={active ? 2.8 : 2.2} fill={active ? "#7c2d12" : "#ea580c"} stroke="#fff" strokeWidth="0.8" />
              <text x={item.x + 2.5} y={item.y + 0.8} fontSize="2.5" fill="#431407">{item.name}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function MenuButton({ label, active, icon: Icon, onClick }) {
  return (
    <button className={`menu-button ${active ? "active" : ""}`} onClick={onClick}>
      <Icon size={18} />
      <span>{label}</span>
    </button>
  );
}

function DetailLink({ href, label }) {
  if (!href) return null;
  return (
    <a href={href} target="_blank" rel="noreferrer" className="detail-link">
      <ExternalLink size={14} />
      <span>{label}</span>
    </a>
  );
}

function TabButton({ active, children, onClick }) {
  return (
    <button className={`tab-button ${active ? "active" : ""}`} onClick={onClick}>
      {children}
    </button>
  );
}

function SectionCard({ title, subtitle, children, right }) {
  return (
    <section className="section-card">
      <div className="section-header">
        <div>
          <h2>{title}</h2>
          {subtitle ? <p>{subtitle}</p> : null}
        </div>
        {right}
      </div>
      {children}
    </section>
  );
}

export default function App() {
  const [selectedMenu, setSelectedMenu] = useState("national-parks");
  const [mobileTab, setMobileTab] = useState("explore");
  const [selectedTripLength, setSelectedTripLength] = useState(9);
  const [showRestStops, setShowRestStops] = useState(true);
  const [heatSensitive, setHeatSensitive] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(places.find((p) => p.id === "arches"));
  const [savedIds, setSavedIds] = useState([]);
  const [tripNotes, setTripNotes] = useState("");
  const [dailyPace, setDailyPace] = useState(65);
  const [detailTab, setDetailTab] = useState("overview");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("southwest2026-state");
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (parsed.selectedMenu) setSelectedMenu(parsed.selectedMenu);
      if (parsed.mobileTab) setMobileTab(parsed.mobileTab);
      if (parsed.selectedTripLength) setSelectedTripLength(parsed.selectedTripLength);
      if (typeof parsed.showRestStops === "boolean") setShowRestStops(parsed.showRestStops);
      if (typeof parsed.heatSensitive === "boolean") setHeatSensitive(parsed.heatSensitive);
      if (typeof parsed.search === "string") setSearch(parsed.search);
      if (typeof parsed.tripNotes === "string") setTripNotes(parsed.tripNotes);
      if (Array.isArray(parsed.savedIds)) setSavedIds(parsed.savedIds);
      if (typeof parsed.dailyPace === "number") setDailyPace(parsed.dailyPace);
      if (parsed.selectedId) {
        const found = allItems.find((item) => item.id === parsed.selectedId);
        if (found) setSelected(found);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(
        "southwest2026-state",
        JSON.stringify({
          selectedMenu,
          mobileTab,
          selectedTripLength,
          showRestStops,
          heatSensitive,
          search,
          selectedId: selected?.id,
          savedIds,
          tripNotes,
          dailyPace,
        })
      );
    } catch {}
  }, [selectedMenu, mobileTab, selectedTripLength, showRestStops, heatSensitive, search, selected, savedIds, tripNotes, dailyPace]);

  const visibleItems = useMemo(() => {
    return allItems.filter((item) => item.type === selectedMenu && item.name.toLowerCase().includes(search.toLowerCase()));
  }, [selectedMenu, search]);

  const savedItems = useMemo(() => allItems.filter((item) => savedIds.includes(item.id)), [savedIds]);
  const photos = getPhotosFor(selected);
  const photoLinks = getGoogleImageLinks(selected?.name || "Utah scenic");
  const selectedStop = routeStops.find((stop) => stop.id === selected?.stopId || stop.id === selected?.id);
  const nextRouteStop = selectedStop ? routeStops[routeStops.findIndex((s) => s.id === selectedStop.id) + 1] : null;
  const currentDayPlan = dayPlans[selectedTripLength] || dayPlans[9];
  const paceLabel = dailyPace < 40 ? "Ultra easy" : dailyPace < 70 ? "Relaxed" : "Active but senior-aware";

  const toggleSaved = (id) => {
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const shareTrip = async () => {
    const text = `Southwest 2026\nTrip length: ${selectedTripLength} days\nSaved: ${savedItems.map((x) => x.name).join(", ") || "None yet"}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Southwest 2026", text });
      } else {
        await navigator.clipboard.writeText(text);
        alert("Trip summary copied to clipboard.");
      }
    } catch {}
  };

  return (
    <div className="app-shell">
      <div className="page-grid">
        <aside className="sidebar desktop-only">
          <div className="brand-card">
            <div className="brand-icon"><Route size={22} /></div>
            <div>
              <h1>Southwest 2026</h1>
              <p>Free website version for Mac and iPhone.</p>
            </div>
          </div>

          <div className="rule-card">
            <div className="rule-title"><ShieldPlus size={18} /> Senior-first rules</div>
            <div className="rule-list">
              <div>• Start early and avoid midday heat.</div>
              <div>• Keep most activities at 0–2 Comida.</div>
              <div>• Prefer scenic drives, overlooks, and easy paths.</div>
            </div>
          </div>

          <div className="menu-stack">
            {menu.map((item) => (
              <MenuButton key={item.key} label={item.label} icon={item.icon} active={selectedMenu === item.key} onClick={() => setSelectedMenu(item.key)} />
            ))}
          </div>
        </aside>

        <main className="content">
          <SectionCard
            title="The scenic command deck"
            subtitle="A free-website version designed to feel simple on iPhone and comfortable on Mac."
            right={<span className="pill success">Free-hosting friendly</span>}
          >
            <div className="mobile-tabs mobile-only">
              {mobileTabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button key={tab.key} className={`mobile-tab ${mobileTab === tab.key ? "active" : ""}`} onClick={() => setMobileTab(tab.key)}>
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="stat-grid">
              <div className="stat-card">
                <div className="stat-label">Main route</div>
                <div className="stat-value">Denver → Moab → Torrey → Bryce → Zion → Vegas</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Trip length</div>
                <div className="stat-value">{selectedTripLength} days</div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Daily pace</div>
                <div className="stat-value">{paceLabel}</div>
              </div>
            </div>

            <div className="map-grid">
              <RouteMap items={[...routeStops, ...visibleItems.slice(0, 12)]} selected={selected} onSelect={setSelected} showRestStops={showRestStops} />
              <div className="photo-wall">
                {photos.map((src, idx) => (
                  <div key={`${src}-${idx}`} className="photo-tile">
                    <img src={src} alt={`${selected?.name || "Scenic stop"} ${idx + 1}`} />
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>

          {mobileTab !== "saved" && (
            <div className="two-col">
              <SectionCard title="Explore" subtitle="Tap any card to load the detail panel.">
                <div className="search-box">
                  <Search size={18} />
                  <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Find a park, city, hotel, or replenishment stop" />
                </div>

                <div className="button-row">
                  {[7, 8, 9, 10].map((d) => (
                    <button key={d} className={`small-button ${selectedTripLength === d ? "active" : ""}`} onClick={() => setSelectedTripLength(d)}>
                      {d} days
                    </button>
                  ))}
                </div>

                <div className="control-card">
                  <div className="control-title">Daily pace</div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    step="5"
                    value={dailyPace}
                    onChange={(e) => setDailyPace(Number(e.target.value))}
                    className="range"
                  />
                </div>

                <div className="toggle-card">
                  <div>
                    <div className="toggle-title">Show rest stops</div>
                    <div className="toggle-subtitle">Coffee and leg-stretch diplomacy</div>
                  </div>
                  <input type="checkbox" checked={showRestStops} onChange={(e) => setShowRestStops(e.target.checked)} />
                </div>

                <div className="toggle-card">
                  <div>
                    <div className="toggle-title">Heat-sensitive mode</div>
                    <div className="toggle-subtitle">Bias toward easier days</div>
                  </div>
                  <input type="checkbox" checked={heatSensitive} onChange={(e) => setHeatSensitive(e.target.checked)} />
                </div>

                <div className="menu-grid mobile-only">
                  {menu.map((item) => (
                    <MenuButton key={item.key} label={item.label} icon={item.icon} active={selectedMenu === item.key} onClick={() => setSelectedMenu(item.key)} />
                  ))}
                </div>

                <div className="cards-grid">
                  {visibleItems.map((item) => (
                    <button key={item.id} onClick={() => setSelected(item)} className={`place-card ${selected?.id === item.id ? "active" : ""}`}>
                      <div className="place-head">
                        <div>
                          <div className="place-type">{item.type.replaceAll("-", " ")}</div>
                          <div className="place-name">{item.name}</div>
                        </div>
                        <span className="pill warm">{item.stopId ? routeStops.find((s) => s.id === item.stopId)?.name || "Route" : "Stop"}</span>
                      </div>
                      <div className="place-overview">{item.overview}</div>
                      {item.comida != null && <div className="place-meta">{comidaLabel(item.comida)}</div>}
                    </button>
                  ))}
                </div>
              </SectionCard>

              <SectionCard
                title={selected?.name || "Details"}
                subtitle={selectedStop?.name || "Route stop"}
                right={
                  <IconButton icon={Bookmark} onClick={() => toggleSaved(selected.id)}>
                    {savedIds.includes(selected?.id) ? "Saved" : "Save"}
                  </IconButton>
                }
              >
                <div className="hero-image">
                  <img src={photos[0]} alt={selected?.name || "Scenic place"} />
                </div>

                <div className="detail-tabs">
                  {["overview", "photos", "routing", "weather", "links"].map((tab) => (
                    <TabButton key={tab} active={detailTab === tab} onClick={() => setDetailTab(tab)}>
                      {tab}
                    </TabButton>
                  ))}
                </div>

                {detailTab === "overview" && (
                  <div className="detail-card">
                    <div className="detail-text">{selected?.overview}</div>
                    {selected?.seniorNotes && <div className="notice"><strong>Senior note:</strong> {selected.seniorNotes}</div>}
                    <div className="mini-grid">
                      {selected?.bestTime && (
                        <div className="mini-card">
                          <div className="mini-title"><CloudSun size={16} /> Best time</div>
                          <div>{selected.bestTime}</div>
                        </div>
                      )}
                      {selected?.cost && (
                        <div className="mini-card">
                          <div className="mini-title"><Star size={16} /> Cost</div>
                          <div>{selected.cost}</div>
                        </div>
                      )}
                    </div>
                    {selected?.highlights && (
                      <div className="tag-row">
                        {selected.highlights.map((h) => (
                          <span key={h} className="tag">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {detailTab === "photos" && (
                  <div className="detail-card">
                    <div className="inline-photo-grid">
                      {photos.map((src, idx) => (
                        <div key={`${src}-${idx}`} className="inline-photo">
                          <img src={src} alt={`${selected?.name || "Place"} ${idx + 1}`} />
                        </div>
                      ))}
                    </div>
                    <div className="cards-grid">
                      {photoLinks.map((photo, idx) => (
                        <a key={photo.id} href={photo.url} target="_blank" rel="noreferrer" className="photo-portal">
                          <div className="photo-portal-icon"><Camera size={32} /></div>
                          <div className="photo-portal-title">Photo {idx + 1}</div>
                          <div className="photo-portal-sub">Google Images portal</div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {detailTab === "routing" && (
                  <div className="detail-card split">
                    <div className="mini-card">
                      <div className="mini-title"><Navigation size={16} /> Routing snapshot</div>
                      <div><strong>Drive from previous stop:</strong> {roundedDrive(selected?.driveFromPrev)}</div>
                      <div><strong>Nearest route city:</strong> {selectedStop?.name || "On route"}</div>
                      <div><strong>Next major stop:</strong> {nextRouteStop?.name || "Final destination reached"}</div>
                    </div>
                    <div className="mini-card">
                      <div className="mini-title"><Clock3 size={16} /> Pacing notes</div>
                      <div>Daily pace: {paceLabel}</div>
                      <div>Heat-sensitive mode: {heatSensitive ? "On" : "Off"}</div>
                      <div>Rest stops visible: {showRestStops ? "Yes" : "No"}</div>
                    </div>
                  </div>
                )}

                {detailTab === "weather" && (
                  <div className="detail-card">
                    <div className="mini-grid three">
                      <div className="mini-card">
                        <div className="mini-title"><ThermometerSun size={16} /> Best months</div>
                        <div>{selectedStop?.bestMonths || "Shoulder seasons"}</div>
                      </div>
                      <div className="mini-card">
                        <div className="mini-title"><Sun size={16} /> Temperature hint</div>
                        <div>{selectedStop?.temperatureHint || "Check forecast"}</div>
                      </div>
                      <div className="mini-card">
                        <div className="mini-title"><Heart size={16} /> Heat strategy</div>
                        <div>{heatSensitive ? "Strict" : "Flexible"}</div>
                      </div>
                    </div>
                    {selected?.weatherTip && <div className="notice"><strong>Tip:</strong> {selected.weatherTip}</div>}
                    <div className="link-row">
                      <DetailLink href={selected?.weather || selectedStop?.weather} label="Open weather" />
                    </div>
                  </div>
                )}

                {detailTab === "links" && (
                  <div className="detail-card">
                    <div className="link-row">
                      <DetailLink href={selected?.website} label="Official site" />
                      <DetailLink href={selected?.reserveLink} label="Cost / reservations" />
                      <DetailLink href={selected?.wiki} label="Wikipedia" />
                      <DetailLink href={selected?.viator} label="Viator" />
                      <DetailLink href={selected?.googleMaps} label="Google Maps" />
                      <DetailLink href={selected?.googleImages} label="Google Images" />
                    </div>
                    {selected?.nearby && (
                      <div className="nearby-list">
                        {selected.nearby.map((n) => (
                          <div key={n} className="nearby-item">• {n}</div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </SectionCard>
            </div>
          )}

          {mobileTab !== "explore" && (
            <div className="two-col">
              <SectionCard title="Smart itinerary builder" subtitle="Rounded drive times and senior-friendly pacing.">
                <div className="planner-list">
                  {currentDayPlan.map((day) => (
                    <div key={day.day} className="planner-card">
                      <div className="planner-head">
                        <div>
                          <div className="planner-day">Day {day.day}</div>
                          <div className="planner-title">{day.title}</div>
                        </div>
                        <span className="pill warm">Drive ≈ {roundedDrive(day.drive)}</span>
                      </div>
                      <div className="planner-plan">{day.plan}</div>
                      <div className="planner-sleep">Sleep: {day.sleep}</div>
                    </div>
                  ))}
                </div>
              </SectionCard>

              <div className="stack">
                <SectionCard
                  title="Saved places"
                  subtitle="Stored on this device."
                  right={<IconButton icon={Share2} onClick={shareTrip}>Share trip</IconButton>}
                >
                  {savedItems.length === 0 ? (
                    <div className="empty-card">No saved places yet. Save a few from the explore panel.</div>
                  ) : (
                    <div className="planner-list">
                      {savedItems.map((item) => (
                        <button key={item.id} onClick={() => setSelected(item)} className="saved-card">
                          <div>
                            <div className="saved-type">{item.type.replaceAll("-", " ")}</div>
                            <div className="saved-name">{item.name}</div>
                          </div>
                          <CheckCircle2 size={18} color="#16a34a" />
                        </button>
                      ))}
                    </div>
                  )}
                </SectionCard>

                <SectionCard title="Trip notebook" subtitle="Keep reminders, show ideas, and family notes here.">
                  <textarea
                    value={tripNotes}
                    onChange={(e) => setTripNotes(e.target.value)}
                    placeholder="Example: Mom likes quieter Vegas hotels, Dad wants scenic overlooks, check Smith Center..."
                    className="notes-area"
                  />
                </SectionCard>

                <SectionCard title="Scavenger hunt" subtitle="Tiny family side quests.">
                  <div className="planner-list">
                    {challenges.map((challenge, idx) => (
                      <div key={challenge} className="challenge-card">
                        <div className="challenge-icon"><Trophy size={16} /></div>
                        <div>
                          <div className="challenge-title">Challenge {idx + 1}</div>
                          <div className="challenge-text">{challenge}</div>
                        </div>
                      </div>
                    ))}
                    <div className="wisdom-card">
                      <div className="wisdom-title"><Sparkles size={18} /> Road wisdom</div>
                      <div className="wisdom-text">The desert rewards humility, hydration, and hats. The grandparents reward air conditioning and punctual lunch.</div>
                    </div>
                  </div>
                </SectionCard>
              </div>
            </div>
          )}

          <div className="website-tip">
            <div className="website-tip-title">Website tip</div>
            <div>This version is designed to work as a free website. On iPhone, open it in Safari and use <strong>Share → Add to Home Screen</strong> for the easiest app-like experience.</div>
          </div>
        </main>
      </div>

      <nav className="bottom-nav mobile-only">
        {mobileTabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button key={tab.key} onClick={() => setMobileTab(tab.key)} className={`bottom-nav-button ${mobileTab === tab.key ? "active" : ""}`}>
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
