from datetime import datetime  # Fixed import

from marshmallow import fields, Schema, post_load

class Transaction(object):
    def __init__(self, id, amount, user, transactionType):
        self.id = id
        self.amount = amount
        self.user = user
        self.transactionType = transactionType
        self.created = datetime.datetime.now()

    def __repr__(self):
        return '<Transaction(name={self.id!r})>'.format(self=self)

class TransactionSchema(Schema):
    id = fields.Integer()
    amount = fields.Decimal()
    created = fields.Date()
    transactionType = fields.Str()
    user = fields.Str()

    @post_load
    def make_transaction(self, data, **kwargs):
        return Transaction(**data) 