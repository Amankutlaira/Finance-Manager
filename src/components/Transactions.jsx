import { useEffect, useState } from "react";

import axios from "axios";

export const Transactions = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(
          "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/income.json"
        );
        const expenseResponse = await axios.get(
          "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/expenses.json"
        );

        setIncomeList(incomeResponse ? Object.values(incomeResponse.data) : []);
        setExpenseList(
          expenseResponse ? Object.values(expenseResponse.data) : []
        );
      } catch (error) {
        console.error("Error Fetching Data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const allTransactions = [
      ...incomeList.map((item) => ({ ...item, type: "income" })),
      ...expenseList.map((item) => ({ ...item, type: "expenses" })),
    ];
    if (filterType !== "all") {
      setTransaction(
        allTransactions.filter((transaction) => transaction.type === filterType)
      );
    } else {
      setTransaction(allTransactions);
    }
  }, [incomeList, expenseList, filterType]);

  useEffect(() => {
    const sortedTransaction = [...transaction].sort((a, b) => {
      if (sortBy == "amount") {
        return parseFloat(a.amount) - parseFloat(b.amount);
      } else if (sortBy === "date") {
        return new Date(a.date) - new Date(b.date);
      } else {
        return 0;
      }
    });
    setTransaction(sortedTransaction);
  }, [transaction, sortBy]);

  const handleDeleteTransaction = async (id, type) => {
    try {
      await axios.delete(
        `https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/${type}/${id}.json`
      );

      const incomeResponse = await axios.get(
        "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/income.json"
      );
      const expenseResponse = await axios.get(
        "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/expenses.json"
      );

      setIncomeList(incomeResponse ? Object.values(incomeResponse.data) : []);
      setExpenseList(
        expenseResponse ? Object.values(expenseResponse.data) : []
      );
    } catch (error) {
      console.error("Error Deleting Data", error);
    }
  };

  return (
    <div>
      <h1>Transactions</h1>
      <div>
        <label>Filter By Type:</label>
        <select
          onChange={(e) => setFilterType(e.target.value)}
          value={filterType}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expenses">Expenses</option>
        </select>
      </div>
      <div>
        <label>Sort by:</label>
        <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
          <option value="date">Date</option>
          <option value="amount">Amount</option>
        </select>
      </div>
      <ul>
        {transaction.map((transaction, index) => (
          <li key={index}>
            {transaction.type === "income" ? (
              <span>Income:</span>
            ) : (
              <span>Expense:</span>
            )}
            {transaction.description} - ${transaction.amount} on{" "}
            {transaction.date}
            <button
              onClick={() =>
                handleDeleteTransaction(transaction.id, transaction.type)
              }
            >
              DELETE
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
