import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Compass,
  Send
} from "lucide-react";
import { useTranslation } from "react-i18next";

const ModernFooter = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gentle-olive dark:bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-6">
              <div className="p-2 bg-white/20 rounded-lg">
                <Compass className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Wanderlust</span>
            </div>
            <p className="text-white/80 mb-6 leading-relaxed">
              Discover the world with us through unforgettable adventures and
              experiences. Your journey to amazing destinations starts here.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://twitter.com"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://youtube.com"
                className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
              >
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.allTrips')}
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/80 hover:text-white transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors">
                  Travel Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{t('footer.services')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/tours" className="text-white/80 hover:text-white transition-colors">
                  Guided Tours
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-white/80 hover:text-white transition-colors">
                  Hotel Booking
                </Link>
              </li>
              <li>
                <Link to="/flights" className="text-white/80 hover:text-white transition-colors">
                  Flight Booking
                </Link>
              </li>
              <li>
                <Link to="/packages" className="text-white/80 hover:text-white transition-colors">
                  Travel Packages
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="text-white/80 hover:text-white transition-colors">
                  Travel Insurance
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h3 className="text-xl font-semibold mb-6">{t('footer.getInTouch')}</h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                <span className="text-white/80 text-sm">
                  123 Adventure Street, Explorer City, EC 12345
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80 flex-shrink-0" />
                <span className="text-white/80 text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80 flex-shrink-0" />
                <span className="text-white/80 text-sm">hello@wanderlust.com</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold mb-3">{t('footer.newsletter')}</h4>
              <p className="text-white/80 text-sm mb-4">
                {t('footer.newsletterDesc')}
              </p>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder={t('footer.yourEmail')}
                  className="flex-1 px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/50 text-sm"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-warm-orange text-deep-charcoal rounded-lg hover:bg-warm-orange-dark transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} Wanderlust. {t('footer.allRightsReserved')}.
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/privacy" className="text-white/80 hover:text-white transition-colors">
                {t('footer.privacyPolicy')}
              </Link>
              <Link to="/terms" className="text-white/80 hover:text-white transition-colors">
                {t('footer.termsOfService')}
              </Link>
              <Link to="/cookies" className="text-white/80 hover:text-white transition-colors">
                {t('footer.cookiePolicy')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ModernFooter;