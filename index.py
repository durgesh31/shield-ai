from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2  # Add PostgreSQL database library

from model.transaction import TransactionSchema

app = Flask(__name__)
CORS(app)

transactions = []

# Function to get a new PostgreSQL database connection
def get_db_connection():
    return psycopg2.connect(
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
    with get_db_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO transaction (customer_id, merchant_id, transaction_amount, transaction_type, mcc, 
                 currency, transaction_mode, ip_address, location_id, terminal_id, vpn_used, created, status)
                VALUES ( %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (data.customerId, data.merchantId, data.transactionAmount, data.transactionType, data.mcc,
                  data.currency, data.transactionMode, data.ipAddress, data.locationId, data.terminalId,
                  data.vpnUsed, data.created, 'TO_BE_EVALUATED'))
            connection.commit()

    return jsonify("Transaction added successfully"), 201

@app.route('/get-transactions', methods=['GET'])
def get_transactions():
    # Fetch transactions from PostgreSQL database
    with get_db_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("SELECT id, customer_id, merchant_id, transaction_amount, transaction_type, mcc, currency, transaction_mode, ip_address, location_id, terminal_id, vpn_used, created, status, message FROM transaction")
            rows = cursor.fetchall()
            transactions = [
                {
                    "id": row[0],
                    "customerId": row[1],
                    "merchantId": row[2],
                    "transactionAmount": row[3],
                    "transactionType": row[4],
                    "mcc": row[5],
                    "currency": row[6],
                    "transactionMode": row[7],
                    "ipAddress": row[8],
                    "locationId": row[9],
                    "terminalId": row[10],
                    "vpnUsed": row[11],
                    "created": row[12].isoformat(),   # Convert datetime to string
                    "status": row[13],
                    "message": row[14]
                }
                for row in rows
            ]

    return jsonify(transactions), 200


if __name__ == '__main__':
    app.run()