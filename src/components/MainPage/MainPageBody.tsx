import React from "react";

const MainPageBody: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="flex flex-col items-center justify-center">
        <h2 className="mb-4 text-2xl font-bold">The Wonder of Words</h2>
        <p className="mb-4">
          Expand your lexicon with a new word in your inbox every day!
        </p>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter Email Address"
            className="p-2 border border-gray-300 rounded-l-md"
          />
          <button className="p-2 text-white bg-blue-500 rounded-r-md">
            Sign Up
          </button>
        </div>
      </div>
      <div className="flex items-center justify-center ml-8">
        <img
          src="https://via.placeholder.com/150"
          alt="Placeholder"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default MainPageBody;
