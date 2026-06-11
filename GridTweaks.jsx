// GridTweaks — the Tweaks panel for the project-page grid system.
// Global grid controls (overlay, coordinates, columns, width, row height) plus an
// Edit-mode section with add/copy/reset and a per-block inspector. The panel only
// shows when the host activates Tweaks; grid editing applies to the open project.
// Box widths: 100 → 1400px in 50px steps, so text/image/video blocks can be any size.
const TWK_WIDTHS = [];
for (let w = 100; w <= 1400; w += 50) TWK_WIDTHS.push(String(w));
// Video frames: 16:9 / vertical 9:16, 4:3 / vertical 3:4, the SALT poster proportions, plus extras.
const VID_RATIOS = ["16/9", "9/16", "4/3", "3/4", "117/83", "83/117", "3/2", "2/3", "1/1", "21/9", "16/6"];
// Image frames: the common photographic ratios, each in horizontal AND vertical form.
const IMG_RATIOS = ["3/2", "2/3", "4/3", "3/4", "16/9", "9/16", "5/4", "4/5", "1/1", "7/5", "5/7", "21/9"];
// RichTextField — textarea + a small formatting toolbar. Selecting text and tapping a
// control wraps it in semantic HTML (the text block renders body via innerHTML, so the
// preview updates live). Curated brand-leaning colors + an optional hex input.
const TEXT_COLORS = [
  { name: "Ink", hex: "#1a1a1a" },
  { name: "Vermilion", hex: "#e84a1a" },
  { name: "Warm grey", hex: "#7a736c" },
  { name: "Terracotta", hex: "#9c4a2a" },
  { name: "Cream", hex: "#f5f0eb" },
];
// Normalize a typed link target the same way the grid does: keep absolute / mailto /
// tel / anchor as-is, otherwise assume https://.
function normHref(h) {
  const s = (h || "").trim();
  if (!s) return "";
  if (/^(https?:\/\/|mailto:|tel:|\/|#)/i.test(s)) return s;
  return "https://" + s;
}
function RichTextField({ value, onChange }) {
  const ref = React.useRef(null);
  const pending = React.useRef(null);
  const [hex, setHex] = React.useState("");
  // Inline-link editor: capture the selection range when the Link button is tapped,
  // then collect a URL in a small field before wrapping the words in an <a>.
  const [linkSel, setLinkSel] = React.useState(null); // [start, end] or null
  const [linkUrl, setLinkUrl] = React.useState("");
  const linkInputRef = React.useRef(null);

  // Restore the selection after the parent re-renders the textarea with new markup.
  React.useLayoutEffect(() => {
    if (pending.current != null && ref.current) {
      const [s, e] = pending.current;
      ref.current.focus();
      ref.current.setSelectionRange(s, e);
      pending.current = null;
    }
  }, [value]);
  const wrap = (open, close) => {
    const ta = ref.current;
    if (!ta) return;
    const full = ta.value, s = ta.selectionStart, e = ta.selectionEnd;
    const next = full.slice(0, s) + open + full.slice(s, e) + close + full.slice(e);
    // keep the same text selected (now sitting inside the new tags)
    pending.current = s === e ? [s + open.length, s + open.length] : [s + open.length, e + open.length];
    onChange(next);
  };
  const btn = {
    flex: "0 0 auto", minWidth: 28, height: 26, padding: "0 7px", cursor: "pointer",
    border: "1px solid var(--border)", borderRadius: 4, background: "var(--bg)",
    color: "var(--text-dark)", fontSize: 12.5, lineHeight: 1, display: "inline-flex",
    alignItems: "center", justifyContent: "center",
  };
  const swatch = (c) => ({ ...btn, minWidth: 22, padding: 0, width: 22, background: c, borderColor: "var(--border)" });
  const color = (c) => wrap('<span style="color:' + c + '">', "</span>");
  // Grab the current selection (a word or few) and open the URL field for it.
  const openLink = () => {
    const ta = ref.current;
    if (!ta) return;
    const s = ta.selectionStart, e = ta.selectionEnd;
    if (s === e) return; // need at least one selected word
    setLinkSel([s, e]);
    setLinkUrl("");
  };
  React.useEffect(() => {
    if (linkSel && linkInputRef.current) linkInputRef.current.focus();
  }, [linkSel]);
  const applyLink = () => {
    if (!linkSel) return;
    const href = normHref(linkUrl);
    if (!href) { setLinkSel(null); return; }
    const ta = ref.current;
    const full = ta.value, [s, e] = linkSel;
    const open = '<a href="' + href + '" target="_blank" rel="noopener noreferrer">';
    const close = "</a>";
    const next = full.slice(0, s) + open + full.slice(s, e) + close + full.slice(e);
    pending.current = [s + open.length, e + open.length];
    onChange(next);
    setLinkSel(null);
    setLinkUrl("");
  };
  const applyHex = () => {
    let h = hex.trim();
    if (!/^#?[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(h)) return; // 3- or 6-digit hex only
    if (h[0] !== "#") h = "#" + h;
    color(h);
  };
  return (
    <div className="twk-row">
      <div className="twk-lbl"><span>Text</span></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 6 }}>
        <button type="button" style={{ ...btn, fontWeight: 700 }} title="Bold"
                onMouseDown={(e) => e.preventDefault()} onClick={() => wrap("<strong>", "</strong>")}>B</button>
        <button type="button" style={{ ...btn, fontStyle: "italic" }} title="Italic"
                onMouseDown={(e) => e.preventDefault()} onClick={() => wrap("<em>", "</em>")}>I</button>
        <button type="button" style={{ ...btn, textDecoration: "underline" }} title="Underline"
                onMouseDown={(e) => e.preventDefault()} onClick={() => wrap("<u>", "</u>")}>U</button>
        <button type="button" style={{ ...btn, fontWeight: 400 }} title="Regular weight"
                onMouseDown={(e) => e.preventDefault()} onClick={() => wrap('<span style="font-weight:400">', "</span>")}>Reg</button>
        <button type="button" style={{ ...btn, color: "var(--orange)" }} title="Link selected words"
                onMouseDown={(e) => e.preventDefault()} onClick={openLink}>Link</button>
        {TEXT_COLORS.map((c) => (
          <button key={c.hex} type="button" style={swatch(c.hex)} title={c.name}
                  onMouseDown={(e) => e.preventDefault()} onClick={() => color(c.hex)}></button>
        ))}
      </div>
      {linkSel && (
        <div style={{ display: "flex", gap: 5, marginBottom: 6, alignItems: "center" }}>
          <input ref={linkInputRef} type="text" value={linkUrl} placeholder="https://… (or mailto:)"
                 spellCheck={false}
                 onChange={(e) => setLinkUrl(e.target.value)}
                 onKeyDown={(e) => {
                   if (e.key === "Enter") { e.preventDefault(); applyLink(); }
                   else if (e.key === "Escape") { e.preventDefault(); setLinkSel(null); }
                 }}
                 style={{ flex: 1, height: 26, padding: "0 8px", border: "1px solid var(--orange)",
                          borderRadius: 4, background: "var(--bg)", color: "var(--text-dark)",
                          fontSize: 12, fontFamily: "inherit" }} />
          <button type="button" style={btn} title="Apply link to selected words"
                  onMouseDown={(e) => e.preventDefault()} onClick={applyLink}>Add</button>
          <button type="button" style={btn} title="Cancel"
                  onMouseDown={(e) => e.preventDefault()} onClick={() => setLinkSel(null)}>✕</button>
        </div>
      )}
      <div style={{ display: "flex", gap: 5, marginBottom: 6 }}>
        <input type="text" value={hex} placeholder="#hex" spellCheck={false}
               onChange={(e) => setHex(e.target.value)}
               onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); applyHex(); } }}
               style={{ flex: 1, height: 26, padding: "0 8px", border: "1px solid var(--border)",
                        borderRadius: 4, background: "var(--bg)", color: "var(--text-dark)",
                        fontSize: 12, fontFamily: "inherit" }} />
        <button type="button" style={btn} title="Apply hex color to selection"
                onMouseDown={(e) => e.preventDefault()} onClick={applyHex}>Set</button>
      </div>
      <textarea ref={ref} className="twk-field"
                style={{ height: 96, padding: 8, resize: "vertical", lineHeight: 1.45 }}
                value={value}
                onChange={(e) => onChange(e.target.value)} />
      <div style={{ fontSize: 10.5, opacity: 0.5, padding: "3px 0 0", lineHeight: 1.45 }}>
        Select text, then tap a control. <strong>Link</strong> turns the selection into a link; recolor it with a swatch. Blank line = new paragraph.
      </div>
    </div>
  );
}

// NewProjectModal — modal to create a new project. Collects title, year, and disciplines.
function NewProjectModal({ onClose, onCreate }) {
  const [title, setTitle] = React.useState("");
  const [year, setYear] = React.useState(String(new Date().getFullYear()));
  const [disciplines, setDisciplines] = React.useState("");

  const submit = () => {
    if (!title.trim()) return;
    onCreate({ title: title.trim(), year: year.trim(), disciplines: disciplines.trim() });
    onClose();
  };

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.5)", display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 9999, padding: 20
    }} onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        background: "var(--bg)", borderRadius: 8, padding: 24, maxWidth: 400, width: "100%",
        border: "1px solid var(--border)", boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)"
      }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 18, fontWeight: 700, color: "var(--text-dark)" }}>
          Create new project
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--text-dark)" }}>
              Title
            </label>
            <input type="text" placeholder="Project title" value={title} onChange={(e) => setTitle(e.target.value)}
                   onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                   style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 4,
                            background: "var(--bg)", color: "var(--text-dark)", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--text-dark)" }}>
              Year
            </label>
            <input type="text" placeholder="2024" value={year} onChange={(e) => setYear(e.target.value)}
                   onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                   style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 4,
                            background: "var(--bg)", color: "var(--text-dark)", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, marginBottom: 4, color: "var(--text-dark)" }}>
              Disciplines (comma-separated)
            </label>
            <input type="text" placeholder="scenography, production" value={disciplines} onChange={(e) => setDisciplines(e.target.value)}
                   onKeyDown={(e) => { if (e.key === "Enter") submit(); }}
                   style={{ width: "100%", padding: 8, border: "1px solid var(--border)", borderRadius: 4,
                            background: "var(--bg)", color: "var(--text-dark)", fontSize: 13, fontFamily: "inherit", boxSizing: "border-box" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button type="button" onClick={onClose}
                  style={{ flex: 1, padding: "8px 12px", border: "1px solid var(--border)", borderRadius: 4,
                           background: "var(--bg)", color: "var(--text-dark)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            Cancel
          </button>
          <button type="button" onClick={submit}
                  style={{ flex: 1, padding: "8px 12px", border: "none", borderRadius: 4,
                           background: "var(--orange)", color: "var(--bg)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
window.NewProjectModal = NewProjectModal;

function GridTweaks({ page, t, setTweak, selected, actions, copied, projectSelected, onProjectSelectedChange, projectPublished, onProjectPublishedChange, onCreateProject, homePinned, allProjects, homeTitleColors }) {
  const onDetail = page === "detail";
  const onGrid = page === "detail" || page === "about" || page === "contact";
  const [showNewProjectModal, setShowNewProjectModal] = React.useState(false);
  const [exported, setExported] = React.useState(false);
  const fileInputRef = React.useRef(null);
  const uploadTargetRef = React.useRef(null);

  // GitHub save state
  const [ghToken, setGhToken] = React.useState(() => actions.ghSettings ? actions.ghSettings.getToken() : '');
  const [tokenInput, setTokenInput] = React.useState('');
  const [saveStatus, setSaveStatus] = React.useState(''); // '', 'saving', 'done', 'error:...'
  const [includeImages, setIncludeImages] = React.useState(false);
  const [showTokenSetup, setShowTokenSetup] = React.useState(false);

  const handleSave = async () => {
    setSaveStatus('saving');
    await actions.ghSave(includeImages, (s) => setSaveStatus(s));
  };
  const handleSaveToken = () => {
    actions.ghSettings.setToken(tokenInput);
    setGhToken(tokenInput);
    setTokenInput('');
    setShowTokenSetup(false);
  };

  const handleExport = () => {
    if (actions.exportContent) actions.exportContent();
    setExported(true); setTimeout(() => setExported(false), 2200);
  };

  // Trigger file picker for a specific project's home slot
  const pickImageFor = (id) => {
    uploadTargetRef.current = id;
    if (fileInputRef.current) fileInputRef.current.click();
  };
  const onFileChosen = (e) => {
    const file = e.target.files && e.target.files[0];
    const id = uploadTargetRef.current;
    if (!file || !id) return;
    const slot = document.getElementById("home-" + id);
    if (slot && typeof slot._ingest === "function") {
      slot._ingest(file);
    } else {
      // If we're not on the home page, navigate there first then retry
      alert("Go to the home page first, then click 'Change image' again.");
    }
    e.target.value = "";
  };

  // Sorted pinned projects
  const pinned = homePinned || {};
  const pinnedIds = Object.entries(pinned).sort((a,b)=>a[1]-b[1]).map(([id])=>id);
  // All projects available to pin (published OR in edit mode)
  const available = (allProjects || []).filter(p => p.id && p.title);
  const unpinnedAvailable = available.filter(p => !pinnedIds.includes(p.id));



  return (
    <TweaksPanel title="Grid">
      {/* hidden file input for homepage image upload */}
      <input ref={fileInputRef} type="file" accept="image/png,image/jpeg,image/webp,image/avif"
             style={{ display:"none" }} onChange={onFileChosen} />

      <TweakSection label="Publish to web" />

      {/* GitHub Save */}
      {!ghToken || showTokenSetup ? (
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ fontSize:10.5, opacity:0.6, lineHeight:1.5 }}>
            {!ghToken ? 'Enter a GitHub token to save directly from the live site:' : 'Update your GitHub token:'}
          </div>
          <input type="password" placeholder="ghp_xxxxxxxxxxxx"
                 value={tokenInput} onChange={e => setTokenInput(e.target.value)}
                 onKeyDown={e => e.key === 'Enter' && tokenInput && handleSaveToken()}
                 style={{ fontSize:11, padding:'5px 8px', border:'1px solid #e0c4b8',
                          borderRadius:5, fontFamily:'inherit', outline:'none',
                          background:'rgba(255,255,255,0.6)' }} />
          <div style={{ fontSize:10, opacity:0.5, lineHeight:1.5 }}>
            github.com → Settings → Developer settings → Personal access tokens → Tokens (classic) → Generate new → tick <strong>repo</strong>
          </div>
          <div style={{ display:'flex', gap:6 }}>
            <TweakButton label="Save token" onClick={handleSaveToken} />
            {ghToken && <TweakButton label="Cancel" secondary onClick={() => setShowTokenSetup(false)} />}
          </div>
        </div>
      ) : (
        <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}>
            <label style={{ fontSize:11, display:'flex', alignItems:'center', gap:4, cursor:'pointer', flex:1 }}>
              <input type="checkbox" checked={includeImages}
                     onChange={e => setIncludeImages(e.target.checked)}
                     style={{ margin:0 }} />
              Include images
            </label>
            <button onClick={() => { setShowTokenSetup(true); setTokenInput(''); }}
              style={{ fontSize:9.5, opacity:0.45, background:'none', border:'none',
                       cursor:'pointer', fontFamily:'inherit', padding:0 }}>change token</button>
          </div>
          <TweakButton
            label={
              saveStatus === 'saving' ? '⏳ Saving…' :
              saveStatus === 'done'   ? '✓ Saved — site updates in ~1 min' :
              saveStatus.startsWith('error') ? '⚠️ ' + saveStatus.slice(6) :
              '🚀 Save to GitHub'
            }
            onClick={saveStatus === 'saving' ? undefined : handleSave}
          />
          {saveStatus.startsWith('error') && (
            <div style={{ fontSize:10, color:'#c0392b', lineHeight:1.5 }}>{saveStatus.slice(6)}</div>
          )}
          <TweakButton label={exported ? 'Downloaded ✓' : '⬇ Download (backup)'}
                       secondary onClick={handleExport} />
        </div>
      )}

      <TweakSection label="Homepage" />
      <div style={{ fontSize: 10.5, opacity: 0.5, marginBottom: 8, lineHeight: 1.5 }}>
        Go to home page to change images (drag &amp; drop onto the slide). Use the controls below to choose which projects rotate and in what order.
      </div>

      {/* Pinned projects — in order */}
      {pinnedIds.map((id, idx) => {
        const proj = available.find(p => p.id === id);
        if (!proj) return null;
        return (
          <div key={id} style={{ display:"flex", alignItems:"center", gap:5, marginBottom:5 }}>
            <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
              <button onClick={() => actions.moveHomeUp(id)}
                style={{ background:"none", border:"1px solid #e0c4b8", borderRadius:3, cursor:"pointer",
                         fontSize:9, padding:"1px 4px", opacity: idx===0 ? 0.3 : 1 }}>▲</button>
              <button onClick={() => actions.moveHomeDown(id)}
                style={{ background:"none", border:"1px solid #e0c4b8", borderRadius:3, cursor:"pointer",
                         fontSize:9, padding:"1px 4px", opacity: idx===pinnedIds.length-1 ? 0.3 : 1 }}>▼</button>
            </div>
            <div style={{ flex:1, fontSize:11, fontFamily:"inherit", overflow:"hidden",
                          textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {idx+1}. {proj.title}
            </div>
            {/* per-project title color swatches */}
            <div style={{ display:"flex", gap:3, flexShrink:0 }}>
              {['#f5f0eb','#1a1a1a','#e84a1a'].map(col => (
                <button key={col} onClick={() => actions.updateHomeTitleColor(id, col)}
                  title={col === '#f5f0eb' ? 'cream' : col === '#1a1a1a' ? 'black' : 'vermilion'}
                  style={{ width:14, height:14, borderRadius:3, background:col, cursor:'pointer', flexShrink:0,
                           border: (homeTitleColors && homeTitleColors[id]) === col
                             ? '2px solid #e84a1a' : '1.5px solid #e0c4b8',
                           padding:0 }} />
              ))}
            </div>
            <button onClick={() => pickImageFor(id)} title="Change image"
              style={{ background:"none", border:"1px solid #e0c4b8", borderRadius:3, cursor:"pointer",
                       fontSize:10, padding:"2px 6px", whiteSpace:"nowrap", flexShrink:0 }}>🖼</button>
            <button onClick={() => actions.toggleHomePin(id)} title="Remove from homepage"
              style={{ background:"none", border:"1px solid #e84a1a", borderRadius:3, cursor:"pointer",
                       color:"#e84a1a", fontSize:11, padding:"2px 5px", flexShrink:0 }}>✕</button>
          </div>
        );
      })}

      {/* Add a project to homepage */}
      {unpinnedAvailable.length > 0 && (
        <div style={{ marginTop: pinnedIds.length ? 6 : 0 }}>
          <select defaultValue=""
            onChange={e => { if (e.target.value) { actions.toggleHomePin(e.target.value); e.target.value=""; } }}
            style={{ width:"100%", fontSize:11, padding:"4px 6px", borderRadius:4,
                     border:"1px solid #e0c4b8", background:"#f5f0eb", cursor:"pointer" }}>
            <option value="">+ Add project to homepage…</option>
            {unpinnedAvailable.map(p => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
        </div>
      )}

      <TweakSection label="Projects" />
      <TweakButton label="+ Create project" secondary onClick={() => setShowNewProjectModal(true)} />
      <div style={{ fontSize: 10.5, opacity: 0.5, padding: "2px 0 4px", lineHeight: 1.5 }}>
        Edits (layouts, text, headers, new projects) save into the project file automatically — they travel with the site and survive file moves.
      </div>

      {onDetail && (
        <React.Fragment>
          <TweakSection label="Project" />
          <TweakToggle label="Show in website" value={projectPublished !== false}
                       onChange={(v) => onProjectPublishedChange(v)} />
          <TweakToggle label="In selected view" value={projectSelected !== false}
                       onChange={(v) => onProjectSelectedChange(v)} />
          {projectPublished === false && (
            <div style={{ fontSize: 11, opacity: 0.6, padding: "0 0 4px", lineHeight: 1.5 }}>
              Draft — hidden from the live site. Still listed (marked “draft”) while Edit mode is on.
            </div>
          )}
        </React.Fragment>
      )}

      {onGrid && (
        <React.Fragment>
          <TweakSection label="Overlay" />
          <TweakToggle label="Show grid" value={t.showGrid} onChange={(v) => setTweak("showGrid", v)} />
          <TweakToggle label="Coordinates" value={t.showCoords} onChange={(v) => setTweak("showCoords", v)} />
          <TweakSlider label="Columns" value={t.columns} min={6} max={48} onChange={(v) => setTweak("columns", v)} />
          <TweakSlider label="Grid width" value={t.gridWidth} min={1100} max={1600} step={20} unit="px"
                       onChange={(v) => setTweak("gridWidth", v)} />
          <TweakSlider label="Row height" value={t.rowHeight} min={15} max={80} step={1} unit="px"
                       onChange={(v) => setTweak("rowHeight", v)} />

          <TweakSection label="Layout editing" />
          <TweakToggle label="Edit mode" value={t.editLayout} onChange={(v) => setTweak("editLayout", v)} />
          {t.editLayout && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <TweakButton label="+ Image" secondary onClick={() => actions.add("image")} />
              <TweakButton label="+ Text" secondary onClick={() => actions.add("text")} />
              <TweakButton label="+ Video" secondary onClick={() => actions.add("video")} />
              <TweakButton label="+ Link" secondary onClick={() => actions.add("link")} />
            </div>
          )}
          {t.editLayout && (
            <div style={{ display: "flex", gap: 6 }}>
              <TweakButton label={copied ? "Copied ✓" : "Copy layout"} secondary onClick={actions.copy} />
              <TweakButton label="Reset" secondary onClick={actions.reset} />
            </div>
          )}

          {t.editLayout && selected && (
            <React.Fragment>
              <TweakSection label={"Selected — " + selected.type} />
              <TweakSelect label="Width" value={String(selected.w)} options={TWK_WIDTHS}
                           onChange={(v) => actions.update(selected.id, { w: Number(v) })} />
              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <TweakNumber label="Col" value={selected.x} min={1} max={t.columns}
                               onChange={(v) => actions.update(selected.id, { x: v })} />
                </div>
                <div style={{ flex: 1 }}>
                  <TweakNumber label="Row" value={selected.y} min={1}
                               onChange={(v) => actions.update(selected.id, { y: v })} />
                </div>
              </div>
              {selected.type === "image" &&
                <React.Fragment>
                  <TweakSelect label="Ratio" value={selected.ratio || "3/2"} options={IMG_RATIOS}
                               onChange={(v) => actions.update(selected.id, { ratio: v })} />
                  <div className="twk-row">
                    <div className="twk-lbl"><span>Caption</span></div>
                    <textarea className="twk-field"
                              style={{ height: 60, padding: 8, resize: "vertical", lineHeight: 1.45 }}
                              placeholder="e.g. Project Title · SALT Galata · 2024 · photo: name"
                              value={selected.caption || ""}
                              onChange={(e) => actions.update(selected.id, { caption: e.target.value })} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.55, padding: "2px 0 4px", lineHeight: 1.5 }}>
                    Shows in warm grey directly below the image. Wrap text in &lt;em&gt;…&lt;/em&gt; for italics.
                  </div>
                </React.Fragment>}
              {selected.type === "video" &&
                <React.Fragment>
                  <TweakSelect label="Ratio" value={selected.ratio || "16/9"} options={VID_RATIOS}
                               onChange={(v) => actions.update(selected.id, { ratio: v })} />
                  <div className="twk-row">
                    <div className="twk-lbl"><span>Video URL</span></div>
                    <input className="twk-field" type="text" placeholder="Vimeo / YouTube link or .mp4"
                           style={{ padding: 8 }}
                           value={selected.url || ""}
                           onChange={(e) => actions.update(selected.id, { url: e.target.value })} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.55, padding: "2px 0", lineHeight: 1.5 }}>
                    Paste a Vimeo or YouTube link (loads on click), or a direct .mp4/.webm URL (plays inline).
                  </div>
                  <div className="twk-row">
                    <div className="twk-lbl"><span>Caption</span></div>
                    <textarea className="twk-field"
                              style={{ height: 60, padding: 8, resize: "vertical", lineHeight: 1.45 }}
                              placeholder="e.g. Project Title · SALT Galata · 2024 · video: name"
                              value={selected.caption || ""}
                              onChange={(e) => actions.update(selected.id, { caption: e.target.value })} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.55, padding: "2px 0 4px", lineHeight: 1.5 }}>
                    Shows in warm grey directly below the video. Wrap text in &lt;em&gt;…&lt;/em&gt; for italics.
                  </div>
                </React.Fragment>}
              {selected.type === "link" &&
                <React.Fragment>
                  <div className="twk-row">
                    <div className="twk-lbl"><span>Link URL</span></div>
                    <input className="twk-field" type="text" placeholder="https://… (or mailto:)"
                           style={{ padding: 8 }}
                           value={selected.href || ""}
                           onChange={(e) => actions.update(selected.id, { href: e.target.value })} />
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.55, padding: "2px 0 2px", lineHeight: 1.5 }}>
                    The whole box opens this link in a new tab. Style the text below — color, italic, underline — as you like.
                  </div>
                  <TweakSlider label="Type size" value={selected.fontSize != null ? selected.fontSize : 17}
                               min={12} max={48} step={1} unit="px"
                               onChange={(v) => actions.update(selected.id, { fontSize: v })} />
                  <TweakSlider label="Line spacing" value={selected.lineHeight != null ? selected.lineHeight : 1.72}
                               min={1} max={2.6} step={0.1}
                               onChange={(v) => actions.update(selected.id, { lineHeight: v })} />
                  <TweakRadio label="Align" value={selected.textAlign || "left"}
                              options={["left", "center", "right"]}
                              onChange={(v) => actions.update(selected.id, { textAlign: v })} />
                  <RichTextField
                    value={(selected.body || []).join("\n\n")}
                    onChange={(str) => actions.update(selected.id, { body: [str] })} />
                </React.Fragment>}
              {selected.type === "text" &&
                <React.Fragment>
                  <TweakSlider label="Type size" value={selected.fontSize != null ? selected.fontSize : 17}
                               min={12} max={48} step={1} unit="px"
                               onChange={(v) => actions.update(selected.id, { fontSize: v })} />
                  <TweakSlider label="Line spacing" value={selected.lineHeight != null ? selected.lineHeight : 1.72}
                               min={1} max={2.6} step={0.1}
                               onChange={(v) => actions.update(selected.id, { lineHeight: v })} />
                  <TweakRadio label="Align" value={selected.textAlign || "left"}
                              options={["left", "center", "right"]}
                              onChange={(v) => actions.update(selected.id, { textAlign: v })} />
                  <RichTextField
                    value={(selected.body || []).join("\n\n")}
                    onChange={(str) => actions.update(selected.id, { body: [str] })} />
                </React.Fragment>}
              <div className="twk-row" style={{ gap: 8, alignItems: "center" }}>
                <div className="twk-lbl"><span>Mobile order</span></div>
                <input className="twk-field" type="number" placeholder="auto" min={1}
                       style={{ padding: "6px 8px", width: 72 }}
                       value={selected.mobileOrder !== undefined ? selected.mobileOrder : ""}
                       onChange={(e) => {
                         const v = e.target.value.trim();
                         actions.update(selected.id, { mobileOrder: v === "" ? undefined : parseInt(v, 10) });
                       }} />
              </div>
              {(() => {
                const rr = String(selected.ratio || "3/2").split("/").map(Number);
                const isVert = (selected.type === "image" || selected.type === "video") && rr[1] > rr[0];
                const curMW = selected.mobileWidth || (isVert ? 3 : 1);
                return (
                  <React.Fragment>
                    <TweakSelect label="Mobile width" value={"W" + curMW}
                                 options={["W1", "W2", "W3", "W4", "W5"]}
                                 onChange={(v) => actions.update(selected.id, { mobileWidth: parseInt(v.slice(1), 10) })} />
                    <div style={{ fontSize: 11, opacity: 0.55, padding: "0 0 4px", lineHeight: 1.5 }}>
                      W1 = full width, W5 = smallest. Anything under full width centers on the page.
                    </div>
                  </React.Fragment>
                );
              })()}
              <TweakButton label="Delete block" secondary onClick={() => actions.del(selected.id)} />
            </React.Fragment>
          )}

          {t.editLayout && !selected && (
            <div style={{ fontSize: 11, opacity: 0.55, padding: "2px 0", lineHeight: 1.5 }}>
              Click a block to select. Drag to move, side handle to resize, arrow keys to nudge.
            </div>
          )}
        </React.Fragment>
      )}

      {!onGrid && (
        <div style={{ fontSize: 11.5, opacity: 0.6, padding: "4px 0", lineHeight: 1.5 }}>
          Open a project (Projects → any title) to compose its grid.
        </div>
      )}

      {showNewProjectModal && onCreateProject && (
        <NewProjectModal onClose={() => setShowNewProjectModal(false)}
                         onCreate={onCreateProject} />
      )}
    </TweaksPanel>
  );
}
window.GridTweaks = GridTweaks;
