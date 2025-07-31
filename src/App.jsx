import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./contexts/ThemeContext";
import ModernNavbar from "./components/ModernNavbar";
import ModernFooter from "./components/ModernFooter";
import ModernHome from "./pages/ModernHome";
import Trips from "./pages/Trips";
import AdvancedTrips from "./pages/AdvancedTrips";
import TripDetails from "./pages/TripDetails";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Wishlist from "./pages/Wishlist";
import Cart from "./pages/Cart";
import MyAccount from "./pages/MyAccount";
import CreateTrip from "./pages/CreateTrip";
import AboutUs from "./pages/AboutUs";
import CustomerExperiences from "./pages/CustomerExperiences";
import ExclusiveOffers from "./pages/ExclusiveOffers";
import ManageUsers from "./pages/admin/pages/ManageUsers";
import ManageTrips from "./pages/admin/pages/ManageTrips";
import ManageBookings from "./pages/admin/pages/ManageBookings";
import Payments from "./pages/admin/pages/Payments";
import RequireAuth from "./pages/admin/RequireAuth";
import SignIn from "./pages/auth/SignIn";
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import ManageCategories from "./pages/admin/pages/ManageCategories";
import { useDispatch } from "react-redux";
import { setAuthChecked, setUser } from "./rtk/features/userSlice";
import api from "./lib/axios";
import Overview from "./pages/admin/pages/Overview";
import DashboardLayout from "./components/DashboardLayout";
import CompanyProfile from "./pages/admin/pages/CompanyProfile";
import CompaniesList from "./pages/admin/companies";
import CompanyForm from "./pages/admin/companies/new";
import CompanyDetails from "./pages/admin/companies/[id]";
import CompanyEdit from "./pages/admin/companies/[id]/edit";
const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  // Set document direction based on language
  useEffect(() => {
    if (i18n.language === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = i18n.language;
    }
  }, [i18n.language]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) return;
      try {
        const response = await api.get("/users/getMe");
        const userData = response.data.data;
        dispatch(setUser(userData));
        dispatch(setAuthChecked(true));
      } catch (error) {
        dispatch(setAuthChecked(true));
        localStorage.removeItem("token");
      }
    };

    fetchUser();
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <div className="min-h-screen bg-soft-sand dark:bg-gray-900 transition-colors duration-300">
          <ModernNavbar />
          <main className="mx-auto min-h-[calc(100vh-64px)]">
            <Routes>
              <Route path="/" element={<ModernHome />} />
              <Route path="/trips" element={<Trips />} />
              <Route path="/advanced-trips" element={<AdvancedTrips />} />
              <Route path="/trips/:id" element={<TripDetails />} />
              <Route
                path="/booking/:tripId/:dateId/:spots"
                element={<Booking />}
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<MyAccount />} />
              <Route path="/create-trip" element={<CreateTrip />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/experiences" element={<CustomerExperiences />} />
              <Route path="/offers" element={<ExclusiveOffers />} />

              {/* Auth Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />

              {/* Admin Routes */}
              <Route
                path="/admin-dashboard"
                element={
                  <RequireAuth>
                    {/* we will get the role from the user */}
                    <DashboardLayout role="admin" />
                  </RequireAuth>
                }
              >
                <Route index element={<Overview />} />
                <Route path="categories" element={<ManageCategories />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="trips" element={<ManageTrips />} />
                <Route path="payments" element={<Payments />} />
                <Route path="companies" element={<CompaniesList />} />
                <Route path="companies/new" element={<CompanyForm />} />
                <Route path="companies/:id" element={<CompanyDetails />} />
                <Route path="companies/:id/edit" element={<CompanyForm />} />
              </Route>

              <Route
                path="/company-dashboard"
                element={
                  <RequireAuth>
                    <DashboardLayout role="company" />
                  </RequireAuth>
                }
              >
                <Route index element={<Overview />} />

                <Route path="categories" element={<ManageCategories />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="bookings" element={<ManageBookings />} />
                <Route path="trips" element={<ManageTrips />} />
                <Route path="payments" element={<Payments />} />
                <Route path="profile" element={<CompanyProfile />} />
              </Route>
              {/* Legacy signin route for backward compatibility */}
              <Route path="/signin" element={<SignIn />} />

              {/* 404 Route */}
              <Route path="/*" element={<p>404 Page Not Found</p>} />
            </Routes>
          </main>
          <ModernFooter />
          <Toaster position="top-right" />
        </div>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
