import { useMemo, useState } from 'react'

const notices = [
  { county: 'Fulton County', address: '123 Maple St, Atlanta, GA', equity: 150000, age: 12, vacant: 0.82, tax: true },
  { county: 'DeKalb County', address: '88 Willow Bend, Decatur, GA', equity: 94000, age: 28, vacant: 0.71, tax: false },
  { county: 'Cobb County', address: '501 Estate Ct, Marietta, GA', equity: 210000, age: 6, vacant: 0.91, tax: true },
]

function score(lead) {
  return Math.round((Math.min(lead.equity / 250000, 1) * 40 + Math.max(0, (90 - lead.age) / 90) * 20 + lead.vacant * 25 + (lead.tax ? 15 : 0)) * 100) / 100
}

export default function App() {
  const [selected, setSelected] = useState(notices[0])
  const ranked = useMemo(() => [...notices].map(n => ({ ...n, score: score(n) })).sort((a,b) => b.score - a.score), [])

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">AI Real Estate Signal Engine</p>
          <h1>Probate & Distressed Property Arbitrage</h1>
          <p className="lead">Interactive demo showing mock county ingestion, scoring logic, and outreach prioritization. Built to look like a serious AI-engineering prototype, not a static mock.</p>
        </div>
        <div className="stat-card">
          <span>Lead Engine State</span>
          <strong>RUNNING</strong>
          <p>3 distressed leads scored from county notice stream</p>
        </div>
      </header>

      <main className="grid">
        <section className="panel">
          <h2>Ranked Leads</h2>
          {ranked.map((lead) => (
            <button key={lead.address} className={`lead-btn ${selected.address === lead.address ? 'active' : ''}`} onClick={() => setSelected(lead)}>
              <div>
                <strong>{lead.address}</strong>
                <span>{lead.county}</span>
              </div>
              <span className="score">{lead.score}</span>
            </button>
          ))}
        </section>

        <section className="panel">
          <h2>Lead Details</h2>
          <div className="detail-grid">
            <div><span>Estimated Equity</span><strong>${selected.equity.toLocaleString()}</strong></div>
            <div><span>Probate Age</span><strong>{selected.age} days</strong></div>
            <div><span>Vacancy Signal</span><strong>{Math.round(selected.vacant * 100)}%</strong></div>
            <div><span>Tax Delinquent</span><strong>{selected.tax ? 'Yes' : 'No'}</strong></div>
          </div>
          <div className="terminal">
            <p>[crawler] notice pulled from {selected.county}</p>
            <p>[extractor] property + estate metadata normalized</p>
            <p>[scoring] priority score computed = {score(selected)}</p>
            <p>[workflow] direct-mail + SMS outreach ready</p>
          </div>
        </section>
      </main>
    </div>
  )
}