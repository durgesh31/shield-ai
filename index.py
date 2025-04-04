from flask import Flask, jsonify, request

from model.transaction import TransactionSchema

app = Flask(__name__)

transactions = []

@app.route('/post-transaction', methods=['POST'])
def post_transaction():
    data = TransactionSchema().load(request.json)
    transactions.append(data)
    return jsonify("Transaction added successfully"), 201

@app.route('/get-transactions', methods=['GET'])
def get_transactions():
   return jsonify(TransactionSchema(many=True).dump(transactions)), 200


if __name__ == '__main__':
    app.run()