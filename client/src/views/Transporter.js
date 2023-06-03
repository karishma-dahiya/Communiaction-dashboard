import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';

const Transporter = () => {

  const [userId, setuserId] = useState('');
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [prices, setPrices] = useState({});
  const [updatedOrders, setUpdatedOrders] = useState({});

  useEffect(() => {
    fetchId();
    fetchOrders(userId);
  }, [userId]);
  
  const fetchId = () => {
    const search = new URLSearchParams(window.location.search);
    const id = search.get('id');
    setuserId(id);
  };

  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/transporter/${userId}`);
      const orders = res.data;
      setOrders(orders);
      
    } catch (error) {
      console.log(error);
    }
  };

const handlePriceChange = (orderId, price) => {
  setPrices((prevPrices) => ({
    ...prevPrices,
    [orderId]: price
  }));
};

  const handleSubmit = async (id,price) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/orders/${id}`,{prices});
      console.log(res.data);
      setUpdatedOrders((prevUpdatedOrders) => ({
          ...prevUpdatedOrders,
          [id]: true,
      }));
      
    } catch (error) {
      console.log(error);
    }
  }

  const filteredOrders = search ? orders.filter((ord) =>
        ord.orderId.toLowerCase().includes(search.toLowerCase()) ||
        ord.to.toLowerCase().includes(search.toLowerCase()) ||
        ord.from.toLowerCase().includes(search.toLowerCase())
    ) : orders;

  return (
    <div>
      <Navbar />
      <div className=' my-5 mx-5 flex w-[600px] flex-col  justify-between border shadow-xl gap-4 self-center '>
        <h1 className='text-3xl py-3 font-bold text-center tracking-[2px] '>ORDERS</h1>
          <div className='flex justify-center'>
              <input
                  className='w-[500px] h-[60px] rounded-lg border border-light-gray text-center font-semibold'
                  type='text'
                  placeholder='Search by OrderId, to and from'
                  value={search}
                  onChange={(e)=>setSearch(e.target.value)}
              />
          </div>  
          <div className='mt-3 flex flex-wrap gap-x-10 h-[300px] overflow-y-auto px-10 gap-y-5'>
              
            {filteredOrders.length > 0 ? (
            filteredOrders.map((ord) => (
              <div
                className='w-[200px] bg-blue-300 p-2 rounded flex flex-col gap-2'
                key={ord._id}>
                <div className='font-semibold tracking-wide'>
                  <p> Order ID : {ord.orderId}</p>
                  <p>To: {ord.to}</p>
                  <p>From: {ord.from}</p>
                  <p>Quantity : { ord.qty}</p>
                </div>
                {updatedOrders[ord._id] ? (
          <p>Price: {ord.price}</p> // Display the updated price
        ) : (
          <form onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(ord._id, ord.price);
          }}>
            <label htmlFor={`price-${ord._id}`} className='font-semibold tracking-wide'>Price: </label>
            <input
              className='w-[100px]'
              id={`price-${ord._id}`}
              type='number'
              step='0.01'
              value={ord.price || ''}
              onChange={(e) => handlePriceChange(ord._id, e.target.value)}
            />
            <button className='px-3 py-1 text-white  bg-blue-600 rounded-xl ml-12 my-2' type='submit'>Send</button>
          </form>
        )}
                </div>
            ))
            ) : (
            <div>No orders found.</div>
        )}
        </div>
    </div>
      
    </div>
  )
}

export default Transporter;