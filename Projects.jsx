// Projects — hairline works ledger. The page frame is 1400px (matching the detail
// grid); the table text area is 1100px, centered. Columns: title (540) · year (90) ·
// a 75px gap · categories. Filtering is driven by the TopBar filter group. A few
// trailing empty rules give the editorial ledger look. Content starts 250px from top.
//
// The rows are reflect-only: they always navigate to the detail page on click and
// keep their plain editorial look. Title / year / categories are EDITED on each
// project's detail page (Edit mode); those header edits flow back here automatically
// because App feeds this list the header-merged projects.
function Projects({ projects, filter, go, isPublished, editing }) {
  const rows = projects.
  filter((p) => filter === "all" ? p.selected !== false : (p.disciplines || p.tags || "").toLowerCase().includes(filter))
  // Drafts ("Show in website" off) are hidden from the live ledger. In Edit mode they
  // stay listed (marked "draft") so you can reach and keep working on them.
  .filter((p) => editing || (isPublished ? isPublished(p) : true))
  // newest first — sort by year descending (stable, so same-year order is preserved)
  .slice().
  sort((a, b) => Number(b.year) - Number(a.year));
  return (
    <div className="projects fade">
      <div className="works2">
        {rows.map((p) => {
        const draft = isPublished && !isPublished(p);
        return (
          <div className={"work-row" + (draft ? " is-draft" : "")} key={p.id} onClick={() => go("detail", p.id)}>
            <div className="w-ttl" style={{ width: "500px" }}>
              {p.title}
              {draft && <span className="draft-tag">draft</span>}
            </div>
            <div className="w-yr" style={{ textAlign: "center", transform: "translateX(150px)" }}>{p.year}</div>
            <div className="w-tags" style={{ textAlign: "left" }}>{p.disciplines || p.tags}</div>
          </div>
        );
        })}
      </div>
    </div>);

}
window.Projects = Projects;