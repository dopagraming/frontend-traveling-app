import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronLeft, Download, Eye, CreditCard, DollarSign, Calendar, ArrowUpRight, Filter } from "lucide-react";

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  
  // Mock payment data
  const payments = [
    {
      id: "PAY-1234567",
      customer: "John Smith",
      email: "john.smith@example.com",
      amount: 1299,
      status: "completed",
      date: "2024-04-15",
      method: "credit_card",
      trip: "Pyramids & Nile Adventure"
    },
    {
      id: "PAY-2345678",
      customer: "Sarah Johnson",
      email: "sarah.j@example.com",
      amount: 899,
      status: "completed",
      date: "2024-04-12",
      method: "usdt",
      trip: "Desert Safari"
    },
    {
      id: "PAY-3456789",
      customer: "Michael Chen",
      email: "m.chen@example.com",
      amount: 1599,
      status: "pending",
      date: "2024-04-10",
      method: "credit_card",
      trip: "Luxor Day Trip"
    },
    {
      id: "PAY-4567890",
      customer: "Emma Rodriguez",
      email: "emma.r@example.com",
      amount: 749,
      status: "failed",
      date: "2024-04-08",
      method: "credit_card",
      trip: "Red Sea Snorkeling"
    },
    {
      id: "PAY-5678901",
      customer: "David Thompson",
      email: "david.t@example.com",
      amount: 1099,
      status: "completed",
      date: "2024-04-05",
      method: "usdt",
      trip: "Cairo Pyramids Tour"
    }
  ];

  const filteredPayments = payments.filter(payment => 
    payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) || 
    payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.trip.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to get status badge styling
  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Function to get payment method icon
  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'credit_card':
        return <CreditCard className="h-4 w-4" />;
      case 'usdt':
        return <DollarSign className="h-4 w-4" />;
      default:
        return <CreditCard className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-soft-sand">
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Link to="/admin" className="p-2 bg-white rounded-lg shadow-soft hover:shadow-blue transition-all">
              <ChevronLeft className="h-5 w-5 text-natural-blue" />
            </Link>
            <h1 className="text-2xl font-bold text-deep-charcoal">Payment History</h1>
          </div>
          
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-white text-deep-charcoal rounded-lg hover:bg-gray-50 transition-colors shadow-soft md:hidden"
          >
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters - Desktop */}
          <div className={`lg:block ${filterOpen ? 'block' : 'hidden'} lg:w-64 bg-white rounded-xl shadow-soft p-6 h-fit`}>
            <h2 className="text-lg font-semibold text-deep-charcoal mb-4">Filters</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-deep-charcoal mb-2">Date Range</label>
                <div className="space-y-2">
                  <input
                    type="date"
                    className="w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
                  />
                  <input
                    type="date"
                    className="w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-deep-charcoal mb-2">Status</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-natural-blue focus:ring-natural-blue" />
                    <span className="ml-2 text-cool-gray">Completed</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-natural-blue focus:ring-natural-blue" />
                    <span className="ml-2 text-cool-gray">Pending</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-natural-blue focus:ring-natural-blue" />
                    <span className="ml-2 text-cool-gray">Failed</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-deep-charcoal mb-2">Payment Method</label>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-natural-blue focus:ring-natural-blue" />
                    <span className="ml-2 text-cool-gray">Credit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="rounded text-natural-blue focus:ring-natural-blue" />
                    <span className="ml-2 text-cool-gray">USDT</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-deep-charcoal mb-2">Amount Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    className="w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
                  />
                  <span className="text-cool-gray">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    className="w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
                  />
                </div>
              </div>
              
              <button className="w-full py-2 bg-natural-blue text-white rounded-lg hover:bg-natural-blue-dark transition-colors">
                Apply Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-soft p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-4 justify-between mb-6">
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cool-gray h-5 w-5" />
                  <input
                    type="text"
                    placeholder="Search payments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue"
                  />
                </div>
                
                <div className="flex gap-2">
                  <select className="rounded-lg border-sea-blue/30 shadow-sm focus:ring-sea-blue focus:border-sea-blue">
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="amount-high">Amount (High to Low)</option>
                    <option value="amount-low">Amount (Low to High)</option>
                  </select>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-natural-blue/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cool-gray text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold text-natural-blue">$5,545</p>
                    </div>
                    <div className="p-3 bg-natural-blue/20 rounded-full">
                      <DollarSign className="h-6 w-6 text-natural-blue" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-warm-orange/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cool-gray text-sm">Transactions</p>
                      <p className="text-2xl font-bold text-warm-orange">42</p>
                    </div>
                    <div className="p-3 bg-warm-orange/20 rounded-full">
                      <ArrowUpRight className="h-6 w-6 text-warm-orange" />
                    </div>
                  </div>
                </div>
                
                <div className="bg-gentle-olive/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cool-gray text-sm">This Month</p>
                      <p className="text-2xl font-bold text-gentle-olive">$2,156</p>
                    </div>
                    <div className="p-3 bg-gentle-olive/20 rounded-full">
                      <Calendar className="h-6 w-6 text-gentle-olive" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                        Customer
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                        Trip
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cool-gray uppercase tracking-wider">
                        Method
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
                    {filteredPayments.map((payment) => (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-deep-charcoal">{payment.id}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-deep-charcoal">{payment.customer}</div>
                          <div className="text-xs text-cool-gray">{payment.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cool-gray">{payment.trip}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-cool-gray">
                            {new Date(payment.date).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-natural-blue">${payment.amount}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`p-1 rounded-full mr-2 ${payment.method === 'credit_card' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                              {getPaymentMethodIcon(payment.method)}
                            </span>
                            <span className="text-sm text-cool-gray">
                              {payment.method === 'credit_card' ? 'Credit Card' : 'USDT'}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(payment.status)}`}>
                            {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex justify-end gap-2">
                            <button
                              className="p-1 text-natural-blue hover:bg-natural-blue/10 rounded"
                              title="View Details"
                            >
                              <Eye className="h-5 w-5" />
                            </button>
                            <button
                              className="p-1 text-natural-blue hover:bg-natural-blue/10 rounded"
                              title="Download Receipt"
                            >
                              <Download className="h-5 w-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {filteredPayments.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-cool-gray">No payments found</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}