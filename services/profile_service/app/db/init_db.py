from services.auth_service.app.db.database import Base, engine
from services.auth_service.app.models.user import User
# Import all models
from services.profile_service.app.models.profile import Profile


def init_db():
    Base.metadata.create_all(bind=engine)