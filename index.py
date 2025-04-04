from flask import Flask, jsonify, request
import psycopg2  # Add PostgreSQL database library

from model.transaction import TransactionSchema

app = Flask(__name__)

transactions = []

# Configure PostgreSQL database connection
connection = psycopg2.connect(
    dbname="postgres",
    user="postgres",
    password="tiger",
    host="localhost",
    port="5432"
)

@app.route('/post-transaction', methods=['POST'])
def post_transaction():
    data = TransactionSchema().load(request.json)
    transactions.append(data)

    # Insert transaction into PostgreSQL database
    with connection.cursor() as cursor:
        cursor.execute("""
            INSERT INTO transaction (amount, user_id, transaction_type, created)
            VALUES ( %s, %s, %s, %s)
        """, (data.amount, data.user, data.transactionType, data.created))
        connection.commit()

    return jsonify("Transaction added successfully"), 201

@app.route('/get-transactions', methods=['GET'])
def get_transactions():
    # Fetch transactions from PostgreSQL database
    with connection.cursor() as cursor:
        cursor.execute("SELECT id, amount, user_id, transaction_type, created FROM transaction")
        rows = cursor.fetchall()
        transactions = [
            {
                "id": row[0],
                "amount": row[1],
                "user": row[2],
                "transactionType": row[3],
                "created": row[4].isoformat()  # Convert datetime to string
            }
            for row in rows
        ]

    return jsonify(transactions), 200


if __name__ == '__main__':
    app.run()