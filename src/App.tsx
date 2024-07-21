import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPageFooter from "./components/MainPage/MainPageFooter";
import MainPageBody from "./components/MainPage/MainPageBody";
import MainPageNavbar from "./components/MainPage/MainPageNavbar";
import NewWord from "./components/NewWord/NewWord";
import AllWords from "./components/AllWords/AllWords";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <MainPageNavbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<MainPageBody />} />
            <Route
              path="/wordoftheday"
              element={
                <div className="flex items-center justify-center">
                  <NewWord />
                </div>
              }
            />
            <Route path="/allwords" element={<AllWords />} />
            {/* Add more routes here as needed */}
          </Routes>
        </main>
        <MainPageFooter />
      </div>
    </Router>
  );
}

export default App;
