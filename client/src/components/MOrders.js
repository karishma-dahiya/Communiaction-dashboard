import axios from 'axios';
import React, { useEffect, useState } from 'react'

const MOrders = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedOrder, setSelectedOrder] = useState('');
    
    useEffect(() => {
        fetchOrders(userId);
    }, [userId]);
    
  const fetchOrders = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/orders/manufacturer/${userId}`, {
        
      });
        const orders = res.data;
        console.log(orders);
      setOrders(orders);
    } catch (error) {
      console.log(error);
    }
  };

    const filteredOrders = search ? orders.filter((ord) =>
        ord.orderId.toLowerCase().includes(search.toLowerCase()) ||
        ord.to.toLowerCase().includes(search.toLowerCase()) ||
        ord.from.toLowerCase().includes(search.toLowerCase())
    ) : orders;
 
  return (
      <div className=' flex w-[600px] flex-col  justify-between border shadow-xl '>
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
          <div className='flex flex-wrap gap-x-10 h-[300px] overflow-y-auto px-5 justify-center gap-y-10'>
              
            {filteredOrders.length > 0 ? (
            filteredOrders.map((ord) => (
                <div key={ord._id}>
                    <div
                        className={`h-[50px] w-[200px] font-semibold bg-blue-300 text-center text-lg tracking-wider cursor-pointer py-2  ${
                        selectedOrder === ord._id ? 'bg-blue-500' : ''
                        }`}
                        onClick={() =>
                        setSelectedOrder((prevId) =>
                        prevId === ord._id ? null : ord._id
                        )
                        }
                    >
                    {ord.orderId}
                </div>
                {selectedOrder === ord._id && (
                    <div className='bg-blue-500 p-2 font-semibold text-lg tracking-wider text-center'>
                    <p>To: {ord.to}</p>
                    <p>From: {ord.from}</p>
                    <p>Quantity: {ord.qty}</p>
            
                    </div>
                )}
            </div>
            ))
            ) : (
            <div>No orders found.</div>
        )}
        </div>
    </div>
  )
}

export default MOrders