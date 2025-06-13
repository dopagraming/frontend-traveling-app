import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search, ChevronLeft, Edit, Trash2, Star, MapPin, Calendar, DollarSign } from "lucide-react";
import useGetItmes from "../../../hooks/useGetProducts";
import AddTripModel from "../models/AddTrip";
import DeleteConfirmationModal from "../models/DeleteConfirmationModal";
import useModalState from "../../../hooks/useModalState";

export default function ManageTrips() {
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
  
  const { data, isLoading, error, refetch } = useGetItmes("trips");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTrips = data?.filter(trip => 
    trip.title?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    trip.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">Loading trips...</p>
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
            <Link to="/admin" className="p-2 bg-white rounded-lg shadow-soft hover:shadow-blue transition-all">
              <ChevronLeft className="h-5 w-5 text-natural-blue" />
            </Link>
            <h1 className="text-2xl font-bold text-deep-charcoal">Manage Trips</h1>
          </div>
          
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors shadow-soft"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Trip</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray h-5 w-5" />
              <input
                type="text"
                placeholder="Search trips..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
              />
            </div>
            
            <div className="flex gap-2">
              <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                <option value="">All Categories</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="relaxation">Relaxation</option>
              </select>
              
              <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="price-low">Price (Low to High)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTrips?.map((trip) => (
              <div key={trip._id} className="bg-soft-sand rounded-xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300">
                <div className="relative h-48">
                  <img
                    src={trip.imageCover || "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?q=80&w=1920"}
                    alt={trip.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex items-center gap-1 text-white mb-1">
                      <MapPin className="h-4 w-4" />
                      <span className="text-sm">{trip.destination || "Unknown"}</span>
                    </div>
                    <h3 className="text-lg font-bold text-white line-clamp-1">{trip.title}</h3>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1 text-warm-orange">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="font-medium">{trip.ratingsAverage || "0"}</span>
                      <span className="text-cool-gray text-sm">({trip.ratingQuantity || 0})</span>
                    </div>
                    <div className="flex items-center gap-1 text-cool-gray text-sm">
                      <Calendar className="h-4 w-4" />
                      <span>{trip.duration || "N/A"} days</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-natural-blue" />
                      <span className="text-lg font-bold text-natural-blue">${trip.price || "0"}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-natural-blue/10 text-natural-blue rounded-full">
                      {trip.type || "Tour"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between gap-2">
                    <button
                      onClick={() => handleEdit(trip)}
                      className="flex-1 py-2 px-3 bg-natural-blue/10 text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4 inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(trip)}
                      className="flex-1 py-2 px-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-4 w-4 inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredTrips?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cool-gray">No trips found</p>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        refetch={refetch}
        message="Are you sure you want to delete this trip? This action cannot be undone."
        model={"trips"}
        doc={selectedItem}
      />
      
      <AddTripModel
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        isEditMode={isEditMode}
        trip={selectedItem}
      />
    </div>
  );
}