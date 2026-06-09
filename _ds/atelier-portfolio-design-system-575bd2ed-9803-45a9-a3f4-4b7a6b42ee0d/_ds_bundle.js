/* @ds-bundle: {"format":3,"namespace":"AtelierPortfolioDesignSystem_575bd2","components":[],"sourceHashes":{"ui_kits/portfolio/App.jsx":"52cd7863bf0c","ui_kits/portfolio/Detail.jsx":"4dce6ac8d3f2","ui_kits/portfolio/Header.jsx":"9af2de96dd0d","ui_kits/portfolio/Home.jsx":"569409f54feb","ui_kits/portfolio/Info.jsx":"ace832f4ab93","ui_kits/portfolio/Projects.jsx":"449fd8396231"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.AtelierPortfolioDesignSystem_575bd2 = window.AtelierPortfolioDesignSystem_575bd2 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/portfolio/App.jsx
try { (() => {
// App — SPA state machine + project data. Routes: home / projects / detail / about / contact.
const PROJECTS = [{
  id: "translated",
  title: "Translated into Socialism",
  year: "2024",
  tags: "Scenography, Production, Communication Design",
  location: "Salt Galata, Istanbul, Turkey",
  disciplines: "scenography, production, visual communication",
  links: ["// saltonline.org", "// lumbardhi.org"],
  text: "<em>Translated into Socialism</em> presents the little-known history of the Turkish-speaking community in Yugoslavia, more precisely, in Kosovo and Macedonia. It explores how, in a multinational social context, a Turkish identity was affirmed and transformed under socialist ideology."
}, {
  id: "designers-note",
  title: "Designer's Note",
  year: "2024",
  tags: "Scenography, Production",
  location: "Theatre, Berlin",
  disciplines: "scenography, production",
  links: [],
  text: "A staged essay on the role of the designer in collaborative theatre-making."
}, {
  id: "notes-on-air",
  title: "Notes on Air",
  year: "2024",
  tags: "Production",
  location: "Radio commission",
  disciplines: "production",
  links: [],
  text: "A sound-led production exploring atmosphere as material."
}, {
  id: "pnemo",
  title: "Pnemo",
  year: "2024",
  tags: "Research",
  location: "Research residency",
  disciplines: "research",
  links: [],
  text: "An ongoing research project on breath, space, and presence."
}, {
  id: "let-us-go",
  title: "Let Us Go Back to the Beginning",
  year: "2024",
  tags: "Scenography, Production, Communication Design",
  location: "Festival, Skopje",
  disciplines: "scenography, production, communication design",
  links: [],
  text: "A scenographic return to origins, staged across a former industrial site."
}, {
  id: "90s-02",
  title: "The 90s Onstage #02",
  year: "2023",
  tags: "Scenography",
  location: "National Theatre",
  disciplines: "scenography",
  links: [],
  text: "The second chapter of a series revisiting the aesthetics of the 1990s onstage."
}, {
  id: "three-seas",
  title: "In the Realm of Three Inland Seas",
  year: "2023",
  tags: "Scenography, Production",
  location: "Touring production",
  disciplines: "scenography, production",
  links: [],
  text: "A touring production mapping three landlocked seas as dramaturgical space."
}, {
  id: "gemms",
  title: "GEMMS: Emerging Architects Show",
  year: "2023",
  tags: "Public",
  location: "Public exhibition",
  disciplines: "public",
  links: [],
  text: "An exhibition design for an emerging architects showcase."
}, {
  id: "no-records",
  title: "No Further Records",
  year: "2023",
  tags: "Scenography, Production, Communication Design",
  location: "Archive installation",
  disciplines: "scenography, production, communication design",
  links: [],
  text: "An installation on the limits of the archive and what escapes the record."
}];
function App() {
  const [page, setPage] = React.useState("home");
  const [selId, setSelId] = React.useState(null);
  const go = (p, id) => {
    if (id) setSelId(id);
    setPage(p);
    window.scrollTo(0, 0);
  };
  const project = PROJECTS.find(p => p.id === selId) || PROJECTS[0];
  return /*#__PURE__*/React.createElement("div", {
    className: "ds-page app"
  }, page !== "home" && /*#__PURE__*/React.createElement(Header, {
    page: page,
    go: go
  }), page === "home" && /*#__PURE__*/React.createElement(Home, {
    go: go
  }), page === "projects" && /*#__PURE__*/React.createElement(Projects, {
    projects: PROJECTS,
    go: go
  }), page === "detail" && /*#__PURE__*/React.createElement(Detail, {
    project: project,
    go: go
  }), (page === "about" || page === "contact") && /*#__PURE__*/React.createElement(Info, {
    kind: page
  }));
}
window.App = App;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Detail.jsx
try { (() => {
// Detail — single project page: title, pipe-separated meta, // links,
// inline 4:3 image + body, wide outlined image.
function Detail({
  project,
  go
}) {
  const p = project;
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap fade"
  }, /*#__PURE__*/React.createElement("button", {
    className: "back",
    onClick: () => go("projects")
  }, "\u2190 back"), /*#__PURE__*/React.createElement("h1", {
    className: "detail-title"
  }, p.title), /*#__PURE__*/React.createElement("div", {
    className: "detail-meta"
  }, /*#__PURE__*/React.createElement("span", null, p.year), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "|"), /*#__PURE__*/React.createElement("strong", null, p.location), /*#__PURE__*/React.createElement("span", {
    className: "sep"
  }, "|"), /*#__PURE__*/React.createElement("span", {
    className: "disc"
  }, p.disciplines)), p.links && p.links.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "detail-links"
  }, p.links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    className: "dlink"
  }, l))), /*#__PURE__*/React.createElement("div", {
    className: "detail-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "detail-image"
  }), /*#__PURE__*/React.createElement("div", {
    className: "detail-text",
    dangerouslySetInnerHTML: {
      __html: p.text
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "detail-image-wide"
  }));
}
window.Detail = Detail;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Detail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Header.jsx
try { (() => {
// Header — inner header shown on every screen except Home.
// Portrait mark (left) + centered text nav. Click mark → home.
function Header({
  page,
  go
}) {
  const items = [["projects", "projects"], ["about", "about"], ["contact", "contact"]];
  const isActive = k => page === k || k === "projects" && (page === "projects" || page === "detail");
  return /*#__PURE__*/React.createElement("header", {
    className: "hdr"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wrap hdr-inner"
  }, /*#__PURE__*/React.createElement("button", {
    className: "logo",
    onClick: () => go("home"),
    "aria-label": "home"
  }, /*#__PURE__*/React.createElement("span", null, "AP")), /*#__PURE__*/React.createElement("nav", {
    className: "hdr-nav"
  }, items.map(([k, label]) => /*#__PURE__*/React.createElement("a", {
    key: k,
    className: "navlink" + (isActive(k) ? " active" : ""),
    onClick: () => go(k)
  }, label)))));
}
window.Header = Header;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Home.jsx
try { (() => {
// Home — centered portrait over text nav over a tall outlined vitrine box.
function Home({
  go
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "home fade"
  }, /*#__PURE__*/React.createElement("button", {
    className: "home-logo",
    onClick: () => go("projects"),
    "aria-label": "enter"
  }, /*#__PURE__*/React.createElement("span", null, "AP")), /*#__PURE__*/React.createElement("div", {
    className: "home-nav"
  }, /*#__PURE__*/React.createElement("a", {
    className: "hn active",
    onClick: () => go("projects")
  }, "projects"), /*#__PURE__*/React.createElement("a", {
    className: "hn",
    onClick: () => go("about")
  }, "about"), /*#__PURE__*/React.createElement("a", {
    className: "hn",
    onClick: () => go("contact")
  }, "contact")), /*#__PURE__*/React.createElement("div", {
    className: "home-box"
  }));
}
window.Home = Home;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Info.jsx
try { (() => {
// Info — About / Contact. Plain first-person prose pages.
function Info({
  kind
}) {
  const data = {
    about: {
      h: "About",
      body: ["I'm a scenographer and communication designer working across theatre, public space, and research. My practice sits at the intersection of spatial storytelling and visual systems.", "I hold an MA in Scenography and have worked with theatre companies, cultural institutions, and independent artists across Europe.", "Currently based between cities, open to collaborations and commissions."]
    },
    contact: {
      h: "Contact",
      body: ["For project enquiries, collaborations, or just to say hello:", '<a href="mailto:hello@portfolio.com">hello@portfolio.com</a>', 'Also available on <a href="#">Instagram</a> and <a href="#">LinkedIn</a>.']
    }
  }[kind];
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap info fade"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "info-h"
  }, data.h), data.body.map((line, i) => /*#__PURE__*/React.createElement("p", {
    key: i,
    dangerouslySetInnerHTML: {
      __html: line
    }
  })));
}
window.Info = Info;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Info.jsx", error: String((e && e.message) || e) }); }

// ui_kits/portfolio/Projects.jsx
try { (() => {
// Projects — filter bar + hairline works table. Filtering by discipline tag.
function Projects({
  projects,
  go
}) {
  const [filter, setFilter] = React.useState("all");
  const filters = [["all", "selected projects \u2304"], ["scenography", "scenography"], ["communication design", "communication design"], ["online", "online"], ["text", "text"]];
  const rows = projects.filter(p => filter === "all" || p.tags.toLowerCase().includes(filter));
  return /*#__PURE__*/React.createElement("div", {
    className: "wrap fade"
  }, /*#__PURE__*/React.createElement("div", {
    className: "filter-bar"
  }, filters.map(([k, label]) => /*#__PURE__*/React.createElement("button", {
    key: k,
    className: "filt" + (filter === k ? " active" : ""),
    onClick: () => setFilter(k)
  }, label))), /*#__PURE__*/React.createElement("table", {
    className: "works"
  }, /*#__PURE__*/React.createElement("tbody", null, rows.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.id,
    onClick: () => go("detail", p.id)
  }, /*#__PURE__*/React.createElement("td", {
    className: "ttl"
  }, p.title), /*#__PURE__*/React.createElement("td", {
    className: "yr"
  }, p.year), /*#__PURE__*/React.createElement("td", {
    className: "tags"
  }, p.tags))))));
}
window.Projects = Projects;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/portfolio/Projects.jsx", error: String((e && e.message) || e) }); }

})();
