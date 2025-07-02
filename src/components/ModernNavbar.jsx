import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Menu,
  X,
  Compass,
  ChevronDown,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import UserMenu from "./UserMenu";
import LanguageThemeToggle from "./LanguageThemeToggle";

const ModernNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const { isAuthenticated, authChecked } = useSelector((state) => state.user);
  const { t } = useTranslation();
  console.log(isAuthenticated);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isAdminRoute =
    location.pathname.startsWith("/admin") || location.pathname === "/signin";

  if (isAdminRoute) return null;

  const explorePages = [
    { to: "/trips", label: t("nav.allTrips") },
    { to: "/advanced-trips", label: t("nav.advancedSearch") },
    { to: "/create-trip", label: t("nav.createTrip") },
    { to: "/offers", label: t("nav.exclusiveOffers") },
  ];

  const aboutPages = [
    { to: "/about", label: t("nav.aboutUs") },
    { to: "/experiences", label: t("nav.customerStories") },
    { to: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300  ${
        isScrolled
          ? "bg-soft-sand/95 dark:bg-gray-900/95 backdrop-blur-md shadow-soft border-b border-natural-blue/10 dark:border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-natural-blue rounded-lg group-hover:bg-natural-blue-dark transition-colors">
              <Compass className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-deep-charcoal dark:text-white">
              Tripify
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-deep-charcoal dark:text-gray-300 hover:text-natural-blue dark:hover:text-natural-blue transition-colors font-medium"
            >
              {t("nav.home")}
            </Link>

            {/* Explore Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown("explore")}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-1 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue dark:hover:text-natural-blue transition-colors font-medium">
                {t("nav.explore")}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showDropdown === "explore" && (
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-blue border border-natural-blue/10 dark:border-gray-700 py-2">
                  {explorePages.map((page) => (
                    <Link
                      key={page.to}
                      to={page.to}
                      className="block px-4 py-2 text-deep-charcoal dark:text-gray-300 hover:bg-natural-blue/10 dark:hover:bg-gray-700 hover:text-natural-blue transition-colors"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* About Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowDropdown("about")}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <button className="flex items-center gap-1 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue dark:hover:text-natural-blue transition-colors font-medium">
                {t("nav.about")}
                <ChevronDown className="w-4 h-4" />
              </button>

              {showDropdown === "about" && (
                <div className="absolute top-full left-0 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-blue border border-natural-blue/10 dark:border-gray-700 py-2">
                  {aboutPages.map((page) => (
                    <Link
                      key={page.to}
                      to={page.to}
                      className="block px-4 py-2 text-deep-charcoal dark:text-gray-300 hover:bg-natural-blue/10 dark:hover:bg-gray-700 hover:text-natural-blue transition-colors"
                    >
                      {page.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/wishlist"
              className="p-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors"
            >
              <Heart className="h-5 w-5" />
            </Link>
            <Link
              to="/cart"
              className="p-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
            </Link>
            <LanguageThemeToggle />
            <UserMenu />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-soft-sand/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-natural-blue/10 dark:border-gray-700 shadow-soft">
            <div className="px-4 py-6 space-y-4">
              <Link
                to="/"
                className="block py-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.home")}
              </Link>

              {/* Mobile Explore Section */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-natural-blue uppercase tracking-wide">
                  {t("nav.explore")}
                </div>
                {explorePages.map((page) => (
                  <Link
                    key={page.to}
                    to={page.to}
                    className="block py-2 pl-4 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>

              {/* Mobile About Section */}
              <div className="space-y-2">
                <div className="text-sm font-semibold text-natural-blue uppercase tracking-wide">
                  {t("nav.about")}
                </div>
                {aboutPages.map((page) => (
                  <Link
                    key={page.to}
                    to={page.to}
                    className="block py-2 pl-4 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {page.label}
                  </Link>
                ))}
              </div>

              <Link
                to="/wishlist"
                className="block py-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.wishlist")}
              </Link>
              <Link
                to="/cart"
                className="block py-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t("nav.cart")}
              </Link>

              {/* Mobile Language & Theme Toggle */}
              <div className="pt-4 border-t border-natural-blue/20 dark:border-gray-700">
                <LanguageThemeToggle />
              </div>

              {!isAuthenticated && (
                <div className="pt-4 border-t border-natural-blue/20 dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    className="block py-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.login")}
                  </Link>
                  <Link
                    to="/signup"
                    className="block py-3 bg-warm-orange text-deep-charcoal rounded-lg text-center font-medium hover:bg-warm-orange-dark transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.signup")}
                  </Link>
                </div>
              )}

              {/* Mobile User Menu for authenticated users */}
              {isAuthenticated && (
                <div className="pt-4 border-t border-natural-blue/20 dark:border-gray-700">
                  <Link
                    to="/my-account"
                    className="block py-2 text-deep-charcoal dark:text-gray-300 hover:text-natural-blue transition-colors font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    {t("nav.myAccount")}
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default ModernNavbar;
