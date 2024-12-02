import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [savingsGoal, setSavingGoal] = useState(0);
  const [currentSavings, setCurrentSavings] = useState(0);

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

  useEffect(() => fetchData(), []);

  return (
    <AppContext.Provider
      value={{
        incomeList,
        expenseList,
        savingsGoal,
        currentSavings,
        setSavingGoal,
        setCurrentSavings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
