import React, { useState } from 'react';
import axios from 'axios';
// import { useHistory } from 'react-router-dom';
import "../pages.css"


const Index = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
  console.log(username,"userNames");
    try {
      const response = await axios.post('http://localhost:3000/login', {
        username,
        password,
      });
      const token = response.data.data.token;
      const userId = response.data.data.userId;
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);   
      window.location.href = '/MovieList';
    } catch (error) {
      console.log(error.response.data.message,"error==");
      setError(error.response.data.message);
      console.error('Error during login:', error);
    }
  };

  return (
    <div className='text-center text-white signMain '>
      <h1 className='my-5 loginHead'>
        Sign in
      </h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <input
            type="text"
            className="SignInput"
            placeholder="Email"
            defaultValue=""
            value={username} onChange={(e) => setUsername(e.target.value)}  
          />
        </div>

        <div className="mb-3">
          <input
            type="password"
            className="SignInput"
            placeholder="Password"
            defaultValue=""
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
          {/* <input type="password" class="SignInput" placeholder="Password" value="demo@123" autocomplete="current-password" /> */}

        </div>
        
        <div className="mb-3">
          <input
            type="text"
            // value={value}
            // checked={checked}
            className="SignInRadio"
            defaultValue=""
            style={{background:"#224957"}}
          />
          
          <span className='mx-2'>Remember me</span>
        </div>

        <button type="submit" className="text-white PageButton">
          Login
        </button>
      </form>
    </div>
  )
}

export default Index
