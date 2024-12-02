
-- Finance Manager Web Application --
A financial management tool built with React, Firebase, and Axios. 
The app helps users track income, expenses, and savings.

Core Functionalities

1. Home Route (/)
Financial Summary: Shows the total income, expenses, and savings.
Quick Links: Provides navigation buttons to other routes (/income, /expenses, /transactions, /savings).

2. Income Route (/income)

Add Income: Users can input income details (amount, description, date).
Income List: Displays a list of all income entries, with real-time updates.
Firebase Integration: Income entries are stored in Firebase and persist across sessions.

3. Expenses Route (/expenses)

Add Expense: Users can input expense details (amount, description, category, date).
Expense List: Displays a list of all expenses, updated in real time.
Firebase Integration: Expense entries are stored in Firebase.

4. Transactions Route (/transactions)

Unified Transaction List: Combines both income and expense entries into one list.
Sorting & Filtering: Allows sorting by type (Income/Expense), amount, and date. Also supports filtering by transaction type, category, and date range.
Delete Transactions: Users can delete any transaction, and real-time updates will reflect across the app.

5. Savings Route (/savings)
Savings Calculation: Displays current savings, total income, and total expenses.

-- Technologies Used

React
Firebase
Axios
React Router:
HTML/CSS: 
JavaScript
