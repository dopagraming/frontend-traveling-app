import React from "react";
import { Link } from "react-router-dom";
import useGetItems from "../../hooks/useGetItems";
import { toast } from "react-hot-toast";
import { Eye, Edit2, Trash2, Plus } from "lucide-react";
import api from "../../../lib/axios";

export default function AdminCompanies() {
  // Fetch all companies (super-admin only)
  const { data: companies = [], refetch } = useGetItems("companies");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this company?"))
      return;
    try {
      await api.delete(`/api/v1/companies/${id}`);
      toast.success("Company deleted");
      refetch();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Companies Management</h1>
        <Link
          to="/admin-dashboard/companies/new"
          className="inline-flex items-center gap-2 bg-natural-blue text-white px-4 py-2 rounded-lg shadow-soft hover:bg-natural-blue-dark"
        >
          <Plus className="w-4 h-4" /> New Company
        </Link>
      </div>

      <div className="overflow-x-auto bg-white rounded-xl shadow-soft">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              {["Name", "Slug", "Status", "Created At", "Actions"].map(
                (header) => (
                  <th
                    key={header}
                    className="px-4 py-2 text-left text-sm font-medium text-gray-600"
                  >
                    {header}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {companies.map((c) => (
              <tr key={c._id} className="border-t">
                <td className="px-4 py-2">{c.name}</td>
                <td className="px-4 py-2">{c.slug}</td>
                <td className="px-4 py-2 capitalize">{c.status}</td>
                <td className="px-4 py-2">
                  {new Date(c.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 space-x-2">
                  <Link
                    to={`/admin-dashboard/companies/${c._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    <Eye className="inline w-4 h-4" />
                  </Link>
                  <Link
                    to={`/admin-dashboard/companies/${c._id}/edit`}
                    className="text-green-600 hover:underline"
                  >
                    <Edit2 className="inline w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(c._id)}
                    className="text-red-600 hover:underline"
                  >
                    <Trash2 className="inline w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {companies.length === 0 && (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-gray-500">
                  No companies found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
