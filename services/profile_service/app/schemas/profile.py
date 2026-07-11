from pydantic import BaseModel


class ProfileCreate(BaseModel):
    age: int
    gender: str
    skin_type: str
    skin_tone: str
    skin_concerns: str
    allergies: str
    goals: str

    water_intake: float
    sleep_hours: float

    exercise_frequency: str
    stress_level: str
    sun_exposure: str