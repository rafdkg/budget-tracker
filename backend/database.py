import sqlite3

def init_db():
    connection = sqlite3.connect('expenses.db')
    cursor = connection.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount REAL,
            description TEXT,
            date TEXT
        )               
    ''')

    connection.commit()
    connection.close()


def add_expense(amount, description, date):
    connection = sqlite3.connect('expenses.db')
    cursor = connection.cursor()

    cursor.execute('''
        INSERT INTO expenses (amount, description, date)
        VALUES (?, ?, ?)
    ''', (amount, description, date))

    connection.commit()
    connection.close()

def get_expenses():
    connection = sqlite3.connect('expenses.db')
    connection.row_factory = sqlite3.Row
    cursor = connection.cursor()

    cursor.execute('SELECT * FROM expenses')
    expenses = cursor.fetchall()

    print(expenses)
    
    connection.close()
    return [dict(row) for row in expenses]
