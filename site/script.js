const opportunities = [
  {
    id: "01",
    title: "Real Estate Probate Arbitrage",
    teaser: "County record lag vs digital investor discovery.",
    problem: "Public probate, lien, and foreclosure records often appear in fragmented local systems before institutional buyers see them in structured lead tools.",
    gap: "Analog county records vs data brokers",
    execution: "Scrape → extract → score → outreach",
    solution: "An AI workflow watches county sources, extracts parties and addresses from notices, estimates equity, and triggers instant outreach while competitors are still waiting for broker datasets to refresh.",
    file: "./01_Local_Real_Estate_Probate_and_Distressed_Property_Arbitrage.md"
  },
  {
    id: "02",
    title: "B2B Executive Movement Arbitrage",
    teaser: "Press release hiring signals vs CRM freshness.",
    problem: "New executives make early buying decisions before LinkedIn and contact databases fully reflect their role changes.",
    gap: "PR wires vs sales intelligence lag",
    execution: "Monitor → extract → enrich → outreach",
    solution: "Track executive appointments in PR wires and filings, enrich likely email patterns, and launch personalized outreach before the rest of the outbound market catches up.",
    file: "./02_B2B_Executive_Movement_Arbitrage.md"
  },
  {
    id: "03",
    title: "Sports Injury Prop Arbitrage",
    teaser: "Reporter feeds vs sportsbook prop repricing.",
    problem: "Niche prop lines often lag breaking injury information reported by beat writers and insiders.",
    gap: "Social injury news vs prop lock latency",
    execution: "Stream → classify → score → execute",
    solution: "Use reporter feeds plus low-latency classification to identify meaningful injury events and route execution before slower markets fully adjust.",
    file: "./03_Sports_Injury_and_Prop_Bet_API_Execution.md"
  },
  {
    id: "04",
    title: "Retail to Amazon FBA Arbitrage",
    teaser: "Local clearance pricing vs national e-commerce pricing.",
    problem: "Store-level markdowns create pockets of deeply discounted inventory that remain mispriced relative to Amazon demand.",
    gap: "Local inventory liquidation vs national marketplace awareness",
    execution: "Track → compare → qualify → purchase",
    solution: "Monitor local retail inventory feeds, compare against Amazon pricing and sales velocity, then act only when margin and turnover make the spread worth capturing.",
    file: "./04_E-commerce_Retail_and_Amazon_FBA_Arbitrage.md"
  },
  {
    id: "05",
    title: "Government RFP Proposal Generator",
    teaser: "Open procurement vs human proposal bottlenecks.",
    problem: "Winning teams lose time reading long solicitations and assembling compliant responses manually.",
    gap: "Fresh RFP release vs proposal drafting speed",
    execution: "Ingest → match → draft → review",
    solution: "Ingest new RFPs, map them against capabilities, and generate near-complete response packs in minutes instead of weeks.",
    file: "./05_Automated_Government_RFP_Proposal_Generator.md"
  },
  {
    id: "06",
    title: "Social Trend Ad Creative Arbitrage",
    teaser: "Trend acceleration vs agency production latency.",
    problem: "Brands miss high-leverage social moments because production cycles move slower than platform culture.",
    gap: "Social trend emergence vs ad creative turnaround",
    execution: "Detect → adapt → generate → launch",
    solution: "Watch trend velocity, match it to products, generate on-brand creative, and ship test ads before the trend collapses.",
    file: "./06_Social_Trend_to_D2C_Ad_Creative_Arbitrage.md"
  },
  {
    id: "07",
    title: "Used Vehicle Marketplace Arbitrage",
    teaser: "Seller urgency vs institutional vehicle quotes.",
    problem: "Private sellers underprice vehicles for speed, while guaranteed institutional buy quotes create a slower but cleaner valuation benchmark.",
    gap: "Local listing urgency vs instant-buy valuation engines",
    execution: "Detect → decode → quote → contact",
    solution: "Continuously scan local listings, decode VINs or infer models from images, compare against instant-buy quotes, and reach sellers before other flippers arrive.",
    file: "./07_Used_Vehicle_Marketplace_Arbitrage.md"
  },
  {
    id: "08",
    title: "Cloud Compute Spot Arbitrage",
    teaser: "Static infrastructure planning vs live spot markets.",
    problem: "Companies overpay for compute because their workload placement does not adapt fast enough to dynamic spot pricing.",
    gap: "Fixed deployment posture vs real-time cloud price shifts",
    execution: "Observe → model → migrate → save",
    solution: "Continuously compare spot and preemptible pricing across clouds, then route eligible workloads into the cheapest safe execution environment.",
    file: "./08_Cloud_Compute_Spot_Pricing_Arbitrage.md"
  },
  {
    id: "09",
    title: "Legislative Subsidy Capture",
    teaser: "Policy changes vs SMB awareness and action.",
    problem: "Businesses often discover grants and credits long after legislation creates a temporary edge for early movers.",
    gap: "Published legislation vs target market comprehension",
    execution: "Read → qualify → target → convert",
    solution: "Parse new legislation, identify who qualifies, and package outreach plus application support before awareness spreads.",
    file: "./09_Legislative_Subsidy_and_Tax_Credit_Capture.md"
  },
  {
    id: "10",
    title: "Trademark & Domain Arbitrage",
    teaser: "Emerging technical language vs domain registration speed.",
    problem: "Novel terms from papers, patents, and startup launches become commercially important before branding infrastructure catches up.",
    gap: "New technical term creation vs domain registration",
    execution: "Monitor → score → check → register",
    solution: "Watch for high-upside language, rank commercial viability, and secure naming assets before the broader market notices.",
    file: "./10_Emerging_Tech_Trademark_and_Domain_Arbitrage.md"
  },
  {
    id: "11",
    title: "Freelance Gig Arbitrage",
    teaser: "Urgent service demand vs human bidding cycles.",
    problem: "Clients need quick execution, but human freelancers still respond and deliver on manual timelines.",
    gap: "Immediate job posting vs human proposal and delivery time",
    execution: "Filter → propose → generate → deliver",
    solution: "Capture narrow classes of machine-solvable work, auto-draft proposals, and compress turnaround from hours into minutes.",
    file: "./11_Upwork___Freelance_Gig_Arbitrage.md"
  },
  {
    id: "12",
    title: "Live Event Ticketing Arbitrage",
    teaser: "Social demand spikes vs ticket repricing dynamics.",
    problem: "Demand for certain events can accelerate faster than ticket pricing models and market participants react.",
    gap: "Audience attention velocity vs ticket market repricing",
    execution: "Track → correlate → predict → act",
    solution: "Blend social growth signals with tour and venue data to identify where live demand is likely to outrun current ticket pricing.",
    file: "./12_Social_Sentiment_Live_Event_Ticketing.md"
  },
  {
    id: "13",
    title: "Cross-Chain DeFi Arbitrage",
    teaser: "CEX movement vs L2 state synchronization.",
    problem: "Price discovery can occur on centralized exchanges before decentralized venues fully reflect the move.",
    gap: "Centralized exchange updates vs on-chain propagation",
    execution: "Stream → compare → evaluate gas → trade",
    solution: "Track exchange prices and on-chain pools simultaneously, then execute only when net spread survives gas, slippage, and latency risk.",
    file: "./13_Cross-Chain_DeFi_Liquidity_Arbitrage.md"
  },
  {
    id: "14",
    title: "App Store Trend Arbitrage",
    teaser: "Search demand spikes vs app deployment speed.",
    problem: "Users search for emerging needs before incumbents ship optimized app experiences around the term.",
    gap: "Rising search demand vs product launch velocity",
    execution: "Detect → template → brand → submit",
    solution: "Use templates, AI-generated assets, and fast submission tooling to launch opportunistic micro-apps while demand is still fresh.",
    file: "./14_App_Store_Trend_and_ASO_Arbitrage.md"
  }
];

const list = document.getElementById("demo-list");
const title = document.getElementById("demo-title");
const problem = document.getElementById("demo-problem");
const gap = document.getElementById("demo-gap");
const execution = document.getElementById("demo-execution");
const solution = document.getElementById("demo-solution");
const link = document.getElementById("demo-link");

function render(selectedId = "01") {
  list.innerHTML = "";

  opportunities.forEach((opportunity) => {
    const button = document.createElement("button");
    button.className = `demo-item${opportunity.id === selectedId ? " active" : ""}`;
    button.type = "button";
    button.innerHTML = `<strong>${opportunity.id}. ${opportunity.title}</strong><span>${opportunity.teaser}</span>`;
    button.addEventListener("click", () => update(opportunity.id));
    list.appendChild(button);
  });

  update(selectedId, false);
}

function update(selectedId, rerender = true) {
  const selected = opportunities.find((item) => item.id === selectedId) || opportunities[0];
  title.textContent = selected.title;
  problem.textContent = selected.problem;
  gap.textContent = selected.gap;
  execution.textContent = selected.execution;
  solution.textContent = selected.solution;
  link.href = selected.file;

  if (rerender) render(selected.id);
}

render();
