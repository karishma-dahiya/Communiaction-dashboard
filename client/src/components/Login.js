import axios from 'axios';
import React, { useState } from 'react';


const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password
      });
      if (response.status === 400) {
        setError('Invalid email or password');
        window.location.reload();
      }

      const { message, userType, userId } = response.data;
      console.log(message);
      console.log(userType);
      userType === 'transporter'
        ? (window.location.href = `/transporter?id=${userId}`)
        : (window.location.href = `/manufacturer?id=${userId}`);

    } catch (error) {
      console.log(error);
      setError('Failed to login');
      window.location.reload();
  }
  }

  return (
    <div >
      {error && <p className=' text-red-600 font-semibold'>{error}</p>}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 text-light-gray '>
        <div className='flex flex-col gap-1'>
          <label className='' htmlFor='email'>Email</label>
          <input
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
            type='email'
            id='email'
            required
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder='Enter your email address'
          />  
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input 
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
            id='password'
            type='password'
            required
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            placeholder='Enter your password'
          />  
        </div>
        <button
          type='submit'
          className='text-white bg-light-blue w-[400px] rounded-xl h-[45px] font-semibold text-lg'
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login