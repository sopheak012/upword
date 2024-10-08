import React from "react";

const MainPageFooter: React.FC = () => {
  return (
    <footer className="py-6 text-black bg-white border-t border-gray-200">
      <div className="flex flex-col items-center justify-between mx-auto md:flex-row">
        <div className="flex flex-col items-center mb-4 md:mb-0">
          <h2 className="text-xl font-bold">upword</h2>
          <p className="text-sm">Expand your vocabulary daily.</p>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-black hover:text-gray-600">
            About
          </a>
          <a href="#" className="text-black hover:text-gray-600">
            Contact
          </a>
          <a href="#" className="text-black hover:text-gray-600">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
};

export default MainPageFooter;
