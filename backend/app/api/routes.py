from fastapi import APIRouter
from app.services.lead_scoring import ProbateLead, rank_leads

router = APIRouter()

@router.get('/health')
def health():
    return {'status': 'ok', 'service': 'probate-arbitrage-engine'}

@router.get('/ranked-leads')
def ranked_leads():
    leads = [
        ProbateLead('123 Maple St, Atlanta, GA', 150000, 0.82, 12, True),
        ProbateLead('88 Willow Bend, Decatur, GA', 94000, 0.71, 28, False),
        ProbateLead('501 Estate Ct, Marietta, GA', 210000, 0.91, 6, True),
    ]
    return {'results': rank_leads(leads)}
