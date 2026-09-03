from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from database.database import get_db
from schemas.settings import SettingsCreate
from services.settings_service import save_settings, get_settings

router = APIRouter(
    prefix="/settings",
    tags=["Settings"]
)


@router.post("/")
def create_settings(
    settings: SettingsCreate,
    db: Session = Depends(get_db)
):
    return save_settings(db, settings)


@router.get("/{username}")
def read_settings(
    username: str,
    db: Session = Depends(get_db)
):
    return get_settings(db, username)