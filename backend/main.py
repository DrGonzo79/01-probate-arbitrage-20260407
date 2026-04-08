from fastapi import FastAPI
import uvicorn
import time

app = FastAPI(title="Probate Arbitrage API")

# Mock database of county notice extractions
mock_db = [
    {
        "id": "notice_8842",
        "raw_text": "Estate of John Doe. Letters of Administration granted 03/12/2026. 123 Maple St.",
        "extracted_address": "123 Maple St",
        "extracted_name": "John Doe",
        "zillow_estimate": 350000,
        "mortgage_balance": 200000,
        "estimated_equity": 150000,
        "outreach_status": "queued"
    }
]

@app.get("/")
def read_root():
    return {"status": "Probate Arbitrage Engine Running", "version": "1.0.0"}

@app.get("/api/pipeline")
def get_pipeline():
    """Returns the current pipeline of distressed property leads."""
    return {"leads": mock_db}

@app.post("/api/trigger_extraction")
def trigger_extraction(county: str):
    """Simulates hitting a county public record site and running an LLM extraction."""
    return {"status": "success", "message": f"Scraped 5 new notices from {county}. LLM Extraction running in background."}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)