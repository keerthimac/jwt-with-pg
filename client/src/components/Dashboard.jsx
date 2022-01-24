import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function Dashboard({ setAuth }) {
  const [user, setUser] = useState("");

  const handleLogout = (e) => {
    e.preventDefault();
    toast.success("Logged out successfully");
    setAuth(false);
    localStorage.removeItem("token");
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await fetch("/dashboard", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });
      const data = await response.json();
      setUser(data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>
        Welcome! {user.user_first_name} {user.user_last_name}
      </h2>
      <Link to='/login'>
        <button onClick={handleLogout} className='btn btn-primary m-2'>
          Log out
        </button>
      </Link>
      {/* <Link to="/">
        <button className='btn btn-primary m-2'>Register</button>
      </Link> */}
    </div>
  );
}

export default Dashboard;
