import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const MainPageBody: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  // Assuming the user state is stored in a global Redux store
  const user = useSelector((state: RootState) => state.user);

  const handleSignUp = () => {
    navigate("/register", { state: { email } });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">The Wonder of Words</h2>
        <p className="mb-4">
          Expand your lexicon with a new word in your inbox every day!
        </p>
        {!user.isLogin ? (
          <div className="flex">
            <input
              type="text"
              placeholder="Enter Email Address"
              className="p-2 border border-gray-300 rounded-l-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              onClick={handleSignUp}
              className="p-2 text-white bg-blue-500 rounded-r-md"
            >
              Sign Up
            </button>
          </div>
        ) : (
          <p className="text-lg">Welcome back, {user.email}!</p>
        )}
      </div>
    </div>
  );
};

export default MainPageBody;
