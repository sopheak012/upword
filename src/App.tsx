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
import MyWords from "./components/MyWords/MyWords";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import { useEffect } from "react";
import PrivateRoute from "./components/PrivateRoute";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./Redux/store";
import { setUser } from "./Redux/Slices/userSlice";

function App() {
  const dispatch = useDispatch();
  const isLoggedInFromState = useSelector(
    (state: RootState) => state.user.isLogin
  );

  useEffect(() => {
    // Synchronize the Redux state with local storage
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const loggedIn = !!user.isLogin;
    if (loggedIn !== isLoggedInFromState) {
      dispatch(
        setUser({
          id: user.id || "",
          email: user.email || "",
          isLogin: loggedIn,
        })
      );
    }
  }, [isLoggedInFromState, dispatch]);

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
                <PrivateRoute
                  element={<MyWords />}
                  isLoggedIn={isLoggedInFromState}
                />
              }
            />
            <Route
              path="/login"
              element={
                isLoggedInFromState ? (
                  <Navigate to="/wordoftheday" />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="/register"
              element={
                isLoggedInFromState ? (
                  <Navigate to="/wordoftheday" />
                ) : (
                  <Register />
                )
              }
            />
          </Routes>
        </main>
        <MainPageFooter />
      </div>
    </Router>
  );
}

export default App;
