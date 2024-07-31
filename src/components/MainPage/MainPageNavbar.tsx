import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MainPageNavbar: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Fetch user data from local storage
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      if (user.isLogin) {
        setUserEmail(user.email);
        setIsLoggedIn(true);
      } else {
        setUserEmail(null);
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <div className="flex justify-between p-3 font-sans bg-gray-100 shadow-md">
      <div className="text-2xl font-bold">
        <Link to="/" className="no-underline text-inherit">
          upword
        </Link>
      </div>
      <div className="flex items-center gap-8">
        <Link to="/wordoftheday" className="font-medium">
          Word of the Day
        </Link>
        <Link to="/allwords" className="font-medium">
          All Words
        </Link>
        {isLoggedIn ? (
          <div className="flex items-center gap-4">
            <span className="font-medium">{userEmail}</span>
            <Link to="/login" className="font-medium text-blue-500">
              Sign Out
            </Link>
          </div>
        ) : (
          <Link to="/login" className="font-medium">
            Sign In
          </Link>
        )}
      </div>
    </div>
  );
};

export default MainPageNavbar;
