// InfoGrid — About / Contact rendered through the SAME editable block grid as the
// project detail pages. No page heading: the grid begins at the very top pixel where
// a project title would sit (the .detail-wide 190px top offset), per the brief.
// Internal [data-goto] links (e.g. About → Trash) navigate via the wrapper handler.
//
// State, persistence, add/move/resize and the Tweaks inspector are all reused from
// the project-page system — App.jsx routes "about"/"contact" here with their own
// layout keyed by the page id (see INFO_PAGES + the grid-id resolution in App.jsx).
function InfoGrid({ page, project, layout, tweaks, selectedId, onSelect, onChange, go }) {
  const p = project;
  const MG = window.MediaGrid;
  return (
    <div className={"wrap-wide detail-wide fade info-grid info-" + page}
         onClick={(e) => {
           const t = e.target.closest && e.target.closest("[data-goto]");
           if (t && go) { e.preventDefault(); go("detail", t.getAttribute("data-goto")); }
         }}>
      <MG project={p} layout={layout} tweaks={tweaks}
          selectedId={selectedId} onSelect={onSelect} onChange={onChange} />
    </div>
  );
}
window.InfoGrid = InfoGrid;
