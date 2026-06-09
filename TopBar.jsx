// TopBar — the single site header used on every page. Logo sits top-left always.
// Three modes by page:
//   • home               → simple nav (projects · about · contact) at the RIGHT corner
//   • projects / detail   → filter group CENTER + (about · contact) RIGHT, caret on active
//   • about / contact     → simple nav CENTER with the active item highlighted + caret
// The header is absolutely positioned over the top band so each page's content can
// begin at a fixed offset (250px / 220px) below it.
function TopBar({ page, filter, setFilter, go, projects }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [projOpen, setProjOpen] = React.useState(false);
  // Add a subtle border when page is scrolled
  React.useEffect(() => {
    const el = document.querySelector(".topbar");
    const onScroll = () => el && el.classList.toggle("scrolled", window.scrollY > 5);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  // Derive filter list dynamically from all project tags — "selected" is always first,
  // then every unique tag found across projects, lowercased and sorted alphabetically.
  const filters = React.useMemo(() => {
    const PREFERRED = ["scenography", "communication design", "visual communication", "program", "online"];
    const seen = new Set();
    (projects || []).forEach((p) => {
      const source = p.disciplines || p.tags || "";
      if (!source) return;
      source.split(",").forEach((t) => {
        const tag = t.trim().toLowerCase();
        if (tag !== "production") seen.add(tag);
      });
    });
    const sorted = [...seen].sort((a, b) => {
      const ai = PREFERRED.indexOf(a);
      const bi = PREFERRED.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
    return [["all", "selected"], ...sorted.map((t) => [t, t])];
  }, [projects]);
  const simple = [["projects", "projects"], ["about", "about"], ["contact", "contact"]];

  const mode = page === "home" ? "home"
    : (page === "about" || page === "contact") ? "info"
    : "filter"; // projects + detail

  const pick = (k) => { setFilter(k); go("projects"); };

  // Mobile hamburger menu — about / contact / projects (expands to categories)
  const goM = (p, id) => { setMenuOpen(false); setProjOpen(false); go(p, id); };
  const pickM = (k) => { setMenuOpen(false); setProjOpen(false); pick(k); };
  const mobileNav = (
    <div className="topbar-mobile">
      <button className="hamburger" aria-label="menu" aria-expanded={menuOpen}
              onClick={() => setMenuOpen((o) => !o)}>{menuOpen ? "\u00D7" : "\u2630"}</button>
      {menuOpen && (
        <div className="mobile-menu">
          <button className="mm-item" onClick={() => goM("about")}>about</button>
          <button className="mm-item" onClick={() => goM("contact")}>contact</button>
          <button className="mm-item" onClick={() => setProjOpen((o) => !o)}>
            <span>projects</span>
            <span className={"mm-caret" + (projOpen ? " open" : "")}>{"\u2304"}</span>
          </button>
          {projOpen && (
            <div className="mm-sub">
              {filters.map(([k, label]) => (
                <button key={k} className={"mm-subitem" + (filter === k ? " active" : "")}
                        onClick={() => pickM(k)}>{label}</button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // label whose width is reserved at bold, so the active state never shifts neighbors
  const Label = ({ text }) => (
    <span className="tlabel" data-t={text}><span>{text}</span></span>
  );

  const logo = (
    <button className="topbar-logo" onClick={() => go("home")} aria-label="home">
      <image-slot id="home-logo" shape="rect" style={{ pointerEvents: "none" }}></image-slot>
    </button>
  );

  // filter group (center) — used on projects / detail
  const filterNav = (
    <nav className="topbar-center">
      {filters.map(([k, label]) => (
        <button key={k} className={"tf" + (filter === k && page !== "detail" ? " active" : "")} onClick={() => pick(k)}>
          <Label text={label} />
          {filter === k && <span className={"caret" + (page === "detail" ? " caret-up" : "")}>{"\u2304"}</span>}
        </button>
      ))}
    </nav>
  );

  // simple nav — used on home (right) and about/contact (right, active highlighted)
  const simpleNav = (cls) => (
    <nav className={cls}>
      {simple.map(([k, label]) => {
        const active = mode === "info" && page === k;
        return (
          <button key={k} className="tf" onClick={() => go(k)}>
            <Label text={label} />
            {active && <span className="caret">{"\u2304"}</span>}
          </button>
        );
      })}
    </nav>
  );

  let center, right;
  if (mode === "filter") {
    center = filterNav;
    right = (
      <nav className="topbar-right">
        <a className="tf" onClick={() => go("about")}><Label text="about" /></a>
        <a className="tf" onClick={() => go("contact")}><Label text="contact" /></a>
      </nav>
    );
  } else if (mode === "info") {
    center = <nav className="topbar-center"></nav>;
    right = simpleNav("topbar-right");
  } else { // home
    center = <nav className="topbar-center"></nav>;
    right = simpleNav("topbar-right");
  }

  return (
    <header className="topbar fade">
      {logo}
      {center}
      {right}
      {mobileNav}
    </header>
  );
}
window.TopBar = TopBar;
