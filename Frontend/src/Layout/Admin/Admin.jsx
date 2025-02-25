import React from "react";

import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FaAd,
  FaBook,
  FaCalendar,
  FaEnvelope,
  FaHome,
  FaList,
  FaSearch,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { MdManageAccounts } from "react-icons/md";
import { IoPersonAdd } from "react-icons/io5";
import { AiOutlineNotification } from "react-icons/ai";
import { GiInterstellarPath } from "react-icons/gi";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow p-4 rounded-md">
        <h1 className="text-2xl font-bold text-gray-700">Admin Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Logout
        </button>
      </header>

      {/* Dashboard Content */}
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-gray-300">
          <ul className="menu p-4">
            {
              <>
                <li>
                  <NavLink to="/admin-rdf">
                    <FaHome></FaHome>
                    Admin Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin-rdf/slider-info">
                    <FaList></FaList>
                    Slider Info
                  </NavLink>
                </li>
              </>
            }
          </ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 p-8">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Admin;
