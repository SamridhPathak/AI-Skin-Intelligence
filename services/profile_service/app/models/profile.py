from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    DateTime,
    ForeignKey
)
from sqlalchemy.sql import func

from services.auth_service.app.db.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), unique=True)

    age = Column(Integer)

    gender = Column(String(20))

    skin_type = Column(String(50))

    skin_tone = Column(String(50))

    skin_concerns = Column(String(255))

    allergies = Column(String(255))

    goals = Column(String(255))

    water_intake = Column(Float)

    sleep_hours = Column(Float)

    exercise_frequency = Column(String(50))

    stress_level = Column(String(50))

    sun_exposure = Column(String(50))

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )