import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export const Income = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    data: "",
  });

  const fetchIncome = async () => {
    try {
      const response = await axios.get(
        "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/income.json"
      );

      setIncomeList(response.data ? Object.values(response.data) : []);
    } catch (error) {
      console.error("Error Fetching Incoming Data", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://finance-manager-278e5-default-rtdb.asia-southeast1.firebasedatabase.app/Users/income.json",
        formData
      );

      setFormData({ amount: "", description: "", date: "" });
      fetchIncome();
    } catch (error) {
      console.error("Error Fetching Incoming Data", error);
    }
  };

  useEffect(() => {
    fetchIncome();
  }, []);

  return (
    <>
      <div>
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
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            required
          />
          <input
            type="date"
            placeholder="Date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
          <button type="submit">Add Income</button>
        </form>
        <h2>Income List</h2>
        <ul>
          {incomeList.map((income, index) => (
            <li key={index}>
              {income.description} - ${income.amount} on {income.date}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
