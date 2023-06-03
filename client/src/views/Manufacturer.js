import React, { useEffect, useState } from 'react'
import MOrders from '../components/MOrders';
import Navbar from '../components/Navbar';
import OrderForm from '../components/OrderForm';


const Manufacturer = () => {
  const [userId, setuserId] = useState('');

  useEffect(() => {
    fetchId();
  }, []);

  const fetchId = () => {
    const search = new URLSearchParams(window.location.search);
    const id = search.get('id');
    setuserId(id);
  }

  return (
    <div className='flex flex-col gap-4'>
      <Navbar />
      <div className='flex justify-around'>

      <OrderForm userId={userId} />
      <MOrders userId={userId} />
      </div>
      
    </div>
  )
}

export default Manufacturer;