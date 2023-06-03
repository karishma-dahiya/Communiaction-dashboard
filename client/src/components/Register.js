import React ,{ useState } from 'react'
import axios from 'axios';

const Register = () => {
  
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [userType, setType] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username, email, password, userType, address
      });
      if (response.status === 200) {
        console.log('Registration successful');
        window.location.href = '/login';
      } 
    } catch (error) {
      console.log(error);
      setErrorMessage('Failed to register');
      window.location.reload();
    }
   
  }
    
    
  return (
    <div>
      {errorMessage && <p className=' text-red-600 font-semibold'>{errorMessage}</p>}
      <form
        onSubmit={handleSubmit}
        className='flex flex-col gap-4 text-light-gray ' >
        <div className='flex flex-col gap-1'>
          <label htmlFor='username'>Username</label>
          <input
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
            type='text'
            id='username'
            required
            placeholder='Enter your name'
            value={username}
            onChange={ (e)=> setName(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='username'>Email</label>
          <input
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
            type='email'
            id='email'
            required
            placeholder='Enter your email address'
            value={email}
            onChange={ (e)=> setEmail(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='password'>Password</label>
          <input
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
            type='password'
            id='password'
            required
            placeholder='Create a password'
            value={password}
            onChange={ (e)=> setPassword(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <label htmlFor='address'>Address</label>
          <input
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
            type='text'
            id='address'
            required
            placeholder='Enter your address'
            value={address}
            onChange={ (e)=> setAddress(e.target.value)}
          />
        </div>
        <div className='flex flex-col gap-1'>
          <select
            id='type'
            value={userType}
            onChange={ (e)=> setType(e.target.value)}
            className='w-[400px] h-[48px] border-form-border border rounded-md px-3'
          >
            <option value="">User-type</option>
            <option value='manufacturer'> Manufacturer</option>
            <option value='transporter'>Transporter</option>
          </select>
        </div>
        <div>
          <button type='submit' className='text-white bg-light-blue w-[400px] rounded-xl h-[45px] font-semibold text-lg'>            
            Create account</button>
        </div>
      </form>
           
    </div>
  )
}

export default Register