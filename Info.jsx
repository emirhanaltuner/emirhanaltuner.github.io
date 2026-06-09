// Info — About / Contact. Plain first-person prose pages.
function Info({ kind, go }) {
  const data = {
    about: {
      h: "About",
      body: [
      `Emirhan Altuner is an Istanbul-based exhibition designer, scenographer and researcher with ten years of experience in cultural institutions. He is the Spatial Design and Production Manager at SALT, where he has been actively involved for the research, design, production, and installation since 2016. Working across both archival material and contemporary art, he develops spatial narratives through temporary structures, graphic systems, and adaptive reuse.`,
      `Alongside his design practice, he initiated <a data-goto="trash" class="bio-link"><em>Trash</em></a> in 2026, the program built from exhibition remnants accumulated over fifteen years of SALT's history, accompanied by a series of talks and workshops. The project extends his ongoing interest in alternative modes of circulating knowledge and material resources generated through exhibition-making.`,
      `Holding both bachelor's and master's degrees from the Istanbul Technical University (ITU), Faculty of Architecture, his master's thesis, <a href="https://tez.yok.gov.tr/UlusalTezMerkezi/tezDetay.jsp?id=dHnm5YtCeMaCBFt-loNKNg&no=Flm2FRjYRUH-gNNDDuyiVQ" target="_blank" rel="noopener"><em>Aurama: A Kind of Optic Assistant in the Fiction-Space</em></a>, explores the physical and conceptual production of fictive spaces through film, theater, exhibition, and scenography from cinematographic and theoretical perspectives. He has been teaching at the Architectural Drawing Studio at Istanbul Bilgi University since 2023.`,
      `He was recognized as one of Turkey's Young Architects Under 40 by <a href="https://thecircle-o.com/en/gemss23" target="_blank" rel="noopener">The Circle</a> in 2023.`],
      awards: [
      { year: "2023", org: "The Circle, Istanbul", title: "GEMSS: Emerging Architects Selection & Exhibition",
        desc: `He was selected as one of ten architects under 40 and exhibited in The Circle space from December 2023 to March 2024.` },
      { year: "2015", org: "Istanbul Association of Architects in Private Practice", title: "S.O.S. Haydarpaşa Competition",
        desc: `Honorable Mention for project <em>Re-Time</em> [with Pelin Arabacıoğlu].` },
      { year: "2015", org: "LIXIL Foundation, Japan", title: "5th International University Architectural Competition / First Phase",
        desc: `3rd Prize for project <em>Hanged, A House for Enjoying the Harsh Cold</em> [with Gumwörk].` },
      { year: "2014", org: "Architecture Education Association, Turkey", title: "Project Awards for Architecture Students",
        desc: `Jury's Special Award for project <em>Valley</em>.` }]

    },
    contact: {
      h: "Contact",
      body: [
      "For project enquiries, collaborations, or just to say hello:",
      '<a href="mailto:emirhanaltuner@gmail.com">emirhanaltuner@gmail.com</a>',
      'Also available on <a href="https://www.instagram.com/emirhanaltuner/" target="_blank" rel="noopener">Instagram</a> and <a href="https://tr.linkedin.com/in/emirhan-altuner-29077465" target="_blank" rel="noopener">LinkedIn</a>.']

    }
  }[kind];
  return (
    <div className={"info fade info-" + kind} style={{ textAlign: "left" }}
         onClick={(e) => {
           const t = e.target.closest && e.target.closest("[data-goto]");
           if (t && go) { e.preventDefault(); go("detail", t.getAttribute("data-goto")); }
         }}>
      {data.body.map((line, i) =>
      <p key={i} dangerouslySetInnerHTML={{ __html: line }} style={{ textAlign: "left" }} />
      )}
      {data.awards &&
      <div className="awards">
          <div className="awards-h">Awards and Recognitions</div>
          {data.awards.map((a, i) =>
          <div className="award" key={i}>
              <div className="award-meta">
                {a.year}<span className="sep">|</span>{a.org}<span className="sep">|</span>{a.title}
              </div>
              <div className="award-desc" dangerouslySetInnerHTML={{ __html: a.desc }} />
            </div>
          )}
        </div>}
    </div>);

}
window.Info = Info;