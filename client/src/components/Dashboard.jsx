import { Link } from "react-router-dom";

function Dashboard({ setAuth }) {
  const handleLogout = (e) => {
    e.preventDefault();
    setAuth(false);
  };

  return (
    <div>
      <h1>Dashboard</h1>
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
