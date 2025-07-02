import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User, LogOut, Settings, BookOpen, Heart } from "lucide-react";
import { logout } from "../rtk/features/userSlice";
import toast from "react-hot-toast";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    setIsOpen(false);
  };

  if (!isAuthenticated || !user) {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/login"
          className="dark:text-cool-gray text-deep-charcoal hover:text-sea-blue transition-colors"
        >
          Login
        </Link>
        <Link
          to="/signup"
          className="bg-sunny-yellow text-deep-charcoal dark:text-cool-gray px-4 py-2 rounded-lg hover:bg-sunny-yellow-dark transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          Sign Up
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-cool-gray hover:text-sea-blue transition-colors"
      >
        <div className="w-8 h-8 bg-sea-blue text-white rounded-full flex items-center justify-center font-medium">
          {user.name?.charAt(0).toUpperCase()}
        </div>
        <span className="hidden md:block text-deep-charcoal font-medium">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="absolute right-0 mt-2 w-48 bg-soft-sand rounded-lg shadow-lg border border-sea-blue/20 z-20">
            <div className="py-2">
              <div className="px-4 py-2 border-b border-sea-blue/20">
                <p className="text-sm font-medium text-deep-charcoal">
                  {user.name}
                </p>
                <p className="text-sm text-cool-gray">{user.email}</p>
              </div>

              <Link
                to="/profile"
                className="flex items-center px-4 py-2 text-sm text-deep-charcoal hover:bg-sea-blue/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <User className="w-4 h-4 mr-3 text-sea-blue" />
                Profile
              </Link>

              <Link
                to="/my-bookings"
                className="flex items-center px-4 py-2 text-sm text-deep-charcoal hover:bg-sea-blue/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <BookOpen className="w-4 h-4 mr-3 text-sea-blue" />
                My Bookings
              </Link>

              <Link
                to="/wishlist"
                className="flex items-center px-4 py-2 text-sm text-deep-charcoal hover:bg-sea-blue/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Heart className="w-4 h-4 mr-3 text-sea-blue" />
                Wishlist
              </Link>

              <Link
                to="/settings"
                className="flex items-center px-4 py-2 text-sm text-deep-charcoal hover:bg-sea-blue/10 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                <Settings className="w-4 h-4 mr-3 text-sea-blue" />
                Settings
              </Link>

              <div className="border-t border-sea-blue/20">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserMenu;
