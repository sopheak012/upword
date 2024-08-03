import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import MainPageFooter from "./components/MainPage/MainPageFooter";
import MainPageBody from "./components/MainPage/MainPageBody";
import MainPageNavbar from "./components/MainPage/MainPageNavbar";
import NewWord from "./components/Word/Word";
import AllWords from "./components/AllWords/AllWords";
import MyWords from "./components/MyWords/MyWords"; // Import MyWords component
import Login from "./components/User/Login";
import Register from "./components/User/Register"; // Assuming you have a Register component

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
            <Route
              path="/words/:word"
              element={
                <div className="flex items-center justify-center">
                  <NewWord />
                </div>
              }
            />
            <Route path="/allwords" element={<AllWords />} />
            <Route path="/mywords" element={<MyWords />} />{" "}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <MainPageFooter />
      </div>
    </Router>
  );
}

export default App;
