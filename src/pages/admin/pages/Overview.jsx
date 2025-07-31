import {
  Activity,
  AlertTriangle,
  Building2,
  Calendar,
  CheckCircle,
  ChevronRight,
  CreditCard,
  Shield,
  Tag,
  Users,
  Map,
  DollarSign,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import useGetItems from "../../../hooks/useGetProducts";

export default function Overview() {
  const { data: users = [] } = useGetItems("users");
  const { data: trips = [] } = useGetItems("trips");
  const { data: bookings = [] } = useGetItems("bookings");
  const { data: categories = [] } = useGetItems("categories");
  const totalRevenue = bookings.reduce(
    (sum, booking) => sum + (booking.totalPaid || 0),
    0
  );
  const activeUsers = users.filter((user) => user.isActive !== false).length;
  const pendingBookings = bookings.filter(
    (booking) => !booking.isConfirmed
  ).length;
  const averageRating =
    trips.length > 0
      ? (
          trips.reduce((sum, trip) => sum + (trip.ratingsAverage || 0), 0) /
          trips.length
        ).toFixed(1)
      : "0.0";

  // Recent activities (mock data - would come from activity logs in real app)
  const recentActivities = [
    {
      id: 1,
      type: "booking",
      message: "New booking for Pyramids Adventure",
      user: "John Doe",
      time: "2 minutes ago",
      status: "success",
    },
    {
      id: 2,
      type: "user",
      message: "New user registration",
      user: "Sarah Johnson",
      time: "15 minutes ago",
      status: "info",
    },
    {
      id: 3,
      type: "trip",
      message: "Trip updated: Desert Safari",
      user: "Admin",
      time: "1 hour ago",
      status: "warning",
    },
    {
      id: 4,
      type: "payment",
      message: "Payment received: $1,299",
      user: "Michael Chen",
      time: "2 hours ago",
      status: "success",
    },
    {
      id: 5,
      type: "error",
      message: "Failed payment attempt",
      user: "Emma Rodriguez",
      time: "3 hours ago",
      status: "error",
    },
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case "booking":
        return <Calendar className="w-4 h-4" />;
      case "user":
        return <Users className="w-4 h-4" />;
      case "trip":
        return <Map className="w-4 h-4" />;
      case "payment":
        return <CreditCard className="w-4 h-4" />;
      case "error":
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case "success":
        return "text-green-600 bg-green-100";
      case "warning":
        return "text-yellow-600 bg-yellow-100";
      case "error":
        return "text-red-600 bg-red-100";
      case "info":
        return "text-blue-600 bg-blue-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-natural-blue/10 rounded-lg">
              <Users className="h-6 w-6 text-natural-blue" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +{Math.round((activeUsers / users.length) * 100) || 0}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-deep-charcoal">
            {activeUsers}
          </h3>
          <p className="text-cool-gray">Active Users</p>
          <div className="text-xs text-cool-gray mt-1">
            Total: {users.length}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-warm-orange/10 rounded-lg">
              <Map className="h-6 w-6 text-warm-orange" />
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
              {trips.length} Live
            </span>
          </div>
          <h3 className="text-2xl font-bold text-deep-charcoal">
            {trips.length}
          </h3>
          <p className="text-cool-gray">Total Trips</p>
          <div className="text-xs text-cool-gray mt-1">
            Avg Rating: {averageRating}⭐
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gentle-olive/10 rounded-lg">
              <Calendar className="h-6 w-6 text-gentle-olive" />
            </div>
            <span className="text-xs font-medium text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">
              {pendingBookings} Pending
            </span>
          </div>
          <h3 className="text-2xl font-bold text-deep-charcoal">
            {bookings.length}
          </h3>
          <p className="text-cool-gray">Total Bookings</p>
          <div className="text-xs text-cool-gray mt-1">
            This month:{" "}
            {
              bookings.filter(
                (b) =>
                  new Date(b.createdAt) >
                  new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              ).length
            }
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
              +18%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-deep-charcoal">
            ${totalRevenue.toLocaleString()}
          </h3>
          <p className="text-cool-gray">Total Revenue</p>
          <div className="text-xs text-cool-gray mt-1">
            This month: ${Math.round(totalRevenue * 0.3).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Link
          to="users"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-natural-blue/10 rounded-lg">
                <Users className="h-8 w-8 text-natural-blue" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-deep-charcoal">
                  User Management
                </h3>
                <p className="text-sm text-cool-gray">
                  Manage all user accounts
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-gray" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-green-600">✓ {activeUsers} Active</span>
            <span className="text-cool-gray">• {users.length} Total</span>
          </div>
        </Link>

        <Link
          to="trips"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-warm-orange/10 rounded-lg">
                <Map className="h-8 w-8 text-warm-orange" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-deep-charcoal">
                  Trips Management
                </h3>
                <p className="text-sm text-cool-gray">
                  Manage all travel packages
                </p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-gray" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-blue-600">📍 {trips.length} Trips</span>
            <span className="text-cool-gray">
              • {categories.length} Categories
            </span>
          </div>
        </Link>

        <Link
          to="bookings"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-gentle-olive/10 rounded-lg">
                <Calendar className="h-8 w-8 text-gentle-olive" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-deep-charcoal">
                  Booking Management
                </h3>
                <p className="text-sm text-cool-gray">Handle reservations</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-gray" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-yellow-600">
              ⏳ {pendingBookings} Pending
            </span>
            <span className="text-cool-gray">• {bookings.length} Total</span>
          </div>
        </Link>

        <Link
          to="payments"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-deep-charcoal">
                  Payment Management
                </h3>
                <p className="text-sm text-cool-gray">Financial transactions</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-gray" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-green-600">
              💰 ${totalRevenue.toLocaleString()}
            </span>
            <span className="text-cool-gray">• Revenue</span>
          </div>
        </Link>

        <Link
          to="/admin-dashboard/categories"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-purple-500/10 rounded-lg">
                <Tag className="h-8 w-8 text-purple-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-deep-charcoal">
                  Categories
                </h3>
                <p className="text-sm text-cool-gray">Organize trip types</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-gray" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-purple-600">
              🏷️ {categories.length} Categories
            </span>
          </div>
        </Link>

        <Link
          to="/company-dashboard"
          className="bg-white rounded-xl shadow-soft p-6 hover:shadow-blue transition-all duration-300 transform hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-3 bg-indigo-500/10 rounded-lg">
                <Building2 className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-deep-charcoal">
                  Company Dashboard
                </h3>
                <p className="text-sm text-cool-gray">Business analytics</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-cool-gray" />
          </div>
          <div className="mt-4 flex items-center gap-4 text-sm">
            <span className="text-indigo-600">📊 Analytics</span>
          </div>
        </Link>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-xl font-semibold text-deep-charcoal mb-6">
            Revenue Overview
          </h3>
          <div className="h-64 flex items-end justify-between gap-2">
            {[65, 45, 78, 52, 89, 67, 94, 73, 85, 91, 76, 88].map(
              (height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-natural-blue rounded-t-lg transition-all duration-500 hover:bg-natural-blue-dark"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-cool-gray mt-2">
                    {
                      [
                        "Jan",
                        "Feb",
                        "Mar",
                        "Apr",
                        "May",
                        "Jun",
                        "Jul",
                        "Aug",
                        "Sep",
                        "Oct",
                        "Nov",
                        "Dec",
                      ][index]
                    }
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Top Destinations */}
        <div className="bg-white rounded-xl shadow-soft p-6">
          <h3 className="text-xl font-semibold text-deep-charcoal mb-6">
            Top Destinations
          </h3>
          <div className="space-y-4">
            {trips.slice(0, 5).map((trip, index) => (
              <div key={trip._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-natural-blue/10 rounded-full flex items-center justify-center text-sm font-bold text-natural-blue">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium text-deep-charcoal">
                      {trip.destination}
                    </div>
                    <div className="text-sm text-cool-gray">{trip.title}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-natural-blue">
                    ${trip.price}
                  </div>
                  <div className="text-xs text-cool-gray">
                    ⭐ {trip.ratingsAverage || "4.5"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-soft p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-deep-charcoal">
            Recent System Activity
          </h3>
          <button className="text-sm text-natural-blue hover:text-natural-blue-dark">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {recentActivities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <div
                className={`p-2 rounded-full ${getActivityColor(
                  activity.status
                )}`}
              >
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-deep-charcoal">
                    {activity.message}
                  </p>
                  <span className="text-xs text-cool-gray">
                    {activity.time}
                  </span>
                </div>
                <p className="text-xs text-cool-gray mt-1">
                  by {activity.user}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <h4 className="font-semibold text-deep-charcoal">
              Database Status
            </h4>
          </div>
          <p className="text-sm text-cool-gray">All systems operational</p>
          <div className="mt-2 text-xs text-green-600">✓ Connected</div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-deep-charcoal">
              API Performance
            </h4>
          </div>
          <p className="text-sm text-cool-gray">Response time: 120ms</p>
          <div className="mt-2 text-xs text-blue-600">✓ Excellent</div>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h4 className="font-semibold text-deep-charcoal">
              Security Status
            </h4>
          </div>
          <p className="text-sm text-cool-gray">All security checks passed</p>
          <div className="mt-2 text-xs text-purple-600">✓ Secure</div>
        </div>
      </div>
    </div>
  );
}
