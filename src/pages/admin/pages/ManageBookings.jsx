import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  ChevronLeft,
  Eye,
  Trash2,
  Check,
  X,
  Calendar,
  User,
  CreditCard,
  Edit,
} from "lucide-react";
import useGetItmes from "../../../hooks/useGetProducts";
import DeleteConfirmationModal from "../models/DeleteConfirmationModal";
import AddBookingModel from "../models/AddBookingModel";
import useModalState from "../../../hooks/useModalState";
import { format } from "date-fns";

export default function ManageBookings() {
  const {
    isOpen,
    selectedItem,
    isEditMode,
    isDeleteModalOpen,
    onClose,
    handleEdit,
    handleDelete,
    handleAdd,
  } = useModalState();

  const { data, isLoading, error, refetch } = useGetItmes("bookings");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = data?.filter(
    (booking) =>
      booking.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.tripName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">Loading bookings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="text-red-600 text-center">
            <p className="text-xl font-bold">Error</p>
            <p>{error.message}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-soft-sand">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="p-2 bg-white rounded-lg shadow-soft hover:shadow-blue transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-natural-blue" />
            </Link>
            <h1 className="text-2xl font-bold text-deep-charcoal">
              Manage Bookings
            </h1>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors shadow-soft"
          >
            <Calendar className="h-5 w-5" />
            <span>Add Booking</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray h-5 w-5" />
              <input
                type="text"
                placeholder="Search bookings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
              />
            </div>

            <div className="flex gap-2">
              <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                <option value="">All Statuses</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Trip
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Customer
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Spots
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Payment
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-cool-gray uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings?.map((booking) => (
                  <tr key={booking._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-deep-charcoal">
                        {booking.tripName || "Unknown Trip"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-natural-blue text-white rounded-full flex items-center justify-center">
                          {booking.userName?.charAt(0).toUpperCase() || "U"}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-deep-charcoal">
                            {booking.userName}
                          </div>
                          <div className="text-xs text-cool-gray">
                            {booking.userEmail}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-cool-gray">
                        {booking.createdAt
                          ? format(new Date(booking.createdAt), "MMM d, yyyy")
                          : "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-cool-gray">
                        {booking.sitesBooked || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-natural-blue">
                        ${booking.totalPaid || 0}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          booking.isConfirmed
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {booking.isConfirmed ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${
                          booking.paymentMethod === "credit_card"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-purple-100 text-purple-800"
                        }`}
                      >
                        {booking.paymentMethod === "credit_card"
                          ? "Credit Card"
                          : "USDT"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(booking)}
                          className="p-1 text-natural-blue hover:bg-natural-blue/10 rounded"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(booking)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cool-gray">No bookings found</p>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        refetch={refetch}
        message="Are you sure you want to delete this booking? This action cannot be undone."
        model={"bookings"}
        doc={selectedItem}
      />

      <AddBookingModel
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        isEditMode={isEditMode}
        product={selectedItem}
      />
    </div>
  );
}
