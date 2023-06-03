import React from 'react';
import { Link } from 'react-router-dom';
import Register from '../components/Register';

const SignupPage = () => {
  return (
    <div className='flex items-center'>
        <div className='justify-center flex-1 h-screen bg-contain bg-signup'>
      </div>
      <div className='flex justify-center flex-1 ' >
        <div className=''>
          <h1 className='mb-5 text-3xl font-bold text-center'>Create an account</h1>
          <div>
            <Register/>
            <div className='mt-4 text-center'>
              <span className='font-semibold text-light-gray'>Already Have An Account ? </span>
              <Link to='/login' className='font-semibold text-light-blue' >Log In</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupPage