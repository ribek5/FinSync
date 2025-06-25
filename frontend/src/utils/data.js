import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
  LuCircleDivide,
} from "react-icons/lu";
import { FaChartPie } from "react-icons/fa6";
import { SlCalender } from "react-icons/sl";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    label: "Dashboard",
    icon: LuLayoutDashboard,
    path: "/dashboard",
  },
  {
    id: "02",
    label: "Income",
    icon: LuWalletMinimal,
    path: "/income",
  },
  {
    id: "03",
    label: "Expense",
    icon: LuHandCoins,
    path: "/expense",
  },
  {
    id: "04",
    label: "Budget",
    icon: FaChartPie,
    path: "/budget",
  },
  {
    id: "05",
    label: "Reminder",
    icon: SlCalender,
    path: "/reminder",
  },
  {
    id: "06",
    label: "Logout",
    icon: LuLogOut,
    path: "logout",
  },
];
