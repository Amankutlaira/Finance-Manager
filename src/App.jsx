import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Home } from "./components/Home";
import { Income } from "./components/Income";
import { Expenses } from "./components/Expenses";
import { Transactions } from "./components/Transactions";
import { Savings } from "./components/Savings";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/income" element={<Income />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/transaction" element={<Transactions />} />
        <Route path="/savings" element={<Savings />} />
      </Routes>
    </>
  );
}

export default App;
