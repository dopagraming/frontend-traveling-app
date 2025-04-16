import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Map,
  Calendar,
  CreditCard,
  Settings,
  ChevronRight,
} from "lucide-react";

const AdminDashboard = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex">
      {/* Dashboard Content */}
      <div className="w-full lg:w-1/2 p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Admin Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/admin/bookings" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-8 w-8 text-emerald-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Bookings
                    </h3>
                    <p className="text-sm text-gray-500">Manage reservations</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>

          <Link to="/admin/trips" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-emerald-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Trips
                    </h3>
                    <p className="text-sm text-gray-500">Manage tours</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>

          <Link to="/admin/users" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-8 w-8 text-emerald-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Users
                    </h3>
                    <p className="text-sm text-gray-500">Manage accounts</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>

          <Link to="/admin/payments" className="block">
            <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CreditCard className="h-8 w-8 text-emerald-600" />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Payments
                    </h3>
                    <p className="text-sm text-gray-500">Transaction history</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Stats and Activity */}
      <div className="hidden lg:block w-1/2 bg-gray-50 p-8">
        <div className="max-w-lg mx-auto space-y-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">5,678</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">$123,456</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-500">Active Trips</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Recent Activity
            </h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-900">
                    New booking: Pyramids & Nile Adventure
                  </p>
                  <p className="text-xs text-gray-500">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-900">
                    User registration: john@example.com
                  </p>
                  <p className="text-xs text-gray-500">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="h-2 w-2 bg-emerald-400 rounded-full mr-3"></div>
                <div>
                  <p className="text-sm text-gray-900">
                    Payment received: $1,299
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
