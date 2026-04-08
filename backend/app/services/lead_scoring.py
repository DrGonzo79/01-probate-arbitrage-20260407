from dataclasses import dataclass
from typing import List

@dataclass
class ProbateLead:
    address: str
    equity: int
    vacancy_signal: float
    probate_age_days: int
    tax_delinquent: bool


def score_lead(lead: ProbateLead) -> float:
    score = 0.0
    score += min(lead.equity / 250000, 1.0) * 40
    score += max(0, (90 - lead.probate_age_days) / 90) * 20
    score += lead.vacancy_signal * 25
    score += 15 if lead.tax_delinquent else 0
    return round(score, 2)


def rank_leads(leads: List[ProbateLead]) -> list[dict]:
    ranked = []
    for lead in leads:
        ranked.append(
            {
                "address": lead.address,
                "score": score_lead(lead),
                "equity": lead.equity,
                "tax_delinquent": lead.tax_delinquent,
            }
        )
    return sorted(ranked, key=lambda row: row["score"], reverse=True)
