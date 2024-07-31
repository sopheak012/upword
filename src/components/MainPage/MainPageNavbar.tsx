import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store"; // Adjust import path if necessary
import { clearUser } from "../../Redux/Slices/userSlice";
import { User } from "../../Interfaces/index";

const MainPageNavbar: React.FC = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Check Redux state first
    if (user.isLogin) {
      setUserEmail(user.email);
      setIsLoggedIn(true);
    } else {
      // Fallback to local storage if Redux state is not updated
      const userString = localStorage.getItem("user");
      if (userString) {
        const storedUser: User = JSON.parse(userString);
        if (storedUser.isLogin) {
          setUserEmail(storedUser.email);
          setIsLoggedIn(true);
        } else {
          setUserEmail(null);
          setIsLoggedIn(false);
        }
      } else {
        setUserEmail(null);
        setIsLoggedIn(false);
      }
    }
  }, [user]);

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem("user");

    // Clear user data from Redux store
    dispatch(clearUser());

    // Update local state
    setUserEmail(null);
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login");
  };

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
            <button
              onClick={handleLogout}
              className="font-medium text-blue-500 hover:text-blue-600"
            >
              Sign Out
            </button>
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
