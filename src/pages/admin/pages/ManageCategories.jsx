import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  PlusCircle,
  Search,
  ChevronLeft,
  Edit,
  Trash2,
  Tag,
} from "lucide-react";
import useGetItmes from "../../../hooks/useGetProducts";
import DeleteConfirmationModal from "../models/DeleteConfirmationModal";
import useModalState from "../../../hooks/useModalState";
import AddCategoryModel from "../models/AddCategoryModel";

export default function ManageCategories() {
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

  const { data, isLoading, error, refetch } = useGetItmes("categories");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = data?.filter((category) =>
    category.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">
            Loading categories...
          </p>
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
              to="/admin-dashboard"
              className="p-2 bg-white rounded-lg shadow-soft hover:shadow-blue transition-all"
            >
              <ChevronLeft className="h-5 w-5 text-natural-blue" />
            </Link>
            <h1 className="text-2xl font-bold text-deep-charcoal">
              Manage Categories
            </h1>
          </div>

          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors shadow-soft"
          >
            <PlusCircle className="h-5 w-5" />
            <span>Add Category</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray h-5 w-5" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories?.map((category) => (
              <div
                key={category._id}
                className="bg-soft-sand rounded-xl shadow-soft overflow-hidden hover:shadow-blue transition-all duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-natural-blue/10 rounded-lg">
                        <Tag className="h-5 w-5 text-natural-blue" />
                      </div>
                      <h3 className="text-lg font-bold text-deep-charcoal">
                        {category.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex justify-between gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex-1 py-2 px-3 bg-natural-blue/10 text-natural-blue rounded-lg hover:bg-natural-blue hover:text-white transition-colors"
                    >
                      <Edit className="h-4 w-4 inline mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(category)}
                      className="flex-1 py-2 px-3 bg-red-50 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors"
                    >
                      <Trash2 className="h-4 w-4 inline mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCategories?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cool-gray">No categories found</p>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        refetch={refetch}
        message="Are you sure you want to delete this category? This action cannot be undone."
        model={"categories"}
        doc={selectedItem}
      />

      <AddCategoryModel
        isOpen={isOpen}
        onClose={onClose}
        refetch={refetch}
        isEditMode={isEditMode}
        category={selectedItem}
      />
    </div>
  );
}
