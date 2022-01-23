import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // setIsAuthenticated is a function that takes a boolean value
  const [error, setError] = useState({});

  useEffect(() => {
    verifyToken();
  }, []);

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  const verifyToken = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const res = await fetch("/auth/verify", {
          method: "GET",
          headers: {
            token: localStorage.token,
          },
        });
        const data = await res.json();
        if (data.error) {
          setError(data.error);
        } else {
          setIsAuthenticated(data);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsAuthenticated(false);
    }
  };

  const registerUser = async (user) => {
    try {
      const bodyData = JSON.stringify(user);
      console.log(bodyData);
      const response = await fetch("/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data.token);
        toast.success("Registration Successful");
        window.localStorage.setItem("token", data.token);
        setAuth(true);
      } else {
        setError(data);
        toast.error(error);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const loginUser = async (user) => {
    // user is an object
    try {
      const bodyData = JSON.stringify(user);
      console.log(bodyData);
      const response = await fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      if (response.status === 200) {
        toast.success("Login Successful");
        console.log(data.token);
        window.localStorage.setItem("token", data.token);
        setAuth(true);
      } else {
        setError(data);
        toast.error(data);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Router>
      <div className='container'>
        <ToastContainer theme='colored' autoClose={2000} />
        <Routes>
          {/* if isAuthenticated true then navigate to dashboard  */}
          <Route
            exact
            path='/login'
            element={
              <>
                {isAuthenticated ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <Login
                    setIsAuthenticated={setIsAuthenticated}
                    loginUser={loginUser}
                  />
                )}
              </>
            }
          />
          <Route
            exact
            path='/register'
            element={
              <>
                {isAuthenticated ? (
                  <Navigate to='/dashboard' />
                ) : (
                  <Register
                    setIsAuthenticated={setIsAuthenticated}
                    registerUser={registerUser}
                  />
                )}
              </>
            }
          />
          <Route
            exact
            path='/dashboard'
            element={
              <>
                {isAuthenticated ? (
                  <Dashboard setAuth={setAuth} />
                ) : (
                  <Navigate to='/login' />
                )}
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
