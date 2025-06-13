import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Map,
  Calendar,
  CreditCard,
  Settings,
  ChevronRight,
  BarChart2,
  TrendingUp,
  Package,
  Tag,
  Clock,
  Compass,
  LogOut
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../rtk/features/userSlice";
import { toast } from "react-hot-toast";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-soft-sand flex">
      {/* Sidebar */}
      <div className="w-64 bg-natural-blue text-white hidden md:block">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-2 bg-white/20 rounded-lg">
              <Compass className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold">Wanderlust</span>
          </div>
          
          <nav className="space-y-1">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                activeTab === "dashboard" ? "bg-white/20" : "hover:bg-white/10"
              }`}
            >
              <BarChart2 className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            
            <Link to="/admin/categories" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-white/10">
              <Tag className="w-5 h-5" />
              <span>Categories</span>
            </Link>
            
            <Link to="/admin/trips" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-white/10">
              <Map className="w-5 h-5" />
              <span>Trips</span>
            </Link>
            
            <Link to="/admin/bookings" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-white/10">
              <Calendar className="w-5 h-5" />
              <span>Bookings</span>
            </Link>
            
            <Link to="/admin/users" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-white/10">
              <Users className="w-5 h-5" />
              <span>Users</span>
            </Link>
            
            <Link to="/admin/payments" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors hover:bg-white/10">
              <CreditCard className="w-5 h-5" />
              <span>Payments</span>
            </Link>
          </nav>
        </div>
        
        <div className="border-t border-white/10 p-6 mt-auto">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-white/80 hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-deep-charcoal">Admin Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="h-5 w-5 text-cool-gray" />
              </button>
              <div className="w-8 h-8 bg-natural-blue text-white rounded-full flex items-center justify-center">
                A
              </div>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-natural-blue/10 rounded-lg">
                  <Users className="h-6 w-6 text-natural-blue" />
                </div>
                <span className="text-xs font-medium text-natural-blue bg-natural-blue/10 px-2 py-1 rounded-full">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-deep-charcoal">5,678</h3>
              <p className="text-cool-gray">Active Users</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-warm-orange/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-warm-orange" />
                </div>
                <span className="text-xs font-medium text-warm-orange bg-warm-orange/10 px-2 py-1 rounded-full">+24%</span>
              </div>
              <h3 className="text-2xl font-bold text-deep-charcoal">1,234</h3>
              <p className="text-cool-gray">Total Bookings</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-gentle-olive/10 rounded-lg">
                  <Package className="h-6 w-6 text-gentle-olive" />
                </div>
                <span className="text-xs font-medium text-gentle-olive bg-gentle-olive/10 px-2 py-1 rounded-full">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-deep-charcoal">24</h3>
              <p className="text-cool-gray">Active Trips</p>
            </div>
            
            <div className="bg-white rounded-xl shadow-soft p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-sea-blue/10 rounded-lg">
                  <CreditCard className="h-6 w-6 text-sea-blue" />
                </div>
                <span className="text-xs font-medium text-sea-blue bg-sea-blue/10 px-2 py-1 rounded-full">+18%</span>
              </div>
              <h3 className="text-2xl font-bold text-deep-charcoal">$123,456</h3>
              <p className="text-cool-gray">Total Revenue</p>
            </div>
          </div>

          {/* Quick Access */}
          <h2 className="text-xl font-semibold text-deep-charcoal mb-4">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Link to="/admin/categories" className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Tag className="h-8 w-8 text-natural-blue" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-deep-charcoal">
                      Categories
                    </h3>
                    <p className="text-sm text-cool-gray">Manage trip categories</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-cool-gray" />
              </div>
            </Link>

            <Link to="/admin/bookings" className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-warm-orange" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-deep-charcoal">
                      Bookings
                    </h3>
                    <p className="text-sm text-cool-gray">Manage reservations</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-cool-gray" />
              </div>
            </Link>

            <Link to="/admin/trips" className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-gentle-olive" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-deep-charcoal">
                      Trips
                    </h3>
                    <p className="text-sm text-cool-gray">Manage tours</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-cool-gray" />
              </div>
            </Link>

            <Link to="/admin/users" className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-sea-blue" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-deep-charcoal">
                      Users
                    </h3>
                    <p className="text-sm text-cool-gray">Manage accounts</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-cool-gray" />
              </div>
            </Link>

            <Link to="/admin/payments" className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-natural-blue" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-deep-charcoal">
                      Payments
                    </h3>
                    <p className="text-sm text-cool-gray">Transaction history</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-cool-gray" />
              </div>
            </Link>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-soft p-6">
            <h2 className="text-xl font-semibold text-deep-charcoal mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-natural-blue rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-deep-charcoal">
                    New booking: Pyramids & Nile Adventure
                  </p>
                  <p className="text-xs text-cool-gray">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-warm-orange rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-deep-charcoal">
                    User registration: john@example.com
                  </p>
                  <p className="text-xs text-cool-gray">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-gentle-olive rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-deep-charcoal">
                    Payment received: $1,299
                  </p>
                  <p className="text-xs text-cool-gray">1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-sea-blue rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-deep-charcoal">
                    New trip added: Desert Safari
                  </p>
                  <p className="text-xs text-cool-gray">3 hours ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-natural-blue rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-deep-charcoal">
                    Category updated: Adventure
                  </p>
                  <p className="text-xs text-cool-gray">5 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;