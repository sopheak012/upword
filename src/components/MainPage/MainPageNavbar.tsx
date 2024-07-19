import React from "react";
import { Link } from "react-router-dom";

const MainPageNavbar: React.FC = () => {
  return (
    <nav className="text-gray-800 bg-gray-50">
      <div className="flex justify-between p-4 mx-auto">
        <div className="text-2xl font-bold">upword</div>
        <div className="flex space-x-4">
          <Link to="/wordoftheday" className="hover:text-gray-600">
            Word of the Day
          </Link>
          <Link to="/" className="hover:text-gray-600">
            All Words
          </Link>
          <div className="hover:text-gray-600">SignIn</div>
        </div>
      </div>
    </nav>
  );
};

export default MainPageNavbar;
