import { Link } from "react-router-dom";
import { useState } from "react";

function Login({ loginUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    console.log(user);
    loginUser(user);
  };
  return (
    <div>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          className='form-control my-3'
          value={email}
          type='email'
          placeholder='email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className='form-control my-3'
          value={password}
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='d-grid gap-2'>
          <button className='btn btn-success' type='submit'>
            Login
          </button>
        </div>
      </form>
      <Link className='d-grid gap-2' to='/register'>
        <button className='btn btn-primary mt-2'>Register</button>
      </Link>

      {/* <Link to="/dashboard">
        <button className='btn btn-primary m-2'>Dashboard</button>
      </Link>
      <Link to="/">
        <button className='btn btn-primary m-2'>Register</button>
      </Link> */}
    </div>
  );
}

export default Login;
