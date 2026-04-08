from fastapi import FastAPI
from app.api.routes import router

app = FastAPI(title='Probate Arbitrage AI Engine', version='2.0.0')
app.include_router(router, prefix='/api')

@app.get('/')
def root():
    return {
        'status': 'running',
        'project': 'Local Real Estate Probate Arbitrage',
        'focus': 'county signal ingestion, extraction, scoring, and outreach orchestration'
    }
