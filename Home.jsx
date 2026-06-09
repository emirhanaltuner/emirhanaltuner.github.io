// Home — landing page. ONE large project visual anchored flush to the BOTTOM of the
// screen (content begins 250px from the top), horizontally centered, cross-fading
// through the projects on a timer. Each image shows at its NATURAL ratio via
// fit="contain" (no crop/stretch); cream fills around it seamlessly. The title is
// pinned to the IMAGE's actual bottom-right edge (not the box), in orange, underlined,
// and clickable. Rotation runs continuously and only pauses while a file is dragged
// over the stage, so drops land on the slot you intend.
//
// ── Visuals ──
// Projects with a file in images/<id>.webp show it by default; DRAG a new image onto
// the stage (or click an empty one) to replace it. Drops persist and keep their ratio.
const HOME_IMAGES = {
  "forward-march": "images/forward-march.webp",
  "90s-onstage": "images/90s-onstage.webp",
  "climavore": "images/climavore.webp",
  "no-records": "images/no-records.webp",
  "trash": "images/trash.webp",
  "one-and-many": "images/one-and-many.webp",
  "little-did-they-know": "images/little-did-they-know.webp",
};
// Fixed display order on the landing rotation (first → last).
const HOME_ORDER = [
  "trash", "no-records", "one-and-many", "90s-onstage",
  "climavore", "little-did-they-know", "forward-march",
];
// Natural aspect ratios (w/h) of the default images, so the caption can magnet to the
// image edge before the bitmap has even decoded. A dropped image updates this on load.
const HOME_RATIOS = {
  "forward-march": 1920 / 1440,
  "90s-onstage": 1920 / 1280,
  "three-seas": 1920 / 1280,
  "no-records": 1920 / 1280,
  "trash": 1920 / 1280,
  "one-and-many": 1920 / 1084,
  "little-did-they-know": 1920 / 1280,
};
const ROTATE_MS = 5000; // image changes every 5 seconds

function Home({ go, projects, isPublished, editing, homePinned, titleColors }) {
  // Landing shows pinned projects in author-defined order.
  // Fallback to HOME_ORDER+HOME_IMAGES when homePinned is empty.
  const pinned = homePinned || {};
  const pinnedIds = Object.entries(pinned).sort((a,b)=>a[1]-b[1]).map(([id])=>id);
  const shown = pinnedIds
    .map(id => projects.find(p => p.id === id))
    .filter(Boolean)
    .filter((p) => editing || (isPublished ? isPublished(p) : true));
  const [i, setI] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const stageRef = React.useRef(null);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((n) => (n + 1) % shown.length), ROTATE_MS);
    return () => clearInterval(id);
  }, [paused, shown.length]);

  const current = shown[i] || shown[0];

  return (
    <div className="home-hero fade">
      <div className="home-stage" ref={stageRef}
           onDragEnter={() => setPaused(true)}
           onDragLeave={(e) => { if (e.target === e.currentTarget) setPaused(false); }}
           onDrop={() => setPaused(false)}>
        <div className="home-figure">
          {shown.map((p, idx) => {
            const src = HOME_IMAGES[p.id];
            return (
              <image-slot key={p.id} id={"home-" + p.id} shape="rect" fit="cover" position="50% 50%"
                          {...(src ? { src } : {})} data-store-width="2600"
                          class={idx === i ? "on" : ""}
                          placeholder={"drop image — " + p.title}></image-slot>
            );
          })}
          <span className="home-cap" style={(titleColors && titleColors[current.id]) ? { color: titleColors[current.id] } : undefined} onClick={() => go("detail", current.id)}>{current.title}</span>
        </div>
      </div>
    </div>
  );
}
window.Home = Home;
