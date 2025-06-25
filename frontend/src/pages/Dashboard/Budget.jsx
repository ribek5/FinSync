import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useUserAuth } from "../../hooks/useUserAuth";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";

const Budget = () => {
  useUserAuth();
  const [month, setMonth] = useState(() =>
    new Date().toISOString().slice(0, 7)
  ); // "YYYY-MM"
  const [budgetAmount, setBudgetAmount] = useState(0);
  const [expense, setExpense] = useState(0);
  const [remaining, setRemaining] = useState(0);
  const [inputAmount, setInputAmount] = useState("");

  // Fetch budget info
  const fetchBudget = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.BUDGET.GET_BUDGET(month));
      const data = res.data;
      setBudgetAmount(data.budget || 0);
      setExpense(data.expense || 0);
      setRemaining(data.remaining || 0);
    } catch (err) {
      console.error("Failed to fetch budget:", err);
      setBudgetAmount(0);
      setExpense(0);
      setRemaining(0);
    }
  };

  useEffect(() => {
    fetchBudget();
  }, [month]);

  // Submit new or updated budget
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(API_PATHS.BUDGET.SET_BUDGET, {
        month,
        amount: Number(inputAmount),
      });
      const data = res.data;
      if (data) {
        fetchBudget();
        setInputAmount("");
        toast.success("Budget updated successfully");
      }
    } catch (err) {
      console.error("Failed to set budget:", err);
    }
  };

  return (
    <DashboardLayout activeMenu="Budget">
      <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white font-sans">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Monthly Budget -{" "}
          {new Date(`${month}-01`).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
          })}
        </h2>

        {/* Budget Summary */}
        <div className="bg-blue-500 text-white p-6 rounded-xl relative mb-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="uppercase text-sm">budget</p>
              <h3 className="text-2xl font-bold">
                {remaining < 0 ? (
                  <h3 className="text-2xl font-bold">
                    Rs{Math.abs(remaining).toLocaleString()}{" "}
                    <span className="text-sm font-normal">
                      overspent of Rs{budgetAmount.toLocaleString()}
                    </span>
                  </h3>
                ) : (
                  <h3 className="text-2xl font-bold">
                    Rs{remaining.toLocaleString()}{" "}
                    <span className="text-sm font-normal">
                      left of Rs{budgetAmount.toLocaleString()}
                    </span>
                  </h3>
                )}
              </h3>
            </div>
            <div
              className="w-8 h-8 bg-blue-800 rounded-full flex items-center justify-center text-xs cursor-pointer"
              onClick={fetchBudget}
            >
              ↻
            </div>
          </div>

          <div className="w-full bg-gray-800 rounded-full h-3 mt-4 relative">
            <div
              className="bg-green-500 h-3 rounded-full"
              style={{
                width: `${
                  budgetAmount > 0 ? (expense / budgetAmount) * 100 : 0
                }%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-center mt-3 text-gray-200">
            You've spent <strong>Rs{expense}</strong> so far
          </p>
        </div>

        {/* Set/Update Budget */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700 text-sm font-medium">
            Set / Update Budget Amount (Rs)
          </label>
          <input
            type="number"
            value={inputAmount}
            onChange={(e) => setInputAmount(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new budget"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Save Budget
          </button>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default Budget;
