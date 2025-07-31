// src/components/DashboardLayout.jsx
import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  Shield,
  BarChart2,
  Users,
  Map,
  Calendar,
  Tag,
  CreditCard,
  Building2,
  Database,
  Settings,
  LogOut,
  CheckCircle,
  Factory,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../rtk/features/userSlice";
import { toast } from "react-hot-toast";

const navConfig = {
  admin: [
    { to: "", label: "Overview", icon: <BarChart2 /> },
    { to: "users", label: "Users", icon: <Users /> },
    { to: "trips", label: "Trips", icon: <Map /> },
    { to: "bookings", label: "Bookings", icon: <Calendar /> },
    { to: "categories", label: "Categories", icon: <Tag /> },
    { to: "payments", label: "Payments", icon: <CreditCard /> },
    { to: "companies", label: "companies", icon: <Factory /> },
    {
      to: "/company-dashboard",
      label: "Company Dashboard",
      icon: <Building2 />,
      external: true,
    },
    { to: "#", label: "System Logs", icon: <Database />, external: true },
    { to: "#", label: "System Settings", icon: <Settings />, external: true },
  ],
  company: [
    { to: "", label: "Overview", icon: <BarChart2 /> },
    { to: "trips", label: "My Trips", icon: <Map /> },
    { to: "bookings", label: "Bookings", icon: <Calendar /> },
    { to: "payments", label: "Earnings", icon: <CreditCard /> },
    { to: "analytics", label: "Analytics", icon: <BarChart2 /> },
    { to: "profile", label: "Profile", icon: <Settings /> },
  ],
};

export default function DashboardLayout({ role }) {
  const dispatch = useDispatch();
  const location = useLocation();
  const active = location.pathname.split("/").pop() || "";

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  const navItems = navConfig[role];

  return (
    <div className="min-h-screen bg-soft-sand flex">
      {/* Sidebar */}
      <div className="w-64 bg-natural-blue text-white hidden md:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/20 rounded-lg">
              <Shield className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xl font-bold">
                {role === "admin" ? "Admin Panel" : "Company Panel"}
              </span>
              <div className="text-xs opacity-75">
                {role === "admin"
                  ? "Super Administrator"
                  : "Company Administrator"}
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map(({ to, label, icon, external }) =>
              external ? (
                <a
                  key={label}
                  href={to}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10"
                >
                  {React.cloneElement(icon, { className: "w-5 h-5" })}
                  <span>{label}</span>
                </a>
              ) : (
                <Link
                  key={label}
                  to={to}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                    active === to ? "bg-white/20" : "hover:bg-white/10"
                  }`}
                >
                  {React.cloneElement(icon, { className: "w-5 h-5" })}
                  <span>{label}</span>
                </Link>
              )
            )}
          </nav>
        </div>

        <div className="border-t border-white/10 p-6 mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white/80 hover:bg-white/10"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-deep-charcoal">
              {role === "admin" ? "Admin Dashboard" : "Company Dashboard"}
            </h1>
            <p className="text-cool-gray mt-1">
              {role === "admin"
                ? "Complete system administration and analytics"
                : "Your business overview"}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-800 rounded-lg">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">System Healthy</span>
            </div>
            <button className="p-2 rounded-full hover:bg-gray-100">
              <Settings className="h-5 w-5 text-cool-gray" />
            </button>
            <div className="w-10 h-10 bg-natural-blue text-white rounded-full flex items-center justify-center font-bold">
              {role.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
