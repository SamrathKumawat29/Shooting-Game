from pydantic import BaseModel


class SettingsCreate(BaseModel):
    username: str
    theme: str
    sound: bool
    fullscreen: bool
    language: str


class SettingsResponse(SettingsCreate):
    id: int

    class Config:
        from_attributes = True