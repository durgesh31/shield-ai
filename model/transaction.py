from datetime import datetime  # Fixed import

from marshmallow import fields, Schema, post_load

class Transaction(object):
    def __init__(self, id, transactionAmount, customerId, merchantId, 
            transactionType, transactionMode, currency, ipAddress, locationId, 
            terminalId, vpnUsed, mcc, created=None, status=None, message=None):
        self.id = id
        self.transactionAmount = transactionAmount
        self.customerId = customerId
        self.merchantId = merchantId
        self.transactionMode = transactionMode
        self.transactionType = transactionType
        self.created = created or datetime.now()  # Ensure created is a datetime object
        self.currency = currency
        self.ipAddress = ipAddress
        self.locationId = locationId
        self.terminalId = terminalId
        self.vpnUsed = vpnUsed
        self.mcc = mcc

    def __repr__(self):
        return '<Transaction(name={self.id!r})>'.format(self=self)

    def to_dict(self):
        """Convert the Transaction object to a dictionary."""
        return TransactionSchema().dump(self)

class TransactionSchema(Schema):
    id = fields.Integer()
    transactionAmount = fields.Float()  # Changed from Decimal to Float
    transactionType = fields.Str()
    user = fields.Str()
    created = fields.DateTime()  # Ensure proper serialization/deserialization
    status = fields.Str()
    message = fields.Str()
    customerId = fields.Integer()
    merchantId = fields.Integer()
    transactionMode = fields.Str()
    currency = fields.Str()
    ipAddress = fields.Str()
    locationId = fields.Integer()
    terminalId = fields.Integer()
    mcc = fields.Str()
    vpnUsed = fields.Boolean()

    @post_load
    def make_transaction(self, data, **kwargs):
        return Transaction(**data)