import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineUserAdd } from "react-icons/ai";
import { User } from "../../Interfaces/index";
import { useDispatch } from "react-redux";
import { setUser } from "../../Redux/Slices/userSlice";
import { RegisterResponse } from "../../Interfaces/index";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      // Post registration data to the backend with explicit typing for the response
      const response = await axios.post<RegisterResponse>(
        "http://localhost:5125/auth/register",
        {
          email,
          password,
          confirmPassword,
          dateOfBirth,
        }
      );

      // Extract user data from the response with renamed variable
      const { email: responseEmail, id } = response.data;

      // Create the user object with the ID
      const user: User = {
        email: responseEmail,
        id, // Include the user ID
        isLogin: true,
      };

      // Save the user's data to local storage
      localStorage.setItem("user", JSON.stringify(user));

      // Update the Redux store
      dispatch(setUser(user));

      // Redirect to login page upon successful registration
      navigate("/wordoftheday");
    } catch (err) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white border border-gray-200 shadow-md rounded-lg p-8">
        <div className="flex items-center justify-center mb-6">
          <AiOutlineUserAdd size={36} className="text-blue-500" />
        </div>
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="dateOfBirth" className="block text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-2"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-gray-700">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 underline hover:text-blue-600"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
