import React, { useState, useEffect, useRef } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import logo from "/horizontal.png";
import SideMenu from "./SideMenu";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosInstance";
import { FaBell } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [reminders, setReminders] = useState([]);
  const dropdownRef = useRef();

  const fetchTodayReminders = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.REMINDER.GET_TODAY);
      setReminders(res.data);
    } catch (err) {
      console.error("Failed to fetch today's reminders:", err);
    }
  };

  useEffect(() => {
    fetchTodayReminders();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex items-center justify-between bg-white border border-b border-gray-200/50 backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
      <div className="flex items-center gap-4">
        <button
          className="block lg:hidden text-black"
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className="text-2xl" />
          ) : (
            <HiOutlineMenu className="text-2xl" />
          )}
        </button>

        <Link to="/" className="cursor-pointer">
          <img src={logo} alt="FinSync Logo" className="h-18" />
        </Link>
      </div>

      {/* Notification Bell */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative focus:outline-none"
        >
          <FaBell className="w-6 h-6 text-gray-800" />
          {reminders.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {reminders.length}
            </span>
          )}
        </button>

        {showNotifications && (
          <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl rounded-lg p-4 z-40">
            <h3 className="font-semibold text-blue-600 mb-2">
              Today's Reminders
            </h3>
            {reminders.length === 0 ? (
              <p className="text-gray-500 text-sm">No reminders for today.</p>
            ) : (
              <ul className="space-y-2">
                {reminders.map((reminder) => (
                  <li
                    key={reminder._id}
                    className="text-sm text-gray-700 border-b pb-1"
                  >
                    <strong>{reminder.title}</strong>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white z-20">
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  );
};

export default Navbar;
