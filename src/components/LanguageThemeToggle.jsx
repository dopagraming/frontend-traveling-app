import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme } from "../contexts/ThemeContext";
import { Globe, Sun, Moon, ChevronDown, Check } from "lucide-react";

const LanguageThemeToggle = () => {
  const { i18n, t } = useTranslation();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "tr", name: "Türkçe", flag: "🇹🇷" },
  ];

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  const changeLanguage = (langCode) => {
    i18n.changeLanguage(langCode);
    setShowLanguageMenu(false);

    // Update document direction for RTL languages
    if (langCode === "ar") {
      document.documentElement.dir = "rtl";
      document.documentElement.lang = "ar";
    } else {
      document.documentElement.dir = "ltr";
      document.documentElement.lang = langCode;
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <Globe className="w-4 h-4 text-deep-charcoal dark:text-gray-300" />
          <span className="text-sm font-medium text-deep-charcoal dark:text-gray-300">
            {currentLanguage.flag}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform text-deep-charcoal dark:text-gray-300 ${
              showLanguageMenu ? "rotate-180" : ""
            }`}
          />
        </button>

        {showLanguageMenu && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowLanguageMenu(false)}
            />
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20">
              <div className="py-2">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => changeLanguage(language.code)}
                    className="w-full flex items-center justify-between px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {language.name}
                      </span>
                    </div>
                    {i18n.language === language.code && (
                      <Check className="w-4 h-4 text-natural-blue" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-deep-charcoal dark:text-gray-300" />
        ) : (
          <Moon className="w-4 h-4 text-deep-charcoal dark:text-gray-300" />
        )}
      </button>
    </div>
  );
};

export default LanguageThemeToggle;
