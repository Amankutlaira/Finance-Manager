import { useEffect, useState } from "react";
import axios from "axios";

export const Expenses = () => {
  const [expensesList, setExpenseList] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    category: "",
    date: "",
  });

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(
        "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/expenses.json"
      );

      setExpenseList(response.data ? Object.values(response.data) : []);
    } catch (error) {
      console.error("Error Fetching Expenses Data", error);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/expenses.json",
        formData
      );

      setFormData({ amount: "", description: "", category: "", date: "" });
      fetchExpenses();
    } catch (error) {
      console.error("Error adding Expenses Data", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);
  return (
    <>
      <div>
        <h1>Expenses</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={(e) =>
              setFormData({ ...formData, amount: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="category"
            value={formData.category}
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value })
            }
            required
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <button type="submit">Add Expenses</button>
        </form>
        <h2>Expenses List</h2>
        <ul>
          {expensesList.map((expense, index) => (
            <li key={index}>
              {expense.category}: {expense.description} - ${expense.amount} on{" "}
              {expense.date}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
