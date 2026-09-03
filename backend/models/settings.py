from sqlalchemy import Column, Integer, String, Boolean

from database.database import Base


class Settings(Base):

    __tablename__ = "settings"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String, nullable=False)

    theme = Column(String, default="light")

    sound = Column(Boolean, default=True)

    fullscreen = Column(Boolean, default=False)

    language = Column(String, default="English")