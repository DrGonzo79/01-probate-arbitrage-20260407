const demoData = {
  "title": "Local Real Estate Probate & Distressed Property Arbitrage",
  "views": [
    {
      "id": "mechanism",
      "label": "AI Arbitrage Mechanism",
      "teaser": "How the edge is captured and executed.",
      "summary": "An AI pipeline that instantly monitors, scrapes, and parses unstructured county data the moment it hits the public domain. It cross-references the addresses via Zillow/Redfin APIs to estimate equity, and automatically dispatches cash-offer SMS or physical mail via APIs (Twilio, Lob) before human investors ever see the lead.",
      "secondary": "Automation-first opportunity capture",
      "score": 92,
      "bullets": [
        "An AI pipeline that instantly monitors, scrapes, and parses unstructured county data the moment it hits the public domain. It cross-references the addresses via Zillow/Redfin APIs to estimate equity, and automatically dispatches cash-offer SMS or physical mail via APIs (Twilio, Lob) before human investors ever see the lead."
      ]
    },
    {
      "id": "architecture",
      "label": "Architecture & Components",
      "teaser": "Monitoring, decisioning, and execution stack.",
      "summary": "Core automated components required to run the workflow.",
      "secondary": "Operational system design",
      "score": 88,
      "bullets": [
        "**Monitoring:** Firecrawl/Playwright bots scanning county sites daily.",
        "**Decision Engine:** LLMs (Claude/GPT-4) extracting entities (Names, Addresses, Dates) from unstructured PDFs. API calls to Zillow to confirm property value > debt.",
        "**Execution:** Automated CRM entry and immediate API-triggered outbound marketing (Lob for overnight letters, Twilio for SMS)."
      ]
    },
    {
      "id": "speed-gap",
      "label": "Speed Gap",
      "teaser": "Where incumbents are too slow.",
      "summary": "County clerk offices publish probate, tax lien, and foreclosure data in analog or unstructured formats (PDFs, physical boards, obscure portals). Institutional buyers (Opendoor, large flippers) rely on data brokers like PropStream, which inherently have a 30-90 day lag in aggregating and cleaning this data. The 'speed gap' is the time between a property becoming legally distressed and the broader market finding out.",
      "secondary": "Underlying market lag thesis",
      "score": 90,
      "bullets": [
        "County clerk offices publish probate, tax lien, and foreclosure data in analog or unstructured formats (PDFs, physical boards, obscure portals). Institutional buyers (Opendoor, large flippers) rely on data brokers like PropStream, which inherently have a 30-90 day lag in aggregating and cleaning this data. The 'speed gap' is the time between a property becoming legally distressed and the broader market finding out."
      ]
    },
    {
      "id": "risk",
      "label": "Risk Profile",
      "teaser": "Compression horizon and operational constraints.",
      "summary": "Local municipalities blocking scrapers; high operational friction closing the actual physical real estate deals. Gap compression: 2-4 years as counties modernize their tech.",
      "secondary": "Timing and execution risk",
      "score": 74,
      "bullets": [
        "Local municipalities blocking scrapers; high operational friction closing the actual physical real estate deals. Gap compression: 2-4 years as counties modernize their tech."
      ]
    },
    {
      "id": "prototype",
      "label": "Prototype Build",
      "teaser": "Immediate Day 1 execution plan.",
      "summary": "Fastest path to a working proof of concept.",
      "secondary": "Launch sequence",
      "score": 86,
      "bullets": [
        "Write a Python script to monitor a single county's probate public notice board.",
        "Pass new notices to Claude to extract Address and Heir Name.",
        "Send a Slack alert with a Zillow link and a pre-drafted outreach letter."
      ]
    }
  ]
};


const navList = document.getElementById("navList");
const panelTitle = document.getElementById("panelTitle");
const panelSummary = document.getElementById("panelSummary");
const panelSecondary = document.getElementById("panelSecondary");
const panelScore = document.getElementById("panelScore");
const panelBullets = document.getElementById("panelBullets");
const scoreValue = document.getElementById("scoreValue");
const scoreLabel = document.getElementById("scoreLabel");

function render(selectedId = demoData.views[0].id) {
  navList.innerHTML = "";
  demoData.views.forEach((view) => {
    const button = document.createElement("button");
    button.className = `nav-item${view.id === selectedId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${view.label}</strong><span>${view.teaser}</span>`;
    button.addEventListener("click", () => update(view.id));
    navList.appendChild(button);
  });
  update(selectedId, false);
}

function update(selectedId, rerender = true) {
  const selected = demoData.views.find((item) => item.id === selectedId) || demoData.views[0];
  panelTitle.textContent = selected.label;
  panelSummary.textContent = selected.summary;
  panelSecondary.textContent = selected.secondary;
  panelScore.textContent = selected.score;
  scoreValue.textContent = selected.score;
  scoreLabel.textContent = selected.teaser;
  panelBullets.innerHTML = "";
  selected.bullets.forEach((bullet) => {
    const li = document.createElement("li");
    li.textContent = bullet;
    panelBullets.appendChild(li);
  });
  if (rerender) render(selected.id);
}

render();
