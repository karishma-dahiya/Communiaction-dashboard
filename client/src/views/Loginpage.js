import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../components/Login'

const Loginpage = () => {
  return (
      <div className='flex items-center justify-center w-full h-screen bg-cover bg-signup' >
          <div className='bg-white w-[650px] h-1/2 rounded'>
        <div className='flex flex-col items-center justify-center'>
          <h1 className='my-5 text-3xl font-bold text-center'>Login</h1>
          <Login/>
          <div className='mt-4 text-center'>
              <span className='font-semibold text-light-gray'>Don't Have An Account ? </span>
              <Link to='/' className='font-semibold text-light-blue' >Sign Up</Link>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Loginpage