import { Menu, X } from "lucide-react";
import React from "react";

const MobileMenuButton = ({ setIsOpen, isOpen }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-gray-600 hover:text-emerald-600"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
    </div>
  );
};

export default MobileMenuButton;
