import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import toast from "react-hot-toast";
import { API_PATHS } from "../../utils/apiPaths";

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const fetchReminders = async () => {
    try {
      const res = await axiosInstance.get(`${API_PATHS.REMINDER.GET_REMINDER}`);
      setReminders(res.data);
    } catch (err) {
      console.error("Error fetching reminders:", err);
    }
  };

  const handleAddReminder = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`${API_PATHS.REMINDER.ADD_REMINDER}`, {
        title,
        date,
      });
      toast.success("Reminder added successfully");
      setTitle("");
      setDate("");
      fetchReminders();
    } catch (err) {
      console.error("Error adding reminder:", err);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <DashboardLayout activeMenu="Reminder">
      <div className="max-w-xl mx-auto mt-10 p-6 rounded-2xl shadow-xl bg-white font-sans">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reminders</h2>

        <form onSubmit={handleAddReminder} className="space-y-4 mb-6">
          <input
            type="text"
            placeholder="Reminder Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
          >
            Add Reminder
          </button>
        </form>

        <ul className="space-y-3">
          {reminders.map((reminder) => (
            <li
              key={reminder._id}
              className="p-4 bg-gray-100 rounded-md shadow"
            >
              <h3 className="font-medium text-gray-800">{reminder.title}</h3>
              <p className="text-sm text-gray-600">
                {new Date(reminder.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </DashboardLayout>
  );
};

export default Reminder;
