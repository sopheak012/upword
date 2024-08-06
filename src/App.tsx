import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";
import MainPageFooter from "./components/MainPage/MainPageFooter";
import MainPageBody from "./components/MainPage/MainPageBody";
import MainPageNavbar from "./components/MainPage/MainPageNavbar";
import NewWord from "./components/Word/Word";
import AllWords from "./components/AllWords/AllWords";
import MyWords from "./components/MyWords/MyWords"; // Import MyWords component
import Login from "./components/User/Login";
import Register from "./components/User/Register"; // Assuming you have a Register component
import { useState, useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute"; // Import PrivateRoute component

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    setIsLoggedIn(!!user.isLogin);
  }, []);

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
            <Route
              path="/words/:word"
              element={
                <div className="flex items-center justify-center">
                  <NewWord />
                </div>
              }
            />
            <Route path="/allwords" element={<AllWords />} />
            <Route
              path="/mywords"
              element={
                <PrivateRoute element={<MyWords />} isLoggedIn={isLoggedIn} />
              }
            />
            {isLoggedIn ? (
              <>
                <Route
                  path="/login"
                  element={<Navigate to="/wordoftheday" />}
                />
                <Route
                  path="/register"
                  element={<Navigate to="/wordoftheday" />}
                />
              </>
            ) : (
              <>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </>
            )}
          </Routes>
        </main>
        <MainPageFooter />
      </div>
    </Router>
  );
}

export default App;
