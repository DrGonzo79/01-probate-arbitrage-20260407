from app.services.lead_scoring import ProbateLead, score_lead


def test_score_lead_returns_positive_score():
    lead = ProbateLead('123 Maple St', 150000, 0.8, 10, True)
    assert score_lead(lead) > 0
