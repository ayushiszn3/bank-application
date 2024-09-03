from flask import Blueprint, request, jsonify
from .models import User, Transaction
from .schemas import UserSchema, TransactionSchema
from . import db

bp = Blueprint('api', __name__)

@bp.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    new_user = User(name=data['name'], email=data['email'], balance=data['balance'])
    db.session.add(new_user)
    db.session.commit()
    return UserSchema().jsonify(new_user)

@bp.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = User.query.get_or_404(id)
    return UserSchema().jsonify(user)

@bp.route('/users/<int:id>', methods=['PUT'])
def update_user(id):
    data = request.get_json()
    user = User.query.get_or_404(id)
    user.name = data.get('name', user.name)
    user.email = data.get('email', user.email)
    user.balance = data.get('balance', user.balance)
    db.session.commit()
    return UserSchema().jsonify(user)

@bp.route('/users/<int:id>', methods=['DELETE'])
def delete_user(id):
    user = User.query.get_or_404(id)
    db.session.delete(user)
    db.session.commit()
    return '', 204

@bp.route('/transactions', methods=['POST'])
def create_transaction():
    data = request.get_json()
    new_transaction = Transaction(
        amount=data['amount'],
        type=data['type'],
        description=data['description'],
        user_id=data['user_id']
    )
    db.session.add(new_transaction)
    db.session.commit()
    return TransactionSchema().jsonify(new_transaction)

@bp.route('/transactions/<int:user_id>', methods=['GET'])
def get_transactions(user_id):
    transactions = Transaction.query.filter_by(user_id=user_id).all()
    return TransactionSchema(many=True).jsonify(transactions)