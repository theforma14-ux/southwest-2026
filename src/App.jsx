
import React, { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, Polyline } from "react-leaflet";
import { BedDouble, Bookmark, Camera, Church, ExternalLink, Hotel, MapPin, Music4, Navigation, NotebookPen, Route, Search, Share2, Sparkles, Star, Sun, ThermometerSun, Trophy, UtensilsCrossed } from "lucide-react";

const routeStops = [
  { id: "denver", name: "Denver", lat: 39.7392, lng: -104.9903, overview: "Start here with snacks, patience, and a charged phone." },
  { id: "moab", name: "Moab", lat: 38.5733, lng: -109.5498, overview: "Gateway to Arches and canyon views." },
  { id: "torrey", name: "Torrey", lat: 38.2997, lng: -111.4199, overview: "Quiet base for Capitol Reef." },
  { id: "bryce", name: "Bryce Canyon City", lat: 37.6725, lng: -112.1563, overview: "Easy access to Bryce overlooks." },
  { id: "springdale", name: "Springdale", lat: 37.1889, lng: -112.9986, overview: "Pleasant Zion base with shade and hotels." },
  { id: "vegas", name: "Las Vegas", lat: 36.1699, lng: -115.1398, overview: "Finish strong with culture and shows." },
];

const attractions = [
  { id: "arches", name: "Arches National Park", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee", city: "Moab", lat: 38.7331, lng: -109.5925, category: "National Park", overview: "Easy big-wow scenery with viewpoints and short walks.", seniorNote: "Best with early starts and no-heroics touring.", cost: "$30 vehicle pass", weather: "https://www.nps.gov/arch/planyourvisit/weather.htm", official: "https://www.nps.gov/arch/index.htm", reserve: "https://www.nps.gov/arch/planyourvisit/fees.htm", viator: "https://www.viator.com/searchResults/all?text=Arches%20National%20Park", maps: "https://www.google.com/maps/search/Arches+National+Park", highlights: ["Windows", "Balanced Rock", "Delicate Arch viewpoint"], photos: ["https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80"] },
  { id: "deadhorse", name: "Dead Horse Point State Park", city: "Moab", lat: 38.481, lng: -109.741, category: "State Park", overview: "A huge canyon payoff with almost comically little walking.", seniorNote: "One of the best low-risk scenic choices on the whole route.", comida: 1, cost: "State park day-use fee", weather: "https://forecast.weather.gov/MapClick.php?textField1=38.4749&textField2=-109.7404", official: "https://stateparks.utah.gov/parks/dead-horse/", reserve: "https://stateparks.utah.gov/parks/dead-horse/", viator: "https://www.viator.com/searchResults/all?text=Dead%20Horse%20Point%20State%20Park", maps: "https://www.google.com/maps/search/Dead+Horse+Point+State+Park", highlights: ["Main overlook", "Short paved walks"], photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=80"] },
  { id: "capitolreef", name: "Capitol Reef National Park", city: "Torrey", lat: 38.2917, lng: -111.2615, category: "National Park", overview: "Quiet and scenic with orchards, geology, and gentle touring.", seniorNote: "Excellent for a lower-stress day between bigger parks.", comida: 1, cost: "$20 scenic drive fee or pass", weather: "https://www.nps.gov/care/planyourvisit/weather.htm", official: "https://www.nps.gov/care/index.htm", reserve: "https://www.nps.gov/care/planyourvisit/fees.htm", viator: "https://www.viator.com/searchResults/all?text=Capitol%20Reef%20National%20Park", maps: "https://www.google.com/maps/search/Capitol+Reef+National+Park", highlights: ["Scenic Drive", "Fruita", "Petroglyph panel"], photos: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1200&q=80"] },
  { id: "brycepark", name: "Bryce Canyon National Park", city: "Bryce Canyon City", lat: 37.593, lng: -112.1871, category: "National Park", overview: "A hoodoo theater where the best views are close to parking.", seniorNote: "Huge payoff without hard hiking.", comida: 1, cost: "$35 vehicle pass", weather: "https://www.nps.gov/brca/planyourvisit/weather.htm", official: "https://www.nps.gov/brca/index.htm", reserve: "https://www.nps.gov/brca/planyourvisit/fees.htm", viator: "https://www.viator.com/searchResults/all?text=Bryce%20Canyon%20National%20Park", maps: "https://www.google.com/maps/search/Bryce+Canyon+National+Park", highlights: ["Sunrise Point", "Sunset Point", "Bryce Point"], photos: ["https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80"] },
  { id: "zionpark", name: "Zion National Park", city: "Springdale", lat: 37.2982, lng: -113.0263, category: "National Park", overview: "The superstar canyon, best approached with shuttle use and strategic shade.", seniorNote: "Keep it simple: shuttle, riverside, viewpoints, and early starts.", comida: 2, cost: "$35 vehicle pass", weather: "https://www.nps.gov/zion/planyourvisit/weather.htm", official: "https://www.nps.gov/zion/index.htm", reserve: "https://www.nps.gov/zion/planyourvisit/fees.htm", viator: "https://www.viator.com/searchResults/all?text=Zion%20National%20Park", maps: "https://www.google.com/maps/search/Zion+National+Park", highlights: ["Pa'rus Trail", "Temple of Sinawava", "Shuttle access"], photos: ["https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=80","https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"] },
];

const marriottHotels = [
  { id: "springhill-moab", city: "Moab", name: "SpringHill Suites Moab", lat: 38.5907, lng: -109.5618, summary: "Closest Marriott-style base for Arches, with free hot breakfast and resort-style pools.", official: "https://www.marriott.com/en-us/hotels/cnyms-springhill-suites-moab/overview/", notes: ["Free breakfast", "Closest to Arches", "Good for 2-night base"] },
  { id: "redcliffs-moab", city: "Moab", name: "Red Cliffs Lodge Moab", lat: 38.573, lng: -109.493, summary: "Scenic river setting with a more destination feel.", official: "https://www.marriott.com/en-us/hotels/cnyrb-red-cliffs-lodge-moab/overview/", notes: ["Colorado River setting", "Scenic atmosphere", "Comfort-forward option"] },
  { id: "springhill-springdale", city: "Springdale", name: "SpringHill Suites Springdale Zion National Park", lat: 37.1774, lng: -113.0025, summary: "All-suite Zion base with free breakfast and EV charging.", official: "https://www.marriott.com/en-us/hotels/sguzi-springhill-suites-springdale-zion-national-park/overview/", notes: ["Free breakfast", "EV charging", "Very senior-friendly location"] },
  { id: "redcliffs-zion", city: "Springdale", name: "Red Cliffs Lodge Zion, Tribute Portfolio", lat: 37.1865, lng: -113.0055, summary: "Boutique Marriott option with pools and an easier comfort-trip feel.", official: "https://www.marriott.com/en-us/hotels/sguzb-the-red-cliffs-lodge-zion-a-tribute-portfolio-hotel/overview/", notes: ["Multiple pools", "Boutique feel", "Near Zion attractions"] },
  { id: "kanab", city: "Bryce Canyon City", name: "SpringHill Suites Kanab", lat: 37.0431, lng: -112.5311, summary: "Comfortable split between Bryce and Zion territory.", official: "https://www.marriott.com/en-us/hotels/pgaks-springhill-suites-kanab/overview/", notes: ["Free breakfast", "EV charging", "Good split-stay option"] },
  { id: "jw-vegas", city: "Las Vegas", name: "JW Marriott Las Vegas Resort & Spa", lat: 36.1774, lng: -115.3272, summary: "The anti-chaos Vegas Marriott.", official: "https://www.marriott.com/en-us/hotels/lasjw-jw-marriott-las-vegas-resort-and-spa/overview/", notes: ["Calmer Vegas base", "Resort feel", "Good for show-first trip"] },
];

const vegasShows = [
  { id: "smith-center", name: "The Smith Center", type: "Performing Arts", link: "https://thesmithcenter.com/", reason: "Broadway tours, music, and a polished cultural atmosphere." },
  { id: "sphere", name: "Sphere", type: "Spectacle", link: "https://www.thesphere.com/", reason: "A high-impact music and visual experience." },
  { id: "bellagio", name: "Bellagio Conservatory & Fountains", type: "Free Beauty Stop", link: "https://bellagio.mgmresorts.com/en/entertainment/bellagio-fountains.html", reason: "Flowers, water, and easy sightseeing. Very useful for winning over skeptics." },
  { id: "guardian-angel", name: "Guardian Angel Cathedral", type: "Catholic Stop", link: "https://www.guardianangelcathedral.org/", reason: "A quiet, meaningful stop that helps frame Vegas as more than neon and noise." },
];

const foodStops = [
  { city: "Moab", name: "Moab Nutritional Replenishment", note: "Protein-forward lunch, hydration stop, and no-rush dinner.", link: "https://www.google.com/maps/search/best+restaurants+in+Moab+Utah" },
  { city: "Springdale", name: "Springdale Nutritional Replenishment", note: "Breakfast before shuttle, cool indoor lunch, patio dinner later.", link: "https://www.google.com/maps/search/best+restaurants+in+Springdale+Utah" },
  { city: "Las Vegas", name: "Vegas Nutritional Replenishment", note: "Quiet brunch and a polished pre-show dinner are your best persuasion tools.", link: "https://www.google.com/maps/search/best+restaurants+in+Las+Vegas" },
];

const scavengerChallenges = [
  "Spot three different rock colors in one day.",
  "Take a triumphant family sunset photo.",
  "Find one scenic pullout and name it like a western movie.",
  "Find one place in Vegas that proves it can be classy.",
  "Complete one shade before pride break at exactly the right time.",
  "Have one meal so good it counts as cultural diplomacy.",
];

const dayPlans = {
  8: ["Denver to Moab", "Arches", "Dead Horse Point / easy Moab day", "Moab to Torrey", "Capitol Reef", "Torrey to Bryce", "Bryce to Springdale", "Springdale to Las Vegas"],
  9: ["Denver to Moab", "Arches", "Moab bonus day", "Moab to Torrey", "Capitol Reef", "Torrey to Bryce", "Bryce full day", "Bryce to Springdale", "Springdale to Las Vegas"],
};

const routePolyline = routeStops.map((s) => [s.lat, s.lng]);
const orangeIcon = new L.DivIcon({ className: "custom-marker", html: '<div class="marker-dot"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });

function linkify(name) {
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(name + " scenic photos")}`;
}
function SectionTitle({ icon: Icon, title, subtitle }) {
  return <div className="section-head"><div className="section-head-title"><Icon size={18} /><span>{title}</span></div>{subtitle ? <p>{subtitle}</p> : null}</div>;
}
function ActionLink({ href, label }) {
  return <a className="action-link" href={href} target="_blank" rel="noreferrer"><ExternalLink size={14} /><span>{label}</span></a>;
}

export default function App() {
  const [selectedTripLength, setSelectedTripLength] = useState(9);
  const [activeTab, setActiveTab] = useState("Attractions");
  const [search, setSearch] = useState("");
  const [selectedAttraction, setSelectedAttraction] = useState(attractions[0]);
  const [savedScavenger, setSavedScavenger] = useState([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const raw = localStorage.getItem("southwest-2026-v2");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw);
      if (parsed.selectedTripLength) setSelectedTripLength(parsed.selectedTripLength);
      if (parsed.selectedAttractionId) {
        const found = attractions.find((a) => a.id === parsed.selectedAttractionId);
        if (found) setSelectedAttraction(found);
      }
      if (Array.isArray(parsed.savedScavenger)) setSavedScavenger(parsed.savedScavenger);
      if (typeof parsed.notes === "string") setNotes(parsed.notes);
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("southwest-2026-v2", JSON.stringify({ selectedTripLength, selectedAttractionId: selectedAttraction.id, savedScavenger, notes }));
  }, [selectedTripLength, selectedAttraction, savedScavenger, notes]);

  const filteredAttractions = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return attractions;
    return attractions.filter((item) => (`${item.name} ${item.city} ${item.category} ${item.overview}`.toLowerCase()).includes(q));
  }, [search]);

  const relatedHotels = marriottHotels.filter((h) => h.city === selectedAttraction.city || (selectedAttraction.city === "Bryce Canyon City" && h.city === "Bryce Canyon City"));
  const photos = selectedAttraction.photos || [];
  const photoPortal = linkify(selectedAttraction.name);

  const toggleChallenge = (index) => setSavedScavenger((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  const shareTrip = async () => {
    const text = `Southwest 2026\nTrip length: ${selectedTripLength} days\nMain route: Denver → Moab → Torrey → Bryce → Zion → Las Vegas`;
    try {
      if (navigator.share) await navigator.share({ title: "Southwest 2026", text });
      else { await navigator.clipboard.writeText(text); alert("Trip summary copied to clipboard."); }
    } catch {}
  };

  return (
    <div className="shell">
      <header className="hero">
        <div className="brand"><div className="brand-icon"><Route size={22} /></div><div><h1>Southwest 2026</h1><p>Interactive map, better photos, Marriott picks, trip planning, and scavenger hunt mode.</p></div></div>
        <div className="hero-grid">
          <div className="info-card"><div className="label">Route</div><div className="value">Denver → Moab → Capitol Reef → Bryce → Zion → Las Vegas</div></div>
          <div className="info-card"><div className="label">Pacing</div><div className="value">Senior-smart, shade-first, low-risk sightseeing</div></div>
          <div className="info-card"><div className="label">Goal</div><div className="value">Balanced, comfortable, scenic Southwest adventure</div></div>
        </div>
        <div className="control-row">
          <div className="trip-switches">{[8, 9].map((d) => <button key={d} className={`trip-button ${selectedTripLength === d ? "active" : ""}`} onClick={() => setSelectedTripLength(d)}>{d} days</button>)}</div>
          <button className="share-button" onClick={shareTrip}><Share2 size={16} />Share trip</button>
        </div>
      </header>

     <div style={{display: "flex", gap: "10px", padding: "10px 0", flexWrap: "wrap"}}>
  <button>Attractions</button>
  <button>Marriott Hotels</button>
  <button>National Parks</button>
  <button>State Parks</button>
  <button>Catholic Sites</button>
  <button>Restaurants</button>
</div> <main className="main-grid">
        <section className="panel">
          <SectionTitle icon={Navigation} title="Real interactive map" subtitle="Tap markers for cities, parks, and hotels." />
          <div className="map-wrap">
            <MapContainer center={[38.25, -111.2]} zoom={6} scrollWheelZoom={true} className="leaflet-box">
              <TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Polyline positions={routePolyline} pathOptions={{ color: "#c2410c", weight: 4 }} />
              {routeStops.map((stop) => <Marker key={stop.id} position={[stop.lat, stop.lng]} icon={orangeIcon}><Popup><strong>{stop.name}</strong><div>{stop.overview}</div></Popup></Marker>)}
              {attractions.map((item) => <Marker key={item.id} position={[item.lat, item.lng]} icon={orangeIcon}><Popup><strong>{item.name}</strong><div>{item.overview}</div><a href={item.maps} target="_blank" rel="noreferrer">Open in Maps</a></Popup></Marker>)}
              {marriottHotels.map((hotel) => <Marker key={hotel.id} position={[hotel.lat, hotel.lng]} icon={orangeIcon}><Popup><strong>{hotel.name}</strong><div>{hotel.summary}</div><a href={hotel.official} target="_blank" rel="noreferrer">Book on Marriott</a></Popup></Marker>)}
            </MapContainer>
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={MapPin} title="Pick a highlight" subtitle="Search, tap, and swap the gallery instantly." />
          <div className="search-box"><Search size={18} /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search parks, cities, and gems" /></div>
          <div className="card-list">
            {filteredAttractions.map((item) => (
              <button key={item.id} className={`attraction-card ${selectedAttraction.id === item.id ? "active" : ""}`} onClick={() => setSelectedAttraction(item)}>
                <div className="attraction-type">{item.category}</div><div className="attraction-name">{item.name}</div><div className="attraction-city">{item.city}</div><div className="attraction-overview">{item.overview}</div><div className="comida">{item.comida} Comida</div>
              </button>
            ))}
          </div>
        </section>

        <section className="panel span-two">
          <div className="detail-top"><div><SectionTitle icon={Camera} title={selectedAttraction.name} subtitle={`${selectedAttraction.city} · ${selectedAttraction.category}`} /></div>
            <div className="link-row">
              <ActionLink href={selectedAttraction.official} label="Official site" />
              <ActionLink href={selectedAttraction.reserve} label="Cost / reservations" />
              <ActionLink href={selectedAttraction.weather} label="Weather" />
              <ActionLink href={selectedAttraction.viator} label="Tours" />
            </div>
          </div>
          <div className="detail-grid">
            <div className="detail-text-card">
              <div className="detail-body">{selectedAttraction.overview}</div>
              <div className="notice"><strong>Senior note:</strong> {selectedAttraction.seniorNote}</div>
              <div className="mini-grid">
                <div className="mini-card"><div className="mini-head"><Star size={16} />Cost</div><div>{selectedAttraction.cost}</div></div>
                <div className="mini-card"><div className="mini-head"><Sun size={16} />Best time</div><div>{selectedAttraction.city === "Moab" ? "Sunrise / sunset" : "Morning or evening"}</div></div>
                <div className="mini-card"><div className="mini-head"><ThermometerSun size={16} />Heat note</div><div>{selectedAttraction.city === "Springdale" ? "Start very early" : "Hydration first"}</div></div>
              </div>
              <div className="tag-row">{selectedAttraction.highlights.map((h) => <span className="tag" key={h}>{h}</span>)}</div>
            </div>
            <div className="gallery-grid">
              {photos.map((src, idx) => <div key={`${src}-${idx}`} className={`gallery-tile ${idx === 0 ? "hero" : ""}`}><img src={src} alt={`${selectedAttraction.name} ${idx + 1}`} /></div>)}
              <a className="photo-more" href={photoPortal} target="_blank" rel="noreferrer"><Camera size={18} /><span>More photos</span></a>
            </div>
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={Hotel} title="Marriott integration" subtitle="Official Marriott booking links, chosen for comfort and logistics." />
          <div className="card-list">
            {(relatedHotels.length ? relatedHotels : marriottHotels).map((hotel) => (
              <a key={hotel.id} href={hotel.official} target="_blank" rel="noreferrer" className="simple-card">
                <div className="simple-title">{hotel.name}</div><div className="simple-sub">{hotel.city}</div><div className="simple-text">{hotel.summary}</div><ul>{hotel.notes.map((n) => <li key={n}>{n}</li>)}</ul>
              </a>
            ))}
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={Music4} title="Vegas shows to win over Mom" subtitle="Culture-forward choices, not random casino wandering." />
          <div className="card-list">
            {vegasShows.map((show) => <a key={show.id} href={show.link} target="_blank" rel="noreferrer" className="simple-card"><div className="simple-title">{show.name}</div><div className="simple-sub">{show.type}</div><div className="simple-text">{show.reason}</div></a>)}
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={UtensilsCrossed} title="Nutritional Replenishment" subtitle="Good meals are part of the medical strategy." />
          <div className="card-list">
            {foodStops.map((stop) => <a key={stop.name} href={stop.link} target="_blank" rel="noreferrer" className="simple-card"><div className="simple-title">{stop.name}</div><div className="simple-sub">{stop.city}</div><div className="simple-text">{stop.note}</div></a>)}
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={NotebookPen} title="Suggested itinerary" subtitle={`${selectedTripLength}-day version`} />
          <div className="card-list">
            {(dayPlans[selectedTripLength] || []).map((day, idx) => <div key={day} className="itinerary-card"><div className="itinerary-day">Day {idx + 1}</div><div className="itinerary-title">{day}</div></div>)}
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={Trophy} title="Scavenger hunt system" subtitle="Track wins on this device as you go." />
          <div className="scavenger-list">
            {scavengerChallenges.map((challenge, idx) => {
              const checked = savedScavenger.includes(idx);
              return <button key={challenge} className={`scavenger-item ${checked ? "checked" : ""}`} onClick={() => toggleChallenge(idx)}><div className="scavenger-left"><div className="checkbox">{checked ? "✓" : ""}</div><div><div className="challenge-title">Challenge {idx + 1}</div><div className="challenge-text">{challenge}</div></div></div></button>;
            })}
          </div>
        </section>

        <section className="panel">
          <SectionTitle icon={Church} title="Vegas can be more than Vegas" subtitle="A final persuasion panel." />
          <div className="wisdom-card"><Sparkles size={18} /><span>Choose one beautiful show, one calm hotel, one fine dinner, and one scenic stop. Suddenly Vegas becomes a cultured finale instead of a neon endurance test.</span></div>
        </section>

        <section className="panel span-two">
          <SectionTitle icon={Bookmark} title="Trip notebook" subtitle="Keep show ideas, family preferences, and reservations here." />
          <textarea className="notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Example: Mom likes calmer hotels, book Smith Center first, target sunrise at Bryce..." />
        </section>
      </main>
    </div>
  );
}
