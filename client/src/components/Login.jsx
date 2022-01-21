import {Link} from 'react-router-dom';
import {useState} from 'react';


function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  //const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password
    }
    console.log(user);
  };
  return (
    <div>
      <h1 className='text-center'>Login</h1>
      <form onSubmit={handleSubmit}>
        <input className='form-control my-3' value={email} type="email" placeholder="email" onChange={(e)=>setEmail(e.target.value)} />
        <input className='form-control my-3' value={password} type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)} />
        <button className='btn btn-success block' type="submit">Login</button>
      </form>



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
