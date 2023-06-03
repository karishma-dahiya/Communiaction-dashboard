import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <div className='w-full h-[90px] px-6 py-2 shadow-lg bg-slate-200'>
          <ul className='flex justify-between px-10 py-2'>
              <li>LOGO</li>
              <Link to='/'>
                  <button className='w-[100px] bg-light-blue text-white h-[40px] rounded-3xl font-semibold focus:ring hover:bg-blue-600 focus:outline-none '>Logout</button>
              </Link>
          </ul>
    </div>
  )
}

export default Navbar