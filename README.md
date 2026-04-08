# Probate Arbitrage AI Engine

A public-safe prototype repo for a real-estate signal engine focused on probate and distressed property notices.

## Structure
- `backend/` FastAPI service + scoring logic + tests
- `frontend/` React/Vite interactive demo
- `site/` polished static opportunity page from the canonical arbitrage-opportunities catalog
- `docs/` product and architecture documents

## Security posture
- No `.env` files committed
- No API keys or secrets committed
- `.gitignore` blocks common secret-bearing files
- `node_modules/` excluded from version control

## Local run
### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```
