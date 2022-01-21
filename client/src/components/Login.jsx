import {Link} from 'react-router-dom';


function Login() {
  return (
    <div>
      <h1>Login</h1>
      <Link to="/dashboard">
        <button className='btn btn-primary m-2'>Dashboard</button>
      </Link>
      <Link to="/">
        <button className='btn btn-primary m-2'>Register</button>
      </Link>

    </div>
  );
}

export default Login;
