from . import ma
from .models import User, Transaction

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class TransactionSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Transaction