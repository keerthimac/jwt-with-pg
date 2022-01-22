import { useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // setIsAuthenticated is a function that takes a boolean value

  const setAuth = (bool) => {
    setIsAuthenticated(bool);
  };

  return (
    <Router>
      <div className='container'>
        {/* https://www.youtube.com/watch?v=rGmJYIUwxdo&ab_channel=FullstackSimplified */}
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
                  <Login setIsAuthenticated={setIsAuthenticated} />
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
                  <Register setIsAuthenticated={setIsAuthenticated} />
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
