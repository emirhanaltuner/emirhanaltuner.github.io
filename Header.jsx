// Header — inner header shown on every screen except Home.
// Portrait mark (left) + centered text nav. Click mark → home.
function Header({ page, go }) {
  const items = [["projects", "projects"], ["about", "about"], ["contact", "contact"]];
  const isActive = (k) =>
    page === k || (k === "projects" && (page === "projects" || page === "detail"));
  return (
    <header className="hdr">
      <div className="wrap hdr-inner">
        <button className="logo" onClick={() => go("home")} aria-label="home">
          <span>AP</span>
        </button>
        <nav className="hdr-nav">
          {items.map(([k, label]) => (
            <a key={k} className={"navlink" + (isActive(k) ? " active" : "")}
               onClick={() => go(k)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
window.Header = Header;
