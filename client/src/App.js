import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // setIsAuthenticated is a function that takes a boolean value

  return (
    <Router>
      <div className="container">
        {/* https://www.youtube.com/watch?v=rGmJYIUwxdo&ab_channel=FullstackSimplified */}
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
