import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import api from "../../../lib/axios";
import ChangePassword from "../../../components/ChangePassword";

const CompanyProfile = () => {
  const { user } = useSelector((state) => state.user);
  const companyId = user.company;

  const [formData, setFormData] = useState({
    logoUrl: "",
    about: "",
    defaultCurrency: "USD",
    name: "",
    email: "",
    phone: "",
    address: "",
    bankAccount: "",
    paypal: "",
    notificationPrefs: {
      newBooking: { email: true, sms: false },
      lowAvailability: { email: true, sms: false },
      payoutReceipt: { email: true, sms: false },
    },
  });
  const [subAccounts, setSubAccounts] = useState([]);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteName, setInviteName] = useState("");
  const [inviteRole, setInviteRole] = useState("company-user");
  const [loading, setLoading] = useState(false);

  // Fetch profile and team data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [companyRes, teamRes] = await Promise.all([
          api.get(`/api/v1/companies/${companyId}`),
          api.get(`/api/v1/companies/${companyId}/sub-accounts`),
        ]);
        const company = companyRes.data.data;
        setFormData((prev) => ({
          ...prev,
          logoUrl: company.logoUrl || "",
          about: company.about || "",
          defaultCurrency: company.defaultCurrency || "USD",
          name: company.name || "",
          email: company.contact?.email || "",
          phone: company.contact?.phone || "",
          address: company.contact?.address || "",
          bankAccount: company.paymentInfo?.bankAccount || "",
          paypal: company.paymentInfo?.paypal || "",
          notificationPrefs:
            company.notificationPrefs || prev.notificationPrefs,
        }));
        setSubAccounts(teamRes.data.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    if (companyId) fetchData();
  }, [companyId]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    if (name.startsWith("notificationPrefs.")) {
      const [, key, channel] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        notificationPrefs: {
          ...prev.notificationPrefs,
          [key]: { ...prev.notificationPrefs[key], [channel]: checked },
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const data = new FormData();
    data.append("logo", file);
    try {
      setLoading(true);
      const res = await api.post(`/api/v1/companies/${companyId}/logo`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData((prev) => ({ ...prev, logoUrl: res.data.data.logoUrl }));
      toast.success("Logo uploaded");
    } catch {
      toast.error("Logo upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await api.post(
        `/api/v1/companies/${companyId}/sub-accounts`,
        { email: inviteEmail, name: inviteName, role: inviteRole }
      );
      setSubAccounts((prev) => [...prev, res.data.data]);
      toast.success("Invitation sent");
      setInviteEmail("");
      setInviteName("");
    } catch {
      toast.error("Invite failed");
    } finally {
      setLoading(false);
    }
  };

  const updateAccountRole = async (id, role) => {
    try {
      await api.put(`/api/v1/companies/${companyId}/sub-accounts/${id}`, {
        role,
      });
      setSubAccounts((prev) =>
        prev.map((a) => (a._id === id ? { ...a, role } : a))
      );
      toast.success("Role updated");
    } catch {
      toast.error("Update failed");
    }
  };

  const removeAccount = async (id) => {
    try {
      await api.delete(`/api/v1/companies/${companyId}/sub-accounts/${id}`);
      setSubAccounts((prev) => prev.filter((a) => a._id !== id));
      toast.success("Account removed");
    } catch {
      toast.error("Remove failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = { ...formData };
      await api.put(`/api/v1/companies/${companyId}`, payload);
      toast.success("Profile updated");
    } catch {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-soft grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="flex flex-col items-center">
          <img
            src={formData.logoUrl || "/placeholder-logo.png"}
            alt="Company Logo"
            className="w-32 h-32 object-cover rounded-full mb-2"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            disabled={loading}
          />
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              About / Mission
            </label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Default Currency
            </label>
            <select
              name="defaultCurrency"
              value={formData.defaultCurrency}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
              <option>TRY</option>
            </select>
          </div>
          <div>
            <h3 className="text-lg font-medium">Notifications</h3>
            {Object.entries(formData.notificationPrefs).map(([key, ch]) => (
              <div key={key} className="flex items-center space-x-4">
                <span className="capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </span>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={`notificationPrefs.${key}.email`}
                    checked={ch.email}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Email
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name={`notificationPrefs.${key}.sms`}
                    checked={ch.sms}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  SMS
                </label>
              </div>
            ))}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-natural-blue text-white px-6 py-2 rounded-lg shadow-soft hover:bg-natural-blue-dark"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </form>

      {/* Contact & Payments */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-soft grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Phone
          </label>
          <input
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <input
            name="address"
            value={formData.address}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Bank Account
          </label>
          <input
            name="bankAccount"
            value={formData.bankAccount}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            PayPal
          </label>
          <input
            name="paypal"
            value={formData.paypal}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </form>
      {/* Team Management */}
      <div className="bg-white p-6 rounded-xl shadow-soft">
        <h2 className="text-xl font-semibold mb-4">Team Management</h2>
        <form onSubmit={handleInvite} className="flex flex-wrap gap-4 mb-4">
          <input
            type="email"
            placeholder="Email"
            value={inviteEmail}
            onChange={(e) => setInviteEmail(e.target.value)}
            disabled={loading}
            className="flex-1 min-w-[200px] rounded-md border-gray-300 shadow-sm p-2"
          />
          <input
            type="text"
            placeholder="Name"
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            disabled={loading}
            className="flex-1 min-w-[200px] rounded-md border-gray-300 shadow-sm p-2"
          />
          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            disabled={loading}
            className="rounded-md border-gray-300 shadow-sm p-2"
          >
            <option value="company-user">User</option>
            <option value="company-admin">Admin</option>
          </select>
          <button
            type="submit"
            disabled={loading}
            className="bg-natural-blue text-white px-4 py-2 rounded-lg shadow-soft hover:bg-natural-blue-dark"
          >
            Invite
          </button>
        </form>
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subAccounts.map((acc) => (
              <tr key={acc._id} className="border-t">
                <td className="px-4 py-2">{acc.name}</td>
                <td className="px-4 py-2">{acc.email}</td>
                <td className="px-4 py-2">
                  <select
                    value={acc.role}
                    onChange={(e) => updateAccountRole(acc._id, e.target.value)}
                    className="rounded-md border-gray-300 shadow-sm p-1"
                  >
                    <option value="company-user">User</option>
                    <option value="company-admin">Admin</option>
                  </select>
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeAccount(acc._id)}
                    className="text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ChangePassword />
    </div>
  );
};

export default CompanyProfile;
