import { Link } from "react-router-dom";
import { useState } from "react";

function Register({registerUser}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name:firstName,
      email,
      password,
    };
    registerUser(user);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div>
      <h1 className='text-center'>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          className='form-control my-3'
          value={firstName}
          type='name'
          placeholder='First Name'
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          required
          className='form-control my-3'
          value={lastName}
          type='name'
          placeholder='Last Name'
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          required
          className='form-control my-3'
          value={email}
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          className='form-control my-3'
          value={password}
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className='d-grid gap-2'>
          <button className='btn btn-success' type='submit'>
            Register
          </button>
        </div>
      </form>
      <Link className="d-grid gap-2" to="/login">
        <button className='btn btn-primary mt-2'>Back to Login</button>
      </Link>


      {/* <Link to="/login">
        <button className='btn btn-primary m-2'>Login</button>
      </Link> */}
    </div>
  );
}

export default Register;
