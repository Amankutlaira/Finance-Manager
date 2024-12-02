import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const Home = () => {
  const [income, setIncome] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [savingsGoal, setSavingsGoal] = useState(5000);
  const [analytics, setAnalytics] = useState({
    mostFrequentCategory: "",
    mostExpensiveCategory: "",
    averageIncome: 0,
    averageExpenses: 0,
  });

  return (
    <div>
      <h2>Quick Links</h2>
      <nav style={{ display: "flex", gap: "20px" }}>
        <Link to="/income">Income</Link>
        <Link to="/expenses">Expenses</Link>
        <Link to="/transaction">Transactions</Link>
        <Link to="/savings">Savings</Link>
      </nav>
    </div>
  );
};
