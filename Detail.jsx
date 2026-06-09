
// Detail — project page. A 220px top area holds the title; the title→meta and
// meta→links rhythm is 50px each for clean space. The header width matches the grid
// width below it, flush-left, so everything aligns. Media (images + text) lives in
// the per-project 2D coordinate grid (see MediaGrid.jsx).
//
// HEADER EDITING: when Edit mode (Tweaks → Edit mode) is on, the title, year,
// location, disciplines and links become click-to-edit in place. Edits commit on
// blur and persist to localStorage (see App.jsx updateHeader / atelier:headers:v1).

// Format a location string as "VENUE • City, Country": the first comma-separated
// segment is the venue (uppercased + bold), the remainder follows a bullet separator.
function formatLocation(loc) {
  const parts = String(loc).split(",").map((s) => s.trim()).filter(Boolean);
  const venue = parts.shift() || "";
  const rest = parts.join(", ");
  return (
    <strong className="loc">
      <span className="loc-venue">{venue.toUpperCase()}</span>
      {rest && <React.Fragment><span className="loc-dot"> • </span>{rest}</React.Fragment>}
    </strong>
  );
}

// Editable — an uncontrolled contentEditable field. Seeds its text from `value` and
// commits the trimmed text on blur. Single-line fields blur on Enter; multi-line is
// off by default. Shows `placeholder` (via CSS) when empty.
function Editable({ tag, value, placeholder, className, onCommit }) {
  const Tag = tag || "span";
  const ref = React.useRef(null);
  // Keep the DOM text in sync when value changes from outside (e.g. project switch),
  // but never while the field is focused so we don't fight the caret.
  React.useEffect(() => {
    const el = ref.current;
    if (!el || el === document.activeElement) return;
    if (el.textContent !== (value || "")) el.textContent = value || "";
  }, [value]);
  return (
    <Tag ref={ref} className={"editable" + (className ? " " + className : "")}
         contentEditable suppressContentEditableWarning spellCheck={false}
         data-empty={!value} data-placeholder={placeholder || ""}
         onFocus={(e) => { if (!e.currentTarget.textContent) e.currentTarget.textContent = ""; }}
         onInput={(e) => e.currentTarget.setAttribute("data-empty", !e.currentTarget.textContent.trim())}
         onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); e.currentTarget.blur(); } }}
         onBlur={(e) => onCommit((e.currentTarget.textContent || "").trim())} />
  );
}
// Shared so the Projects ledger can reuse the same click-to-edit field.
window.Editable = Editable;

function Detail({ project, layout, tweaks, editing, headOverride, onHeaderChange,
                  selectedId, onSelect, onChange }) {
  const p = project;
  const gw = (tweaks && tweaks.gridWidth) || 1400;
  const change = onHeaderChange || (() => {});

  // Links. Every project page carries // saltonline.org by default; if the project's
  // own links don't already include it, it's prepended — UNLESS the links have been
  // user-edited (headOverride has a `links` key), in which case the stored array is
  // authoritative and the auto-prepend steps aside so removals stick.
  const SALT = { label: "// saltonline.org", href: "https://saltonline.org" };
  const ownLinks = p.links || [];
  const linksEdited = !!(headOverride && Object.prototype.hasOwnProperty.call(headOverride, "links"));
  const hasSalt = ownLinks.some((l) => {
    const label = typeof l === "string" ? l : l.label;
    return /saltonline\.org/i.test(label);
  });
  const links = linksEdited ? ownLinks : (hasSalt ? ownLinks : [SALT, ...ownLinks]);
  // Normalize to {label, href} objects for editing/rendering.
  const linkObjs = links.map((l) => (typeof l === "string" ? { label: l, href: "" } : { label: l.label, href: l.href || "" }));

  const commitLinks = (arr) => change({ links: arr.map((l) => ({ label: l.label, href: l.href })) });
  const setLink = (i, patch) => commitLinks(linkObjs.map((l, j) => (j === i ? { ...l, ...patch } : l)));
  const addLink = () => commitLinks([...linkObjs, { label: "// link", href: "" }]);
  const removeLink = (i) => commitLinks(linkObjs.filter((_, j) => j !== i));

  return (
    <div className="wrap-wide detail-wide fade">
      <div className={"detail-head" + (editing ? " editing-head" : "")} style={{ width: gw }}>
        {editing
          ? <Editable tag="h1" className="detail-title" value={p.title} placeholder="Project title"
                      onCommit={(v) => change({ title: v })} />
          : <h1 className="detail-title">{p.title}</h1>}

        {editing ? (
          <div className="detail-meta">
            <Editable className="meta-edit" value={p.year} placeholder="year"
                      onCommit={(v) => change({ year: v })} />
            <span className="sep">|</span>
            <Editable className="meta-edit" value={p.location} placeholder="venue, city, country"
                      onCommit={(v) => change({ location: v })} />
            <span className="sep">|</span>
            <Editable className="meta-edit disc" value={p.disciplines} placeholder="disciplines"
                      onCommit={(v) => change({ disciplines: v })} />
          </div>
        ) : (
          <div className="detail-meta">
            <span>{p.year}</span>
            {p.location &&
              <React.Fragment><span className="sep">|</span>{formatLocation(p.location)}</React.Fragment>}
            {p.disciplines &&
              <React.Fragment><span className="sep">|</span><span className="disc">{p.disciplines}</span></React.Fragment>}
          </div>
        )}

        {editing ? (
          <div className="detail-links editing-links">
            {linkObjs.map((l, i) => (
              <div className="dlink-edit" key={i}>
                <Editable className="dlink dlink-label" value={l.label} placeholder="// label"
                          onCommit={(v) => setLink(i, { label: v })} />
                <input className="dlink-href" type="text" placeholder="https://…" spellCheck={false}
                       value={l.href}
                       onChange={(e) => setLink(i, { href: e.target.value })} />
                <button type="button" className="dlink-del" title="Remove link"
                        onClick={() => removeLink(i)}>×</button>
              </div>
            ))}
            {linkObjs.length < 3 &&
              <button type="button" className="dlink-add" onClick={addLink}>+ link</button>}
          </div>
        ) : (
          linkObjs.length > 0 &&
            <div className="detail-links">
              {linkObjs.map((l, i) => (
                <a key={i} className="dlink" href={l.href || undefined}
                   target={l.href ? "_blank" : undefined}
                   rel={l.href ? "noopener noreferrer" : undefined}>{l.label}</a>
              ))}
            </div>
        )}
      </div>
      <MediaGrid project={p} layout={layout} tweaks={tweaks}
                 selectedId={selectedId} onSelect={onSelect} onChange={onChange} />
    </div>
  );
}
window.Detail = Detail;
