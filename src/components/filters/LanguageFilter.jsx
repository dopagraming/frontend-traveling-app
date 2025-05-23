import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const LanguageFilter = ({ value, onChange }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const languages = [
    { value: "en", label: "English" },
    { value: "ar", label: "Arabic" },
    { value: "tr", label: "Turkish" },
  ];

  return (
    <div>
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full text-left font-medium mb-2"
      >
        <span>Language</span>
        {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {languages.map((language) => (
            <label
              key={language.value}
              className="flex items-center space-x-2 cursor-pointer p-1.5 hover:bg-gray-50 rounded-md"
            >
              <input
                type="radio"
                name="languageOption"
                value={language.value}
                checked={value === language.value}
                onChange={() => onChange(language.value)}
                className="w-4 h-4 text-emerald-500 focus:ring-emerald-500"
              />
              <span className="text-sm">{language.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageFilter;
