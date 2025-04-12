from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_db, add_expense, get_expenses


app = Flask(__name__)
CORS(app)

#Init db
init_db()

@app.route('/api/expenses', methods=['GET'])
def get_all_expenses():
    expenses = get_expenses()
    return jsonify(expenses)

@app.route('/api/expenses', methods=['POST'])
def add_new_expense():
    data = request.get_json()
    amount = data['amount']
    description = data['description']
    date = data['date']

    add_expense(amount, description, date)

    return jsonify({'message': 'Expense added successfully'}), 201

if __name__ == '__main__':
    app.run(debug=True)