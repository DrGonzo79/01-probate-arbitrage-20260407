import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [properties, setProperties] = useState([
    { id: 1, address: "123 Maple St, Atlanta, GA", owner: "John Doe Estate", equity: "$150,000", status: "New Notice", action: "Pending SMS" },
    { id: 2, address: "456 Oak Dr, Fulton, GA", owner: "Smith Trust", equity: "$85,000", status: "Extraction Done", action: "Lob Mail Sent" },
    { id: 3, address: "789 Pine Ln, Dekalb, GA", owner: "Jane Roe", equity: "$210,000", status: "Scraping", action: "Calculating..." }
  ]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>🏡 Real Estate Probate Arbitrage Engine</h1>
        <p>Real-time county data extraction & automated outreach.</p>
      </header>
      <main>
        <div className="dashboard">
          <h2>Live Lead Pipeline</h2>
          <table>
            <thead>
              <tr>
                <th>Property Address</th>
                <th>Owner/Estate</th>
                <th>Estimated Equity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(prop => (
                <tr key={prop.id}>
                  <td>{prop.address}</td>
                  <td>{prop.owner}</td>
                  <td className="equity">{prop.equity}</td>
                  <td>{prop.status}</td>
                  <td><button>{prop.action}</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default App;