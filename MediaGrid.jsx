// MediaGrid — the 2D coordinate grid for a project page.
// Block types: image (drop slot), text (prose), link (clickable text → URL), video.
//
// Normalize a user-typed link target: keep absolute/mailto/tel/anchor as-is,
// otherwise assume https://. Empty → undefined (renders as a non-navigating box).
function linkHref(h) {
  const s = (h || "").trim();
  if (!s) return undefined;
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(s)) return s;
  return "https://" + s;
}
//
// Video blocks are sized like images (height = w × ratio, default 16/9). For
// YouTube/Vimeo we render a lightweight "facade" — just the poster thumbnail + a
// play button — and only load the real player <iframe> when clicked, so several
// videos on a page cost almost nothing until played. A direct .mp4/.webm URL plays
// inline via a native <video> element.
function parseVideo(url) {
  const u = (url || "").trim();
  let m;
  if (!u) return { kind: "none" };
  if ((m = u.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([\w-]{6,})/i)))
    return { kind: "youtube", id: m[1] };
  if ((m = u.match(/vimeo\.com\/(?:video\/)?(\d+)/i)))
    return { kind: "vimeo", id: m[1] };
  if (/\.(mp4|webm|ogv|ogg|mov)(\?.*)?$/i.test(u))
    return { kind: "file", src: u };
  return { kind: "unknown" };
}

// Fetch a Vimeo video's REAL-aspect-ratio thumbnail via the public oEmbed endpoint
// (JSONP, so it works straight from a static host like GitHub Pages with no API key).
// Returns the fallback (16:9 vumbnail) until the true-ratio poster resolves. For a
// vertical 83:117 video this yields a vertical poster, so the facade no longer crops.
function useVimeoPoster(id, fallback) {
  const [src, setSrc] = React.useState(fallback);
  React.useEffect(() => {
    setSrc(fallback);
    if (!id) return;
    const cb = "__vmcb_" + id + "_" + Math.random().toString(36).slice(2);
    const script = document.createElement("script");
    const cleanup = () => {
      try { delete window[cb]; } catch (e) { window[cb] = undefined; }
      if (script.parentNode) script.parentNode.removeChild(script);
    };
    window[cb] = (data) => {
      if (data && data.thumbnail_url) {
        // bump the served thumbnail up to ~1000px wide while keeping its real ratio
        const hi = data.thumbnail_url.replace(/_\d+x\d+/, "_1000");
        setSrc(hi);
      }
      cleanup();
    };
    script.onerror = cleanup;
    script.src = "https://vimeo.com/api/oembed.json?width=1000&url=" +
                 encodeURIComponent("https://vimeo.com/" + id) + "&callback=" + cb;
    document.body.appendChild(script);
    return cleanup;
  }, [id, fallback]);
  return src;
}

function GridVideo({ url, editing, posterId }) {
  const [play, setPlay] = React.useState(false);
  const v = parseVideo(url);
  // Vimeo's TRUE-ratio thumbnail (matches vertical/portrait videos) is fetched from its
  // oEmbed endpoint via JSONP. vumbnail.com is only a 16:9 fallback used until it resolves.
  const vimeoPoster = useVimeoPoster(v.kind === "vimeo" ? v.id : null,
                                     v.kind === "vimeo" ? "https://vumbnail.com/" + v.id + ".jpg" : null);
  if (v.kind === "file")
    return <video className="gv-media" src={v.src} controls playsInline preload="metadata"></video>;
  if (v.kind === "none" || v.kind === "unknown")
    return <div className="gv-empty">{url ? "unsupported video link" : "add a Vimeo / YouTube link or .mp4 in the panel"}</div>;
  // Auto thumbnail (YouTube hqdefault / Vimeo real-ratio) — shows behind the poster slot.
  const auto = v.kind === "youtube"
    ? "https://img.youtube.com/vi/" + v.id + "/hqdefault.jpg"
    : vimeoPoster;
  const embed = v.kind === "youtube"
    ? "https://www.youtube.com/embed/" + v.id + "?autoplay=1&mute=0&rel=0"
    : "https://player.vimeo.com/video/" + v.id + "?autoplay=1&muted=0";
  if (play && !editing)
    return <iframe className="gv-media" src={embed} title="video"
                   allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>;
  // Facade: drop-your-own poster (image-slot, top layer) over the auto thumbnail (fallback,
  // behind). A centered play button starts the embed on click. Drop a poster in VIEW mode;
  // in EDIT mode the slot/button go inert so you can drag/resize the block.
  return (
    <div className="gv-facade">
      {auto && <img className="gv-poster" src={auto} alt="" onError={(e) => { e.target.style.display = "none"; }} />}
      <image-slot id={posterId} class="gv-poster-slot" shape="rect" fit="cover"
                  position="50% 50%" data-store-width="1600"
                  placeholder="drop poster image"></image-slot>
      <button className="gv-play-btn" aria-label="Play video"
              onClick={(e) => { if (editing) return; e.stopPropagation(); setPlay(true); }}>
        <span className="gv-play" aria-hidden="true"></span>
      </button>
    </div>
  );
}

function useNarrow(bp) {
  const mq = React.useMemo(() => window.matchMedia("(max-width:" + bp + "px)"), [bp]);
  const [narrow, setNarrow] = React.useState(mq.matches);
  React.useEffect(() => {
    const h = (e) => setNarrow(e.matches);
    mq.addEventListener("change", h);
    return () => mq.removeEventListener("change", h);
  }, [mq]);
  return narrow;
}

function MediaGrid({ project, layout, tweaks, selectedId, onSelect, onChange }) {
  const narrow = useNarrow(820);
  const { columns, gridWidth, rowHeight, showGrid, showCoords, editLayout } = tweaks;
  // The grid lines + coordinate numbers are an EDITING aid — only ever shown while
  // Edit mode is on. Visitors (edit off) always see a clean page, never the overlay.
  const overlayOn = showGrid && editLayout;
  const colW = gridWidth / columns;
  const blockRefs = React.useRef({});
  const [canvasH, setCanvasH] = React.useState(900);

  const ratioH = (w, ratio) => {
    const [a, b] = String(ratio || "3/2").split("/").map(Number);
    return (w * b) / a;
  };

  // Measure: canvas height = lowest block bottom (text height read from the DOM),
  // floored to a usable area when the overlay is on so an empty grid still shows.
  React.useLayoutEffect(() => {
    let max = 0;
    layout.forEach((b) => {
      const top = (b.y - 1) * rowHeight;
      // Image AND video heights are read from the DOM (media + optional caption);
      // fall back to the bare media ratio before the node is measured.
      const h = blockRefs.current[b.id]
        ? blockRefs.current[b.id].offsetHeight
        : ((b.type === "image" || b.type === "video") ? ratioH(b.w, b.ratio) : 80);
      max = Math.max(max, top + h);
    });
    const floor = overlayOn ? 1280 : 200;
    setCanvasH(Math.max(max + 80, floor));
  }, [JSON.stringify(layout), columns, gridWidth, rowHeight, showGrid, editLayout]);

  // Arrow-key nudge for the selected block.
  React.useEffect(() => {
    if (!editLayout || selectedId == null) return;
    const onKey = (e) => {
      if (/input|textarea|select/i.test(e.target.tagName)) return;
      const b = layout.find((x) => x.id === selectedId);
      if (!b) return;
      let patch = null;
      if (e.key === "ArrowLeft") patch = { x: Math.max(1, b.x - 1) };
      else if (e.key === "ArrowRight") patch = { x: Math.min(columns, b.x + 1) };
      else if (e.key === "ArrowUp") patch = { y: Math.max(1, b.y - 1) };
      else if (e.key === "ArrowDown") patch = { y: b.y + 1 };
      if (patch) { e.preventDefault(); onChange(selectedId, patch); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [editLayout, selectedId, JSON.stringify(layout), columns, onChange]);

  const startMove = (e, b) => {
    if (!editLayout) return;
    e.preventDefault();
    onSelect(b.id);
    const sx = e.clientX, sy = e.clientY;
    const sLeft = (b.x - 1) * colW, sTop = (b.y - 1) * rowHeight;
    const move = (ev) => {
      const nx = Math.min(columns, Math.max(1, Math.round((sLeft + ev.clientX - sx) / colW) + 1));
      const ny = Math.max(1, Math.round((sTop + ev.clientY - sy) / rowHeight) + 1);
      onChange(b.id, { x: nx, y: ny });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const startResize = (e, b) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(b.id);
    const sx = e.clientX, sW = b.w;
    const move = (ev) => {
      const nw = Math.min(gridWidth, Math.max(colW, Math.round((sW + ev.clientX - sx) / colW) * colW));
      onChange(b.id, { w: nw });
    };
    const up = () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  const rowCount = Math.ceil(canvasH / rowHeight) + 1;

  // ── Mobile: single-column flow sorted by y then x ──────────────────────────
  if (narrow && !editLayout) {
    const sorted = [...layout].sort((a, b) => {
      const ao = a.mobileOrder !== undefined ? a.mobileOrder : Infinity;
      const bo = b.mobileOrder !== undefined ? b.mobileOrder : Infinity;
      if (ao !== bo) return ao - bo;
      return a.y - b.y || a.x - b.x;
    });
    return (
      <div className="grid-wrap">
        <div className="grid-mobile">
          {sorted.map((b) => {
            const isImg = b.type === "image";
            const isVid = b.type === "video";
            const rr = String(b.ratio || "3/2").split("/").map(Number);
            const isVert = (isImg || isVid) && rr[1] > rr[0];
            // Mobile width scale W1..W5 (W1 = full). Unset → vertical media default to
            // W3, everything else full. Narrower-than-full blocks center on the page.
            const MW = { 1: "100%", 2: "92%", 3: "84%", 4: "80%", 5: "76%" };
            const mwKey = b.mobileWidth || (isVert ? 3 : 1);
            const widthPct = MW[mwKey] || "100%";
            const style = { width: widthPct, alignSelf: widthPct === "100%" ? "stretch" : "center" };
            return (
              <div key={b.id} ref={(el) => (blockRefs.current[b.id] = el)}
                   className={"grid-block" + (isImg ? " img" : "") + (isVid ? " vid" : "")}
                   style={style}>
                {isImg
                  ? <React.Fragment>
                      <div className="gb-imgwrap" style={{ aspectRatio: b.ratio || "3/2" }}>
                        <image-slot id={project.id + "-" + b.id} shape="rounded" radius="2"
                                    data-store-width="2200" placeholder="drop image"></image-slot>
                      </div>
                      {b.caption ? <div className="gb-caption"
                                        dangerouslySetInnerHTML={{ __html: b.caption.replace(/\n/g, "<br>") }}></div> : null}
                    </React.Fragment>
                  : isVid
                  ? <React.Fragment>
                      <div className="gb-vidwrap" style={{ aspectRatio: (b.ratio || "16/9") }}>
                        <GridVideo url={b.url} editing={false} posterId={project.id + "-" + b.id + "-poster"} />
                      </div>
                      {b.caption ? <div className="gb-caption"
                                        dangerouslySetInnerHTML={{ __html: b.caption.replace(/\n/g, "<br>") }}></div> : null}
                    </React.Fragment>
                  : b.type === "link"
                  ? <a className="gb-text gb-link" href={linkHref(b.href)}
                       target="_blank" rel="noopener noreferrer"
                       style={{ fontSize: (b.fontSize || 15) + "px", lineHeight: b.lineHeight || 1.72, textAlign: b.textAlign || "left" }}
                       dangerouslySetInnerHTML={{ __html: (b.body || []).join("\n\n").replace(/\n/g, "<br>") }}></a>
                  : <div className="gb-text"
                         style={{ fontSize: (b.fontSize || 15) + "px", lineHeight: b.lineHeight || 1.72, textAlign: b.textAlign || "left" }}
                         dangerouslySetInnerHTML={{ __html: (b.body || []).join("\n\n").replace(/\n/g, "<br>") }}></div>}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="grid-wrap">
      <div className="grid-canvas"
           style={{ width: gridWidth, height: canvasH, "--row-h": rowHeight + "px" }}
           onPointerDown={(e) => {
             if (editLayout && e.target.classList.contains("grid-canvas")) onSelect(null);
           }}>
        {overlayOn && (
          <React.Fragment>
            <div className="grid-ovl grid-ovl-rows"></div>
            <div className="grid-ovl grid-ovl-cols">
              {Array.from({ length: columns }).map((_, i) => <div className="gcol" key={i}></div>)}
            </div>
            {showCoords && Array.from({ length: columns }).map((_, i) => (
              <div className="gcoord col" key={"c" + i} style={{ left: (i + 0.5) * colW }}>{i + 1}</div>
            ))}
            {showCoords && Array.from({ length: rowCount }).map((_, i) =>
              i % 5 === 0
                ? <div className="gcoord row" key={"r" + i} style={{ top: i * rowHeight }}>{i + 1}</div>
                : null
            )}
          </React.Fragment>
        )}

        {layout.map((b) => {
          const isImg = b.type === "image";
          const isVid = b.type === "video";
          const style = {
            left: (b.x - 1) * colW,
            top: (b.y - 1) * rowHeight,
            width: b.w,
          };
          return (
            <div key={b.id}
                 ref={(el) => (blockRefs.current[b.id] = el)}
                 className={"grid-block" + (isImg ? " img" : "") + (isVid ? " vid" : "") + (b.id === selectedId ? " sel" : "")}
                 style={style}>
              {isImg
                ? <React.Fragment>
                    <div className="gb-imgwrap" style={{ height: ratioH(b.w, b.ratio) }}>
                      <image-slot id={project.id + "-" + b.id} shape="rounded" radius="2"
                                  data-store-width="2200" placeholder="drop image"></image-slot>
                    </div>
                    {b.caption ? <div className="gb-caption"
                                      dangerouslySetInnerHTML={{ __html: b.caption.replace(/\n/g, "<br>") }}></div> : null}
                  </React.Fragment>
                : isVid
                ? <React.Fragment>
                    <div className="gb-vidwrap" style={{ height: ratioH(b.w, b.ratio) }}>
                      <GridVideo url={b.url} editing={editLayout}
                                 posterId={project.id + "-" + b.id + "-poster"} />
                    </div>
                    {b.caption ? <div className="gb-caption"
                                      dangerouslySetInnerHTML={{ __html: b.caption.replace(/\n/g, "<br>") }}></div> : null}
                  </React.Fragment>
                : b.type === "link"
                ? <a className="gb-text gb-link" href={editLayout ? undefined : linkHref(b.href)}
                     target="_blank" rel="noopener noreferrer"
                     onClick={(e) => { if (editLayout) e.preventDefault(); }}
                     style={{ fontSize: (b.fontSize != null ? b.fontSize : 17) + "px",
                              lineHeight: (b.lineHeight != null ? b.lineHeight : 1.72),
                              textAlign: b.textAlign || "left" }}
                     dangerouslySetInnerHTML={{ __html: (b.body || []).join("\n\n").replace(/\n/g, "<br>") }}></a>
                : <div className="gb-text"
                       style={{ fontSize: (b.fontSize != null ? b.fontSize : 17) + "px",
                                lineHeight: (b.lineHeight != null ? b.lineHeight : 1.72),
                                textAlign: b.textAlign || "left" }}
                       dangerouslySetInnerHTML={{ __html: (b.body || []).join("\n\n").replace(/\n/g, "<br>") }}></div>}
              {editLayout && <div className="gb-tag">{b.type} · {b.w}px · c{b.x} r{b.y}</div>}
              {editLayout && <div className="gb-hit" onPointerDown={(e) => startMove(e, b)}></div>}
              {editLayout && <div className="gb-res" onPointerDown={(e) => startResize(e, b)}></div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
window.MediaGrid = MediaGrid;
