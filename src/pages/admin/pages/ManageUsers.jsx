import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Search, ChevronLeft, Edit, Trash2, MoreHorizontal, UserPlus } from "lucide-react";
import useGetItmes from "../../../hooks/useGetProducts";
import DeleteConfirmationModal from "../models/DeleteConfirmationModal";
import AddUserModel from "../models/AddUserModel";
import useModalState from "../../../hooks/useModalState";

export default function ManageUsers() {
  const {
    isOpen,
    selectedItem: selectedUser,
    isEditMode,
    isDeleteModalOpen,
    onClose,
    handleEdit,
    handleDelete,
    handleAdd,
  } = useModalState();
  
  const { data, isLoading, error, refetch } = useGetItmes("users");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = data?.filter(user => 
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-soft-sand flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-soft">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-natural-blue"></div>
          </div>
          <p className="text-center mt-4 text-cool-gray">Loading users...</p>
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
            <h1 className="text-2xl font-bold text-deep-charcoal">Manage Users</h1>
          </div>
          
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors shadow-soft"
          >
            <UserPlus className="h-5 w-5" />
            <span>Add User</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray h-5 w-5" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
              />
            </div>
            
            <div className="flex gap-2">
              <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                <option value="">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
                <option value="manager">Manager</option>
              </select>
              
              <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-cool-gray uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers?.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0 bg-natural-blue text-white rounded-full flex items-center justify-center font-medium">
                          {user.name?.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-deep-charcoal">{user.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-cool-gray">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${user.role === 'admin' ? 'bg-natural-blue/10 text-natural-blue' : 
                          user.role === 'manager' ? 'bg-warm-orange/10 text-warm-orange' : 
                          'bg-gentle-olive/10 text-gentle-olive'}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="p-1 text-natural-blue hover:bg-natural-blue/10 rounded"
                          title="Edit"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user)}
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
          
          {filteredUsers?.length === 0 && (
            <div className="text-center py-12">
              <p className="text-cool-gray">No users found</p>
            </div>
          )}
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={onClose}
        model={"users"}
        message={`Are you sure you want to delete this user? This action cannot be undone.`}
        refetch={refetch}
        doc={selectedUser}
      />
      
      <AddUserModel
        isOpen={isOpen}
        onClose={onClose}
        isEditMode={isEditMode}
        user={selectedUser}
        refetch={refetch}
      />
    </div>
  );
}