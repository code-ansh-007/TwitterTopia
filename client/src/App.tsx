import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import axios from "axios";

function App() {
  axios.defaults.withCredentials = true;
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute auth={false}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/signin"
            element={
              <ProtectedRoute auth={false}>
                <SignIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/signup"
            element={
              <ProtectedRoute auth={false}>
                <SignUp />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user/profile"
            element={
              <ProtectedRoute auth={true}>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
