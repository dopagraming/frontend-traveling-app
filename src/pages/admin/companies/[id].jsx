import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Edit2, Trash2 } from "lucide-react";
import api from "../../../lib/axios";

export default function CompanyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await api.get(`/companies/${id}`);
        setCompany(res.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load company");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this company?")) return;
    try {
      await api.delete(`/companies/${id}`);
      toast.success("Company deleted");
      navigate("/admin-dashboard/companies");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div className="bg-white p-6 rounded-xl shadow-soft space-y-6">
      <div className="flex items-center space-x-4">
        <Link
          to="/admin-dashboard/companies"
          className="text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-2xl font-semibold">{company.name}</h1>
      </div>

      {company.logoUrl && (
        <img
          src={company.logoUrl}
          alt="logo"
          className="w-32 h-32 object-cover rounded-full"
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="font-medium">Slug</h2>
          <p>{company.slug}</p>
        </div>
        <div>
          <h2 className="font-medium">Status</h2>
          <p className="capitalize">{company.status}</p>
        </div>
        <div>
          <h2 className="font-medium">Created At</h2>
          <p>{new Date(company.createdAt).toLocaleString()}</p>
        </div>
        <div>
          <h2 className="font-medium">Default Currency</h2>
          <p>{company.defaultCurrency}</p>
        </div>
      </div>

      <section>
        <h2 className="text-lg font-semibold">About</h2>
        <p>{company.about || "-"}</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Contact Info</h2>
        <p>
          <strong>Email:</strong> {company.contact?.email || "-"}
        </p>
        <p>
          <strong>Phone:</strong> {company.contact?.phone || "-"}
        </p>
        <p>
          <strong>Address:</strong> {company.contact?.address || "-"}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Payment Info</h2>
        <p>
          <strong>Bank Account:</strong>{" "}
          {company.paymentInfo?.bankAccount || "-"}
        </p>
        <p>
          <strong>PayPal:</strong> {company.paymentInfo?.paypal || "-"}
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold">Notification Preferences</h2>
        <ul className="list-disc list-inside space-y-1">
          {Object.entries(company.notificationPrefs || {}).map(
            ([key, prefs]) => (
              <li key={key}>
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}:
                </span>{" "}
                {`Email: ${prefs.email ? "✔" : "✘"}, SMS: ${
                  prefs.sms ? "✔" : "✘"
                }`}
              </li>
            )
          )}
        </ul>
      </section>

      <div className="flex space-x-4 pt-4">
        <Link
          to={`/admin-dashboard/companies/${id}/edit`}
          className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          <Edit2 className="w-4 h-4" /> Edit
        </Link>
        <button
          onClick={handleDelete}
          className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          <Trash2 className="w-4 h-4" /> Delete
        </button>
      </div>
    </div>
  );
}
