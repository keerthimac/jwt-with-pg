import {Link} from 'react-router-dom';

function Register() {
  return (
    <div>
      <h1>Register</h1>
      <Link to="/login">
        <button className='btn btn-primary m-2'>Login</button>
      </Link>
      {/* <Link to="/dashboard">
        <button className='btn btn-primary m-2'>Dashboard</button>
      </Link> */}
    </div>
  );
}

export default Register;
