import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Trips from "./pages/Trips";
import TripDetails from "./pages/TripDetails";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import AdminDashboard from "./pages/admin/Dashboard";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import ManageUsers from "./pages/admin/pages/ManageUsers";
import ManageTrips from "./pages/admin/pages/ManageTrips";
import ManageBookings from "./pages/admin/pages/ManageBookings";
import Payments from "./pages/admin/pages/Payments";
import RequireAuth from "./pages/admin/RequireAuth";
import SignIn from "./pages/auth/SignIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ManageCategories from "./pages/admin/pages/ManageCategories";
const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <main className="mx-auto min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trips" element={<Trips />} />
            <Route path="/trips/:id" element={<TripDetails />} />
            <Route
              path="/booking/:tripId/:dateId/:spots"
              element={<Booking />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route
              path="/admin"
              element={
                <RequireAuth>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/categories"
              element={
                <RequireAuth>
                  <ManageCategories />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/users"
              element={
                <RequireAuth>
                  <ManageUsers />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/bookings"
              element={
                <RequireAuth>
                  <ManageBookings />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/trips"
              element={
                <RequireAuth>
                  <ManageTrips />
                </RequireAuth>
              }
            />
            <Route
              path="/admin/payments"
              element={
                <RequireAuth>
                  <Payments />
                </RequireAuth>
              }
            />
            <Route path="/signin" element={<SignIn />}></Route>
            <Route path="/*" element={<p>404 Page Not Found</p>}></Route>
          </Routes>
        </main>
        <Footer />
        <Toaster position="top-right" />
      </QueryClientProvider>
    </>
  );
}
export default App;
