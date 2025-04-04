from datetime import datetime  # Fixed import

from marshmallow import fields, Schema, post_load

class Transaction(object):
    def __init__(self, id, amount, user, transactionType, created=None):
        self.id = id
        self.amount = amount
        self.user = user
        self.transactionType = transactionType
        self.created = created or datetime.now()  # Ensure created is a datetime object

    def __repr__(self):
        return '<Transaction(name={self.id!r})>'.format(self=self)

    def to_dict(self):
        """Convert the Transaction object to a dictionary."""
        return TransactionSchema().dump(self)

class TransactionSchema(Schema):
    id = fields.Integer()
    amount = fields.Float()  # Changed from Decimal to Float
    transactionType = fields.Str()
    user = fields.Str()
    created = fields.DateTime()  # Ensure proper serialization/deserialization

    @post_load
    def make_transaction(self, data, **kwargs):
        return Transaction(**data)