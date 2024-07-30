import React from "react";
import { Link } from "react-router-dom";

const MainPageNavbar: React.FC = () => {
  return (
    <div className="flex justify-between p-3 font-sans">
      <div className="text-2xl font-bold">
        <Link to="/" className="no-underline text-inherit">
          upword
        </Link>
      </div>
      <div className="flex flex-row gap-8">
        <Link to="/wordoftheday" className="font-medium">
          Word of the Day
        </Link>
        <Link to="/allwords" className="font-medium">
          All Words
        </Link>
        <Link to="/login" className="font-medium">
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default MainPageNavbar;
