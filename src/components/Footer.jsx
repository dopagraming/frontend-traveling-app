import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-deep-charcoal text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-sunny-yellow">Adventure Tours</h3>
            <p className="text-gray-400 mb-4">
              Discover the world with us through unforgettable adventures and
              experiences.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="hover:text-sunny-yellow transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="hover:text-sunny-yellow transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="hover:text-sunny-yellow transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-sunny-yellow">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-sea-blue transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/trips"
                  className="hover:text-sea-blue transition-colors"
                >
                  Our Trips
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-sea-blue transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-sunny-yellow">Contact Us</h3>
            <ul className="space-y-2 max-w-full">
              <li className="flex items-center space-x-2">
                <MapPin size={16} className="text-sea-blue" />
                <span>123 Adventure St, Explorer City</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={16} className="text-sea-blue" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="text-sea-blue" />
                <span className="break-all">blog@abdelrahmanzourob.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4 text-sunny-yellow">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates and offers.
            </p>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 bg-gray-800 border border-sea-blue/30 rounded-lg focus:outline-none focus:border-sea-blue text-white"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-sunny-yellow text-deep-charcoal rounded-lg hover:bg-sunny-yellow-dark transition-colors font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} Adventure Tours. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;