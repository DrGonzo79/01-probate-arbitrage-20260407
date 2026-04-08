# Product Requirements Document (PRD): Local Real Estate Probate Arbitrage

## 1. Overview
The "Speed Gap" in real estate happens between the moment public county records (probate, tax liens, distressed property) hit analog or obscure county portals, and the moment big data brokers (PropStream, Zillow) index them. This project is a prototype of an AI-driven data arbitrage engine that bridges that gap.

## 2. Problem Statement
Institutional buyers and flippers experience a 30-90 day lag in distressed property data because they rely on aggregated data brokers. By the time they see a distressed property, the market is saturated.

## 3. Solution Concept
A localized, high-frequency scraper that monitors specific county public notice boards, uses LLMs to extract names, addresses, and distress vectors from unstructured PDFs, and instantly values the property via real estate APIs to generate an immediate cash-offer workflow.

## 4. Technical Architecture
* **Frontend:** React.js dashboard showing real-time ingested notices, extracted addresses, estimated equity, and an "Action" column for automated outreach.
* **Backend:** Python (FastAPI) API server.
* **Data Ingestion:** Python scraper (BeautifulSoup/Firecrawl) targeting mock county sites.
* **Extraction Engine:** OpenAI/Anthropic API integration for unstructured PDF/text parsing.
* **Outreach Execution (Mocked):** Twilio API for SMS / Lob API for direct mail integration.

## 5. Prototype Scope
* Provide a working Python backend that simulates county notice monitoring and entity extraction.
* Provide a React frontend dashboard to view the "pipeline" of distressed properties.
* Provide a live mock demo website explaining the arbitrage strategy to potential buyers or partners.

## 6. Future Expansion
* Integrate automated title-checking APIs.
* Scale to 100+ counties using a generic Playwright-based crawler.
* Automate the signing and dispatching of physical Lob letters via smart contracts.