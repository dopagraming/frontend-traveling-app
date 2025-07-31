import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import slugify from "slugify";
import api from "../../../lib/axios";

export default function CompanyNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    slug: "",
    about: "",
    defaultCurrency: "USD",
    contact: { email: "", phone: "", address: "" },
    paymentInfo: { bankAccount: "", paypal: "" },
    status: "pending",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("contact.")) {
      const key = name.split(".")[1];
      setForm((f) => ({ ...f, contact: { ...f.contact, [key]: value } }));
    } else if (name.startsWith("paymentInfo.")) {
      const key = name.split(".")[1];
      setForm((f) => ({
        ...f,
        paymentInfo: { ...f.paymentInfo, [key]: value },
      }));
    } else if (name === "name") {
      setForm((f) => ({
        ...f,
        name: value,
        slug: slugify(value, { lower: true }),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await api.post("/companies", form);
      toast.success("Company created successfully");
      navigate("/admin-dashboard/companies");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-soft space-y-4"
    >
      <h2 className="text-xl font-semibold">New Company</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug</label>
        <input
          name="slug"
          value={form.slug}
          onChange={handleChange}
          disabled={loading}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">About</label>
        <textarea
          name="about"
          value={form.about}
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
          value={form.defaultCurrency}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="TRY">TRY</option>
        </select>
      </div>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Contact Info
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Email</label>
            <input
              name="contact.email"
              type="email"
              value={form.contact.email}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input
              name="contact.phone"
              type="tel"
              value={form.contact.phone}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm">Address</label>
          <input
            name="contact.address"
            value={form.contact.address}
            onChange={handleChange}
            disabled={loading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          />
        </div>
      </fieldset>
      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-gray-700">
          Payment Info
        </legend>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm">Bank Account</label>
            <input
              name="paymentInfo.bankAccount"
              value={form.paymentInfo.bankAccount}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
          <div>
            <label className="block text-sm">PayPal</label>
            <input
              name="paymentInfo.paypal"
              value={form.paymentInfo.paypal}
              onChange={handleChange}
              disabled={loading}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>
      </fieldset>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        >
          <option value="pending">Pending</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-natural-blue text-white px-4 py-2 rounded-lg shadow-soft hover:bg-natural-blue-dark"
      >
        {loading ? "Creating..." : "Create Company"}
      </button>
    </form>
  );
}
