/* ================================================================
   ProbateEdge — Interactive Demo Engine
   Simulates the full pipeline: Scan → Extract → Score → Outreach
   ================================================================ */

(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Mock data — realistic leads per county
     ------------------------------------------------------------------ */
  const COUNTY_DATA = {
    fulton: {
      name: 'Fulton County, GA',
      leads: [
        { address: '123 Maple St, Atlanta, GA 30312', heir: 'James Robinson', equity: 152000, age: 8, vacant: 0.88, tax: true, filing: 'PRB-2026-0412' },
        { address: '4507 Peachtree Rd NE, Atlanta, GA 30319', heir: 'Maria Chen', equity: 245000, age: 14, vacant: 0.72, tax: false, filing: 'PRB-2026-0398' },
        { address: '891 Boulevard SE, Atlanta, GA 30312', heir: 'David Thompson', equity: 98000, age: 22, vacant: 0.65, tax: true, filing: 'PRB-2026-0387' },
        { address: '2210 Cascade Rd SW, Atlanta, GA 30311', heir: 'Angela Williams', equity: 178000, age: 5, vacant: 0.93, tax: true, filing: 'PRB-2026-0415' },
      ],
    },
    dekalb: {
      name: 'DeKalb County, GA',
      leads: [
        { address: '88 Willow Bend Dr, Decatur, GA 30030', heir: 'Robert King', equity: 94000, age: 28, vacant: 0.71, tax: false, filing: 'DK-2026-1187' },
        { address: '1504 Church St, Decatur, GA 30030', heir: 'Patricia Gomez', equity: 186000, age: 10, vacant: 0.82, tax: true, filing: 'DK-2026-1201' },
        { address: '322 Coventry Rd, Decatur, GA 30030', heir: 'Michael Park', equity: 127000, age: 18, vacant: 0.77, tax: false, filing: 'DK-2026-1195' },
      ],
    },
    cobb: {
      name: 'Cobb County, GA',
      leads: [
        { address: '501 Estate Ct, Marietta, GA 30062', heir: 'Sarah Mitchell', equity: 210000, age: 6, vacant: 0.91, tax: true, filing: 'CB-2026-0854' },
        { address: '1733 Johnson Ferry Rd, Marietta, GA 30062', heir: 'William Davis', equity: 165000, age: 12, vacant: 0.84, tax: false, filing: 'CB-2026-0861' },
        { address: '244 Powers Park Dr, Marietta, GA 30064', heir: 'Jennifer Lee', equity: 89000, age: 30, vacant: 0.60, tax: true, filing: 'CB-2026-0843' },
      ],
    },
    gwinnett: {
      name: 'Gwinnett County, GA',
      leads: [
        { address: '4120 Sugarloaf Pkwy, Lawrenceville, GA 30044', heir: 'Carlos Rodriguez', equity: 195000, age: 4, vacant: 0.95, tax: true, filing: 'GW-2026-2105' },
        { address: '1890 Duluth Hwy, Duluth, GA 30097', heir: 'Karen White', equity: 142000, age: 16, vacant: 0.78, tax: false, filing: 'GW-2026-2098' },
        { address: '763 Grayson Hwy, Lawrenceville, GA 30046', heir: 'Thomas Brown', equity: 76000, age: 35, vacant: 0.55, tax: false, filing: 'GW-2026-2089' },
        { address: '2905 Peachtree Industrial Blvd, Duluth, GA 30097', heir: 'Emily Zhang', equity: 228000, age: 7, vacant: 0.89, tax: true, filing: 'GW-2026-2112' },
      ],
    },
  };

  /* ------------------------------------------------------------------
     Lead scoring algorithm (matches backend/app/services/lead_scoring.py)
     ------------------------------------------------------------------ */
  function scoreLead(lead) {
    let s = 0;
    s += Math.min(lead.equity / 250000, 1.0) * 40;
    s += Math.max(0, (90 - lead.age) / 90) * 20;
    s += lead.vacant * 25;
    s += lead.tax ? 15 : 0;
    return Math.round(s * 100) / 100;
  }

  /* ------------------------------------------------------------------
     DOM references
     ------------------------------------------------------------------ */
  const $ = (id) => document.getElementById(id);
  const logEntries = $('logEntries');
  const leadsBody = $('leadsBody');
  const leadDetail = $('leadDetail');
  const runBtn = $('runBtn');
  const countySelect = $('countySelect');
  const leadCountEl = $('leadCount');
  const pipelineProgress = $('pipelineProgress');
  const heroPipeline = $('heroPipeline');
  const heroStatus = $('heroStatus');
  const earlyAccessForm = $('earlyAccessForm');

  let discoveredLeads = [];
  let selectedLead = null;
  let isRunning = false;

  /* ------------------------------------------------------------------
     Utility helpers
     ------------------------------------------------------------------ */
  function timestamp() {
    const now = new Date();
    return [now.getHours(), now.getMinutes(), now.getSeconds()]
      .map((n) => String(n).padStart(2, '0'))
      .join(':');
  }

  function addLog(level, msg) {
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.innerHTML = `<span class="log-time">[${timestamp()}]</span><span class="log-level ${level}">${level.toUpperCase()}</span><span class="log-msg">${msg}</span>`;
    logEntries.appendChild(entry);
    logEntries.scrollTop = logEntries.scrollHeight;
  }

  function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function formatCurrency(n) {
    return '$' + n.toLocaleString();
  }

  function setProgressStep(stepName, state) {
    const steps = pipelineProgress.querySelectorAll('.progress-step');
    steps.forEach((s) => {
      if (s.dataset.step === stepName) {
        s.className = 'progress-step ' + state;
      }
    });
  }

  function setHeroPipelineStep(stepName, state) {
    if (!heroPipeline) return;
    const steps = heroPipeline.querySelectorAll('.pipeline-step');
    steps.forEach((s) => {
      if (s.dataset.step === stepName) {
        s.className = `pipeline-step step-${stepName} ${state}`;
        const statusEl = s.querySelector('.step-status');
        if (state === 'active') {
          statusEl.className = 'step-status running';
          statusEl.textContent = 'Running';
        } else if (state === 'complete') {
          statusEl.className = 'step-status done';
          statusEl.textContent = 'Done';
        } else {
          statusEl.className = 'step-status pending';
          statusEl.textContent = 'Idle';
        }
      }
    });
  }

  function resetPipeline() {
    ['scan', 'extract', 'score', 'outreach'].forEach((step) => {
      setProgressStep(step, '');
      setHeroPipelineStep(step, '');
    });
    if (heroStatus) heroStatus.textContent = '● Pipeline idle';
  }

  /* ------------------------------------------------------------------
     Render leads table
     ------------------------------------------------------------------ */
  function renderLeadsTable() {
    if (discoveredLeads.length === 0) {
      leadsBody.innerHTML = `<tr><td colspan="8"><div class="empty-state"><div class="empty-state-icon">📡</div><p>No leads yet. Run the pipeline to discover distressed properties.</p></div></td></tr>`;
      return;
    }
    leadsBody.innerHTML = '';
    discoveredLeads.forEach((lead, idx) => {
      const tr = document.createElement('tr');
      tr.className = selectedLead === lead ? 'selected' : '';
      const scoreBadge = lead.score >= 80 ? 'badge-success' : lead.score >= 60 ? 'badge-warning' : 'badge-danger';
      const statusBadge = lead.outreachSent ? '<span class="badge badge-success">Outreach sent</span>' : '<span class="badge badge-muted">Pending</span>';
      tr.innerHTML = `
        <td><strong>${lead.address}</strong></td>
        <td>${lead.countyName}</td>
        <td class="equity-cell">${formatCurrency(lead.equity)}</td>
        <td>${lead.age}d</td>
        <td>${Math.round(lead.vacant * 100)}%</td>
        <td>${lead.tax ? '⚠️ Yes' : 'No'}</td>
        <td class="score-cell"><span class="badge ${scoreBadge}">${lead.score}</span></td>
        <td>${statusBadge}</td>
      `;
      tr.addEventListener('click', () => selectLead(lead));
      leadsBody.appendChild(tr);
    });
    leadCountEl.textContent = discoveredLeads.length;
  }

  /* ------------------------------------------------------------------
     Select & display lead detail
     ------------------------------------------------------------------ */
  function selectLead(lead) {
    selectedLead = lead;
    renderLeadsTable();
    leadDetail.style.display = 'block';
    $('detailAddress').textContent = lead.address;
    $('detailCounty').textContent = lead.countyName + '  •  Filing ' + lead.filing;
    $('detailScore').textContent = lead.score;
    $('detailEquity').textContent = formatCurrency(lead.equity);
    $('detailAge').textContent = lead.age + ' days';
    $('detailVacancy').textContent = Math.round(lead.vacant * 100) + '%';
    $('detailTax').textContent = lead.tax ? 'Yes' : 'No';
    $('outreachText').textContent =
      `Dear ${lead.heir}, we are writing regarding the property at ${lead.address}. Our records indicate a recent probate filing (${lead.filing}) in ${lead.countyName}. We would like to make a fair, all-cash offer for the property at your earliest convenience. Please reply or call us to discuss.`;

    // Reset outreach buttons
    const mailBtn = $('sendMailBtn');
    const smsBtn = $('sendSmsBtn');
    const crmBtn = $('addCrmBtn');
    if (lead.outreachSent) {
      mailBtn.className = 'outreach-btn sent';
      mailBtn.textContent = '✉️ Mail Sent';
      smsBtn.className = 'outreach-btn sent';
      smsBtn.textContent = '📱 SMS Sent';
      crmBtn.className = 'outreach-btn sent';
      crmBtn.textContent = '📋 In CRM';
    } else {
      mailBtn.className = 'outreach-btn';
      mailBtn.innerHTML = '✉️ Send Direct Mail';
      smsBtn.className = 'outreach-btn';
      smsBtn.innerHTML = '📱 Send SMS';
      crmBtn.className = 'outreach-btn';
      crmBtn.innerHTML = '📋 Add to CRM';
    }

    // Scroll detail into view on mobile
    leadDetail.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  /* ------------------------------------------------------------------
     Outreach button handlers
     ------------------------------------------------------------------ */
  function setupOutreachButtons() {
    $('sendMailBtn').addEventListener('click', function () {
      if (!selectedLead || this.classList.contains('sent')) return;
      this.className = 'outreach-btn sent';
      this.textContent = '✉️ Mail Sent';
      addLog('success', `Direct mail dispatched via Lob to ${selectedLead.heir}`);
      selectedLead.outreachSent = true;
      renderLeadsTable();
    });
    $('sendSmsBtn').addEventListener('click', function () {
      if (!selectedLead || this.classList.contains('sent')) return;
      this.className = 'outreach-btn sent';
      this.textContent = '📱 SMS Sent';
      addLog('success', `SMS sent via Twilio to ${selectedLead.heir}`);
      selectedLead.outreachSent = true;
      renderLeadsTable();
    });
    $('addCrmBtn').addEventListener('click', function () {
      if (!selectedLead || this.classList.contains('sent')) return;
      this.className = 'outreach-btn sent';
      this.textContent = '📋 In CRM';
      addLog('success', `Lead added to CRM: ${selectedLead.address}`);
    });
  }

  /* ------------------------------------------------------------------
     Main pipeline simulation
     ------------------------------------------------------------------ */
  async function runPipeline() {
    if (isRunning) return;
    isRunning = true;
    runBtn.disabled = true;
    runBtn.innerHTML = '<span class="btn-icon">⏳</span> Running…';

    const countyKey = countySelect.value;
    const county = COUNTY_DATA[countyKey];
    if (!county) return;

    // Clear previous state
    discoveredLeads = [];
    selectedLead = null;
    leadDetail.style.display = 'none';
    renderLeadsTable();
    resetPipeline();
    logEntries.innerHTML = '';

    addLog('info', `Pipeline started for ${county.name}`);
    if (heroStatus) heroStatus.innerHTML = '<span style="color:var(--primary)">● Pipeline running</span>';

    // Stage 1: Scan
    setProgressStep('scan', 'active');
    setHeroPipelineStep('scan', 'active');
    addLog('info', `Initializing Firecrawl scraper for ${county.name}…`);
    await wait(900);
    addLog('info', `Connecting to county clerk portal…`);
    await wait(700);
    addLog('success', `${county.leads.length} new probate filings discovered`);
    setProgressStep('scan', 'complete');
    setHeroPipelineStep('scan', 'complete');

    // Stage 2: Extract
    setProgressStep('extract', 'active');
    setHeroPipelineStep('extract', 'active');
    addLog('info', 'Routing PDFs to Claude 3.5 for entity extraction…');
    await wait(600);

    for (let i = 0; i < county.leads.length; i++) {
      const lead = county.leads[i];
      await wait(400 + Math.random() * 400);
      addLog('success', `Extracted: ${lead.address} — Heir: ${lead.heir}`);
    }
    setProgressStep('extract', 'complete');
    setHeroPipelineStep('extract', 'complete');

    // Stage 3: Score
    setProgressStep('score', 'active');
    setHeroPipelineStep('score', 'active');
    addLog('info', 'Cross-referencing Zillow API for property valuations…');
    await wait(800);
    addLog('info', 'Computing multi-factor lead scores…');
    await wait(500);

    const scored = county.leads.map((lead) => ({
      ...lead,
      countyName: county.name,
      score: scoreLead(lead),
      outreachSent: false,
    }));
    scored.sort((a, b) => b.score - a.score);
    discoveredLeads = scored;

    for (const lead of scored) {
      addLog('info', `${lead.address} → Score: ${lead.score} | Equity: ${formatCurrency(lead.equity)}`);
      await wait(300);
    }
    renderLeadsTable();
    setProgressStep('score', 'complete');
    setHeroPipelineStep('score', 'complete');

    // Stage 4: Outreach
    setProgressStep('outreach', 'active');
    setHeroPipelineStep('outreach', 'active');
    addLog('info', 'Preparing automated outreach for top leads…');
    await wait(600);

    // Auto-outreach for top-scoring leads (score >= 75)
    const topLeads = scored.filter((l) => l.score >= 75);
    for (const lead of topLeads) {
      await wait(500);
      lead.outreachSent = true;
      addLog('success', `Lob letter + Twilio SMS dispatched → ${lead.heir} (${lead.address})`);
    }
    renderLeadsTable();
    setProgressStep('outreach', 'complete');
    setHeroPipelineStep('outreach', 'complete');

    if (heroStatus) heroStatus.innerHTML = '<span style="color:var(--success)">● Pipeline complete</span>';
    addLog('success', `Pipeline complete. ${scored.length} leads scored, ${topLeads.length} outreach sent.`);

    // Auto-select top lead
    if (scored.length > 0) {
      selectLead(scored[0]);
    }

    isRunning = false;
    runBtn.disabled = false;
    runBtn.innerHTML = '<span class="btn-icon">▶</span> Run Pipeline';
  }

  /* ------------------------------------------------------------------
     Hero pipeline auto-animation on page load
     ------------------------------------------------------------------ */
  async function animateHero() {
    await wait(1500);
    const steps = ['scan', 'extract', 'score', 'outreach'];
    if (heroStatus) heroStatus.innerHTML = '<span style="color:var(--primary)">● Running demo</span>';
    for (let i = 0; i < steps.length; i++) {
      setHeroPipelineStep(steps[i], 'active');
      await wait(1200);
      setHeroPipelineStep(steps[i], 'complete');
    }
    if (heroStatus) heroStatus.innerHTML = '<span style="color:var(--success)">● Complete</span>';
    await wait(3000);
    resetPipeline();
    // Loop
    animateHero();
  }

  /* ------------------------------------------------------------------
     Early access form
     ------------------------------------------------------------------ */
  function setupForm() {
    if (!earlyAccessForm) return;
    earlyAccessForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const input = this.querySelector('input');
      const email = input.value;
      if (!email) return;
      input.value = '';
      const btn = this.querySelector('button');
      btn.textContent = '✓ Request Sent';
      btn.style.background = 'var(--success)';
      setTimeout(() => {
        btn.textContent = 'Request Access';
        btn.style.background = '';
      }, 3000);
    });
  }

  /* ------------------------------------------------------------------
     Init
     ------------------------------------------------------------------ */
  function init() {
    runBtn.addEventListener('click', runPipeline);
    setupOutreachButtons();
    setupForm();
    animateHero();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
