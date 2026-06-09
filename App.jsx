// App — SPA state machine + project data. Routes: home / projects / detail / about / contact.
// `selected: false` keeps a project out of the "selected" (all) view but still lists it
// under its discipline filters (scenography / production / communication design / research).
const PROJECTS = [
  { id: "translated", title: "Translated into Socialism", year: "2024",
    selected: false,
    tags: "Scenography, Production, Communication Design",
    location: "Salt Galata, Istanbul, Turkey",
    disciplines: "scenography, production, visual communication",
    links: [{ label: "// saltonline.org", href: "https://saltonline.org" },
            { label: "// lumbardhi.org", href: "https://lumbardhi.org" }],
    text: "<em>Translated into Socialism</em> presents the little-known history of the Turkish-speaking community in Yugoslavia, more precisely, in Kosovo and Macedonia. It explores how, in a multinational social context, a Turkish identity was affirmed and transformed under socialist ideology.",
    body: [
      "<em>Translated into Socialism</em> presents the little-known history of the Turkish-speaking community in Yugoslavia, more precisely, in Kosovo and Macedonia. It explores how, in a multinational social context, a Turkish identity was affirmed and transformed under socialist ideology.",
    ] },
  { id: "forward-march", title: "Forward, March!", year: "2019",
    tags: "Scenography, Production", location: "Salt Beyoğlu, Istanbul, Turkey",
    disciplines: "scenography, production",
    links: [{ label: "// saltonline.org", href: "https://saltonline.org" },
            { label: "// Google Arts and Culture", href: "https://artsandculture.google.com" }],
    body: [
      "Conducting a collaborative research since 2012, Maria Andersson and Nancy Atakan study Turkey's integration of Swedish physical culture practices as part of the modernization efforts in the early 20th century. Investigating the adaptation of gymnastics techniques and folkloric elements, the artists unfold narratives on Selim Sırrı Tarcan, the founder of physical education and the Olympics Committee in Turkey, as well as on the accomplishments of his daughters.",
      "Wooden bars, used by athletes for various warm-up exercises and performances, serve as the base for the exhibition furniture; canvas prints of the main text, drawings by artists, and videos displayed on different types of screens are placed on scaled versions of these wooden bars.",
      "The adaptation of Maria Andersson's work <em>Anthem</em> as an interactive book format is also installed in a circular arrangement on the columns.",
      "In this context, the Forum at Salt Beyoğlu is transformed into a gymnasium, incorporating dashed lines on both the floor and surrounding walls, alongside wooden stretching bars and hanging rings. As soon as visitors step into the structure, they find themselves in the gymnasium and hear the Youth Anthem coming from the nearest video piece.",
    ],
    // ── Composed grid (the showcase). Edit these numbers, or use the Tweaks panel
    //    Edit mode to drag/resize blocks live, then “Copy layout” back into here.
    layout: [
      { id: "img1", type: "image", w: 820, x: 1, y: 1, ratio: "3/2" },
      { id: "txt1", type: "text", w: 400, x: 9, y: 5, body: [
        "Conducting a collaborative research since 2012, Maria Andersson and Nancy Atakan study Turkey’s integration of Swedish physical culture practices as part of the modernization efforts in the early 20th century. Investigating the adaptation of gymnastics techniques and folkloric elements, the artists unfold narratives on Selim Sırrı Tarcan, the founder of physical education and the Olympics Committee in Turkey, as well as on the accomplishments of his daughters.",
      ] },
      { id: "img2", type: "image", w: 440, x: 2, y: 17, ratio: "2/3" },
      { id: "txt2", type: "text", w: 520, x: 7, y: 19, body: [
        "Wooden bars, used by athletes for various warm-up exercises and performances, serve as the base for the exhibition furniture; canvas prints of the main text, drawings by artists, and videos displayed on different types of screens are placed on scaled versions of these wooden bars.",
      ] },
      { id: "img3", type: "image", w: 940, x: 3, y: 36, ratio: "16/9" },
      { id: "txt3", type: "text", w: 400, x: 1, y: 52, body: [
        "The adaptation of Maria Andersson's work <em>Anthem</em> as an interactive book format is also installed in a circular arrangement on the columns.",
      ] },
      { id: "img4", type: "image", w: 600, x: 6, y: 53, ratio: "1/1" },
      { id: "txt4", type: "text", w: 620, x: 2, y: 72, body: [
        "In this context, the Forum at Salt Beyoğlu is transformed into a gymnasium, incorporating dashed lines on both the floor and surrounding walls, alongside wooden stretching bars and hanging rings. As soon as visitors step into the structure, they find themselves in the gymnasium and hear the Youth Anthem coming from the nearest video piece.",
      ] },
      { id: "img5", type: "image", w: 1100, x: 2, y: 84, ratio: "21/9" },
    ] },
  { id: "designers-note", title: "Designer's Note", year: "2024",
    selected: false,
    tags: "Scenography, Production", location: "Theatre, Berlin",
    disciplines: "scenography, production", links: [],
    text: "A staged essay on the role of the designer in collaborative theatre-making." },
  { id: "notes-on-air", title: "Notes on Air", year: "2024",
    tags: "Scenography, Production", location: "Radio commission",
    disciplines: "production", links: [],
    text: "A sound-led production exploring atmosphere as material.",
    // Layout reconstructed from the project's saved images after a localStorage wipe.
    layout: [
      { id: "bmpx1qqql", type: "image", w: 900, x: 2, y: 1,  ratio: "3/2" },
      { id: "bmpx1s6x7", type: "image", w: 520, x: 12, y: 30, ratio: "3/2" },
      { id: "bmpx1slnu", type: "image", w: 440, x: 3,  y: 34, ratio: "2/3" },
      { id: "bmpx1ztbi", type: "image", w: 940, x: 3,  y: 68, ratio: "3/2" },
      { id: "bmpx2003b", type: "image", w: 600, x: 8,  y: 98, ratio: "3/2" },
    ] },
  { id: "pnemo", title: "Pnemo", year: "2024",
    selected: false,
    tags: "Program", location: "Research residency",
    disciplines: "program", links: [],
    text: "An ongoing research project on breath, space, and presence." },
  { id: "let-us-go", title: "Let Us Go Back to the Beginning", year: "2024",
    selected: false,
    tags: "Scenography, Production, Communication Design", location: "Festival, Skopje",
    disciplines: "scenography, production, communication design", links: [],
    text: "A scenographic return to origins, staged across a former industrial site." },
  { id: "three-seas", title: "In the Realm of Three Inland Seas", year: "2023",
    selected: false,
    tags: "Scenography, Production", location: "Touring production",
    disciplines: "scenography, production", links: [],
    text: "A touring production mapping three landlocked seas as dramaturgical space." },
  { id: "no-records", title: "No Further Records", year: "2023",
    tags: "Scenography, Production, Communication Design", location: "Archive installation",
    disciplines: "scenography, production, communication design", links: [],
    text: "An installation on the limits of the archive and what escapes the record." },
  { id: "one-and-many", title: "One and the Many", year: "2016",
    tags: "Scenography", location: "", disciplines: "scenography", links: [] },
  { id: "90s-onstage", title: "The 90s Onstage", year: "2022",
    tags: "Scenography", location: "", disciplines: "", links: [] },
  { id: "trash", title: "Trash", year: "2026",
    tags: "Program", location: "", disciplines: "program", links: [] },
  { id: "little-did-they-know", title: "The 90s Onstage #2", year: "2021",
    tags: "Scenography", location: "", disciplines: "scenography", links: [] },

  // ── Additional works — kept out of "selected", listed under their discipline filters
  { id: "breaking-dam", title: "Breaking Through a Dam", year: "2026", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "subsoil", title: "Subsoil", year: "2026", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "epipe", title: "Epipe", year: "2026", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "tapestry-studio", title: "We've Been at the Tapestry Studio Since the 90s", year: "2025", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "dark-world", title: "Dark World", year: "2025",
    tags: "Scenography, Production, Communication Design", location: "", disciplines: "scenography, production, communication design", links: [],
    // Layout reconstructed from the project's saved images after a localStorage wipe.
    // Block ids match the persisted image-slot keys so each image reloads in place.
    layout: [
      { id: "bmpwpeqrn", type: "image", w: 520,  x: 1,  y: 1,   ratio: "3/4" },
      { id: "bmpwrp7dt", type: "image", w: 560,  x: 13, y: 6,   ratio: "4/3" },
      { id: "bmpws0fns", type: "image", w: 940,  x: 3,  y: 38,  ratio: "4/3" },
      { id: "bmpws0ov3", type: "image", w: 480,  x: 2,  y: 72,  ratio: "4/3" },
      { id: "bmpws245c", type: "image", w: 520,  x: 12, y: 76,  ratio: "4/3" },
      { id: "bmpws3mnt", type: "image", w: 1100, x: 2,  y: 100, ratio: "4/3" },
      { id: "bmpws7xjz", type: "image", w: 600,  x: 4,  y: 140, ratio: "3/2" },
      { id: "bmpws8kev", type: "image", w: 440,  x: 14, y: 144, ratio: "2/3" },
    ] },
  { id: "anatolian-plant", title: "Anatolian Plant Legacy", year: "2025", selected: false,
    tags: "Scenography, Production, Communication Design", location: "", disciplines: "scenography, production, communication design", links: [] },
  { id: "foodprint", title: "Foodprint", year: "2022", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "production", links: [] },
  { id: "into-unknown", title: "Into the Unknown", year: "2022",
    tags: "Scenography, Production, Communication Design", location: "", disciplines: "scenography, production, communication design", links: [] },
  { id: "sequential-v", title: "The Sequential V", year: "2022", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "skin-body-i", title: "The Skin, Body, and I", year: "2021", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "sequential-iv", title: "The Sequential IV", year: "2021", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "climavore", title: "Climavore: Seasons Made to Drift", year: "2021",
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "sequential-iii", title: "The Sequential III", year: "2021", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "sequential-ii", title: "The Sequential II", year: "2021", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "sequential-i", title: "The Sequential I", year: "2021", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "philistine", title: "And Therefore A Philistine - Basma Alsharif", year: "2020", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "bauhaus-imaginista", title: "bauhaus imaginista", year: "2020", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "blissful-souvenirs", title: "Our Blissful Souvenirs", year: "2019", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },
  { id: "mihri", title: "Mihri: A Migrant Painter of Modern Times", year: "2019", selected: false,
    tags: "Scenography, Production", location: "", disciplines: "scenography, production", links: [] },

  // ── Online works — listed under the "online" filter
  { id: "psm-association", title: "Painting and Sculpture Museums Association", year: "2022", selected: false,
    tags: "Online", location: "", disciplines: "online", links: [] },
  { id: "salt-panorama", title: "Salt Panorama", year: "2022", selected: false,
    tags: "Online", location: "", disciplines: "online", links: [] },
  { id: "exhausted", title: "Exhausted", year: "2021", selected: false,
    tags: "Online", location: "", disciplines: "online", links: [] },
  { id: "home-section", title: "Home-Section", year: "2020", selected: false,
    tags: "Online", location: "", disciplines: "online", links: [] },
  { id: "woman-patrons", title: "Map of Woman Patrons' Structures in Ottoman Istanbul", year: "2020", selected: false,
    tags: "Online", location: "", disciplines: "online", links: [] },
];

// ── Durable content store ────────────────────────────────────────────────────
// Every author edit — per-project layouts, in-place header edits, the "selected"
// flag, and the draft/publish flag — persists to a PROJECT FILE sidecar
// (atelier-content.state.json) using the SAME bridge the images use:
//   • read with fetch()              → works anywhere the HTML + sidecar travel
//                                       together (share links, downloaded zips,
//                                       a copy moved to another folder/computer)
//   • write via window.omelette.writeFile → persists into the project itself
// localStorage is kept only as an offline cache so edits still show if the page
// is opened with no sidecar reachable. The sidecar is the source of truth, so
// moving the file or switching browsers no longer loses layouts or text.
const CONTENT_FILE = "atelier-content.state.json";
const LS_CACHE = "atelier:content:v1";
const SECTIONS = ["layouts", "headers", "selected", "published", "projects", "homePinned", "homeTitleColors"];

function blankContent() { return { layouts: {}, headers: {}, selected: {}, published: {}, projects: {}, homePinned: {}, homeTitleColors: {} }; }
// Default homepage order (used before the author makes any changes)
const DEFAULT_HOME_ORDER = ["trash","no-records","one-and-many","90s-onstage","climavore","little-did-they-know","forward-march"];
// Merge two content objects section-by-section; `over` wins per key.
function mergeContent(base, over) {
  const out = blankContent();
  base = base || {}; over = over || {};
  for (const s of SECTIONS) out[s] = Object.assign({}, base[s] || {}, over[s] || {});
  return out;
}
// Read the offline cache, promoting any legacy per-key localStorage (v1) into it
// once so existing browser edits aren't dropped by the migration.
function readLocalContent() {
  let cache = {};
  try { cache = JSON.parse(localStorage.getItem(LS_CACHE)) || {}; } catch (e) {}
  const legacy = blankContent();
  try { legacy.layouts = JSON.parse(localStorage.getItem("atelier:layouts:v1")) || {}; } catch (e) {}
  try { legacy.headers = JSON.parse(localStorage.getItem("atelier:headers:v1")) || {}; } catch (e) {}
  try { legacy.selected = JSON.parse(localStorage.getItem("atelier:selected:v1")) || {}; } catch (e) {}
  try { legacy.published = JSON.parse(localStorage.getItem("atelier:published:v1")) || {}; } catch (e) {}
  return mergeContent(legacy, cache); // newer unified cache wins over legacy
}

// Serialized writer (mirrors image-slot.js): coalesces rapid edits so two writes
// can't reorder at the backend. Always writes the cache; writes the sidecar when
// the host bridge is present.
let _saving = false, _again = false, _latest = null;
function persistContent(data) {
  _latest = data;
  try { localStorage.setItem(LS_CACHE, JSON.stringify(data)); } catch (e) {}
  const w = window.omelette && window.omelette.writeFile;
  if (!w) return;
  if (_saving) { _again = true; return; }
  _saving = true;
  Promise.resolve(w(CONTENT_FILE, JSON.stringify(_latest)))
    .catch(() => {})
    .then(() => { _saving = false; if (_again) { _again = false; persistContent(_latest); } });
}

// Trigger a browser download of a text file (used by "Download site files").
// Lets the author grab the two state files and upload them to GitHub to publish.
function downloadFile(name, text, type) {
  try {
    const blob = new Blob([text], { type: type || "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(() => { try { document.body.removeChild(a); } catch (e) {} URL.revokeObjectURL(url); }, 200);
  } catch (e) {}
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "showGrid": true,
  "showCoords": true,
  "editLayout": false,
  "columns": 48,
  "gridWidth": 1200,
  "rowHeight": 25
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Route state persists to sessionStorage so a viewport resize / reload that
  // remounts the app keeps you on the same page instead of snapping back home.
  const ssGet = (k, d) => { try { return sessionStorage.getItem(k) || d; } catch (e) { return d; } };
  const [page, setPage] = React.useState(() => ssGet("atelier:page", "home"));
  const [selId, setSelId] = React.useState(() => ssGet("atelier:selId", "") || null);
  const [filter, setFilter] = React.useState(() => ssGet("atelier:filter", "all"));
  React.useEffect(() => { try { sessionStorage.setItem("atelier:page", page); } catch (e) {} }, [page]);
  React.useEffect(() => { try { sessionStorage.setItem("atelier:selId", selId || ""); } catch (e) {} }, [selId]);
  React.useEffect(() => { try { sessionStorage.setItem("atelier:filter", filter); } catch (e) {} }, [filter]);
  // One durable content object (layouts / headers / selected / published). Seeds
  // instantly from the offline cache, then the project-file sidecar hydrates over
  // it once the fetch lands. All writes go through persistContent → project file.
  const [content, setContent] = React.useState(readLocalContent);
  const contentRef = React.useRef(content);
  contentRef.current = content;
  const editedRef = React.useRef(false); // true once the author changes anything this session
  const [selBlock, setSelBlock] = React.useState(null);
  const [copied, setCopied] = React.useState(false);

  // Hydrate from the project-file sidecar once on mount. The sidecar is the shared
  // source of truth, so it wins over the initial local cache — UNLESS the author
  // already made an edit before the fetch resolved (then their change wins).
  React.useEffect(() => {
    let alive = true;
    fetch(CONTENT_FILE).then((r) => (r.ok ? r.json() : null)).then((j) => {
      if (!alive || !j || typeof j !== "object") return;
      setContent((prev) => {
        const next = editedRef.current ? mergeContent(j, prev) : mergeContent(prev, j);
        contentRef.current = next;
        return next;
      });
    }).catch(() => {});
    return () => { alive = false; };
  }, []);

  // Apply an updater to one section and persist the whole object to the sidecar.
  const writeSection = (section, updater) => {
    editedRef.current = true;
    setContent((prev) => {
      const next = Object.assign({}, prev, { [section]: updater(prev[section] || {}) });
      contentRef.current = next;
      persistContent(next);
      return next;
    });
  };

  const layouts = content.layouts;
  const headers = content.headers;
  const selectedProjects = content.selected;
  const publishedProjects = content.published;
  // homePinned: { id: orderIndex } — empty until author first touches it, then seed from DEFAULT_HOME_ORDER
  const rawHomePinned = content.homePinned || {};
  const homePinned = Object.keys(rawHomePinned).length > 0
    ? rawHomePinned
    : Object.fromEntries(DEFAULT_HOME_ORDER.map((id, i) => [id, i]));
  // Code projects + any author-created projects (persisted in the sidecar).
  const allProjects = React.useMemo(
    () => [...PROJECTS, ...Object.values(content.projects || {})],
    [content.projects]
  );

  // allProjects with header overrides merged in — used for filter derivation so
  // discipline edits on the project page are immediately reflected in the filter bar.
  const mergedProjects = React.useMemo(
    () => allProjects.map((p) => {
      const override = headers[p.id];
      return override ? { ...p, ...override } : p;
    }),
    [allProjects, headers]
  );
  const go = (p, id) => { if (id) setSelId(id); setPage(p); setSelBlock(null); window.scrollTo(0, 0); };
  const baseProject = allProjects.find((p) => p.id === selId) || allProjects[0];
  // Merge any saved header edits over the code project (links array is replaced wholesale).
  const headOverride = headers[baseProject.id] || {};
  // Merge selected override (if undefined in override, use base project's selected).
  const selectedOverride = selectedProjects[baseProject.id];
  const publishedOverride = publishedProjects[baseProject.id];
  const project = { ...baseProject, ...headOverride,
    selected: selectedOverride !== undefined ? selectedOverride : baseProject.selected,
    published: publishedOverride !== undefined ? publishedOverride : (baseProject.published !== false) };

  const defaultLayout = (pid) => (allProjects.find((p) => p.id === pid) || {}).layout || [];
  const layout = layouts[project.id] || defaultLayout(project.id);
  const setLayout = (arr) => writeSection("layouts", (m) => ({ ...m, [project.id]: arr }));

  const actions = {
    add: (type) => {
      const id = "b" + Date.now().toString(36);
      const maxY = layout.reduce((m, b) => Math.max(m, b.y + (b.type === "text" || b.type === "link" ? 4 : 8)), 1);
      const nb = type === "image"
        ? { id, type: "image", w: 600, x: 1, y: maxY, ratio: "3/2" }
        : type === "video"
        ? { id, type: "video", w: 800, x: 1, y: maxY, ratio: "16/9", url: "" }
        : type === "link"
        ? { id, type: "link", w: 400, x: 1, y: maxY, href: "", body: ["Link text — edit me, then add a URL in the panel."] }
        : { id, type: "text", w: 500, x: 1, y: maxY, body: ["New text block — edit me in the panel."] };
      setLayout([...layout, nb]);
      setSelBlock(id);
    },
    update: (id, patch) => setLayout(layout.map((b) => (b.id === id ? { ...b, ...patch } : b))),
    del: (id) => { setLayout(layout.filter((b) => b.id !== id)); setSelBlock(null); },
    copy: () => {
      const clean = layout.map((b) => {
        const o = { id: b.id, type: b.type, w: b.w, x: b.x, y: b.y };
        if (b.type === "image") { o.ratio = b.ratio; if (b.caption) o.caption = b.caption; }
        else if (b.type === "video") { o.ratio = b.ratio; o.url = b.url; if (b.caption) o.caption = b.caption; }
        else if (b.type === "link") { o.body = b.body; o.href = b.href; }
        else o.body = b.body;
        return o;
      });
      try { navigator.clipboard.writeText("layout: " + JSON.stringify(clean, null, 2)); } catch (e) {}
      setCopied(true); setTimeout(() => setCopied(false), 1400);
    },
    reset: () => {
      writeSection("layouts", (m) => { const next = { ...m }; delete next[project.id]; return next; });
      setSelBlock(null);
    },
    // Header edits for the OPEN detail project.
    updateHeader: (patch) => writeSection("headers",
      (m) => ({ ...m, [baseProject.id]: { ...(m[baseProject.id] || {}), ...patch } })),
    // Header edits for ANY project by id (used by the editable Projects ledger).
    updateHeaderFor: (pid, patch) => writeSection("headers",
      (m) => ({ ...m, [pid]: { ...(m[pid] || {}), ...patch } })),
    // Selected state toggle — persisted to the project-file sidecar.
    updateSelected: (isSelected) => writeSection("selected",
      (m) => ({ ...m, [baseProject.id]: isSelected })),
    // Published ("Show in website") toggle — persisted to the project-file sidecar.
    updatePublished: (isPublished) => writeSection("published",
      (m) => ({ ...m, [baseProject.id]: isPublished })),
    // Create a new project — persists it to the sidecar (durable) and navigates to it.
    // Homepage pin/unpin and reorder actions
    toggleHomePin: (id) => writeSection("homePinned", (m) => {
      const cur = Object.keys(m).length > 0 ? m : Object.fromEntries(DEFAULT_HOME_ORDER.map((id2,i)=>[id2,i]));
      const next = { ...cur };
      if (id in next) {
        delete next[id];
        const sorted = Object.entries(next).sort((a,b)=>a[1]-b[1]);
        const out = {}; sorted.forEach(([k],i)=>{ out[k]=i; }); return out;
      } else {
        const max = Object.values(next).length > 0 ? Math.max(...Object.values(next)) + 1 : 0;
        return { ...next, [id]: max };
      }
    }),
    moveHomeUp: (id) => writeSection("homePinned", (m) => {
      const src = Object.keys(m).length > 0 ? m : Object.fromEntries(DEFAULT_HOME_ORDER.map((id2,i)=>[id2,i]));
      const sorted = Object.entries(src).sort((a,b)=>a[1]-b[1]);
      const idx = sorted.findIndex(([k])=>k===id); if (idx<=0) return src;
      [sorted[idx-1],sorted[idx]]=[sorted[idx],sorted[idx-1]];
      const out={}; sorted.forEach(([k],i)=>{out[k]=i;}); return out;
    }),
    moveHomeDown: (id) => writeSection("homePinned", (m) => {
      const src = Object.keys(m).length > 0 ? m : Object.fromEntries(DEFAULT_HOME_ORDER.map((id2,i)=>[id2,i]));
      const sorted = Object.entries(src).sort((a,b)=>a[1]-b[1]);
      const idx = sorted.findIndex(([k])=>k===id); if (idx<0||idx>=sorted.length-1) return src;
      [sorted[idx],sorted[idx+1]]=[sorted[idx+1],sorted[idx]];
      const out={}; sorted.forEach(([k],i)=>{out[k]=i;}); return out;
    }),
    updateHomeTitleColor: (id, color) => writeSection("homeTitleColors", (m) => ({ ...m, [id]: color })),
    createProject: (data) => {
      const id = "new-" + Date.now().toString(36);
      const newProject = {
        id,
        title: data.title || "Untitled",
        year: data.year || String(new Date().getFullYear()),
        disciplines: data.disciplines || "",
        tags: data.disciplines || "",
        location: "",
        links: [],
        selected: true, // new projects are in the selected view by default
        published: false, // start as a DRAFT (hidden from the live site) until you publish it
      };
      writeSection("projects", (m) => ({ ...m, [id]: newProject }));
      go("detail", id);
    },
    // Download the two files that hold all content (text/layout + images) so the
    // author can upload them to GitHub and publish — works with no host bridge.
    exportContent: async () => {
      downloadFile("atelier-content.state.json", JSON.stringify(contentRef.current));
      try {
        const r = await fetch("image-slots.state.json", { cache: "no-store" });
        if (r.ok) {
          const txt = await r.text();
          // brief gap so the browser doesn't drop the second download
          setTimeout(() => downloadFile("image-slots.state.json", txt), 400);
        }
      } catch (e) {}
    },
  };

  const selectedBlock = (t.editLayout ? layout.find((b) => b.id === selBlock) : null) || null;

  // Resolve a project's published state (localStorage override wins over code default).
  const isPublished = (p) => {
    const o = publishedProjects[p.id];
    return o !== undefined ? o : (p.published !== false);
  };

  return (
    <div className={"ds-page app" + (t.editLayout ? " editing" : "")}>
      <TopBar page={page} filter={filter} setFilter={setFilter} go={go} projects={mergedProjects} />
      {page === "home" && <Home go={go} projects={mergedProjects} isPublished={isPublished} editing={t.editLayout} homePinned={homePinned} titleColors={content.homeTitleColors || {}} />}
      {page === "projects" && <Projects projects={mergedProjects} filter={filter} go={go}
                                         isPublished={isPublished} editing={t.editLayout} />}
      {page === "detail" && (
        <Detail project={project} layout={layout} tweaks={t}
                editing={t.editLayout} headOverride={headOverride}
                onHeaderChange={actions.updateHeader}
                selectedId={t.editLayout ? selBlock : null}
                onSelect={setSelBlock} onChange={actions.update} />
      )}
      {(page === "about" || page === "contact") && <Info kind={page} go={go} />}
      <GridTweaks page={page} t={t} setTweak={setTweak}
                  selected={selectedBlock} actions={actions} copied={copied}
                  projectSelected={project.selected} onProjectSelectedChange={actions.updateSelected}
                  projectPublished={project.published} onProjectPublishedChange={actions.updatePublished}
                  onCreateProject={actions.createProject}
                  homePinned={homePinned} allProjects={mergedProjects} homeTitleColors={content.homeTitleColors || {}} />
    </div>
  );
}
window.App = App;
