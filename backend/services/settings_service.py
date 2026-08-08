from sqlalchemy.orm import Session

from models.settings import Settings


def save_settings(db: Session, data):

    settings = db.query(Settings).filter(
        Settings.username == data.username
    ).first()

    if settings:

        settings.theme = data.theme
        settings.sound = data.sound
        settings.fullscreen = data.fullscreen
        settings.language = data.language

    else:

        settings = Settings(
            username=data.username,
            theme=data.theme,
            sound=data.sound,
            fullscreen=data.fullscreen,
            language=data.language,
        )

        db.add(settings)

    db.commit()
    db.refresh(settings)

    return settings


def get_settings(db: Session, username: str):

    return db.query(Settings).filter(
        Settings.username == username
    ).first()