from sqlalchemy.orm import Session
from models.user import User


def get_dashboard_data(db: Session):

    total_users = db.query(User).count()

    return {
        "totalUsers": total_users,
        "missionsCompleted": 0,
        "shipsDestroyed": 0,
        "accuracy": "0%",
        "playTime": "0h"
    }