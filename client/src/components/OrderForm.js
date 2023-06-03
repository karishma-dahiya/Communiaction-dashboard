import axios from 'axios';
import React, { useEffect, useState,useRef } from 'react'
import { v4 as uuid } from 'uuid';

const OrderForm = ({ userId }) => {
    const [orderId, setOrderId] = useState('');
    const [to, setTo] = useState('');
    const [from, setFrom] = useState('');
    const [qty, setQty] = useState('');
    const [address, setAddress] = useState('');
    const [transporter, setTransporter] = useState('');
    const [transporters, setTransporters] = useState([]);
    const [error, setError] = useState('');

    
    
     useEffect(() => {
         fetchTransporters();
         generateOrderId();
         fetchAddress(userId);
    }, [userId]);

    //fetch transporters
    const fetchTransporters = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/transporters');
            setTransporters(res.data);

        } catch (error) {
            console.log(error);
        }
    };
     
    //generate orderId
    const generateOrderId = async () => {
        const orderId = uuid().toUpperCase().substr(0, 5);
        setOrderId(orderId);
    };   

    //fetch maufacturer's address
    const fetchAddress = async (userId) => {
        console.log(userId);
        try {
            const res = await axios.get(`http://localhost:5000/api/user/${userId}/address`);
            const { address } = res.data;
            setAddress(address);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:5000/api/orders/${userId}`, {
                orderId, to, from, qty, address, transporter
            });
            console.log(res.data);
            generateOrderId();
            setTo('');
            setFrom('');
            setQty('');
            setTransporter('');
            window.location.reload();
        } catch (error) {
            console.log(error);
            setError(error);
        }
    }


    return (
        <div className='flex ml-10 px-4 w-1/3 border flex-col shadow-xl py-5 '>
            <h1 className='mb-5 text-3xl font-bold text-center'>Create a new order</h1>
            <form 
                onSubmit={handleSubmit}
                className='flex flex-col gap-4 text-light-gray font-semibold items-center '>
                <div className='flex gap-1'>
                    <label className='w-[100px]' htmlFor='id'>Order-Id :</label>
                    <input
                        className='w-[250px] h-[40px] border-form-border border rounded-md px-3'
                        id='id'
                        type='text'
                        value={orderId}
                        readOnly
                    />
                </div>
                <div className='flex gap-1'>
                    <label className='w-[100px]' htmlFor='to'>To :</label>
                    <input
                        className='w-[250px] h-[40px] border-form-border border rounded-md px-3'
                        id='to'
                        type='text'
                        required
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <div className='flex gap-1'>
                    <label className='w-[100px]' htmlFor='from'>From :</label>
                    <input
                        className='w-[250px] h-[40px] border-form-border border rounded-md px-3'
                        id='from'
                        type='text'
                        required
                        value={from}
                        onChange={(e) => setFrom(e.target.value)}
                    />
                </div>
                <div className='flex gap-1'>
                    <label className='w-[100px]' htmlFor='quantity'>Quantity :</label>
                    <select
                        className='w-[250px] h-[40px] border-form-border border rounded-md px-3'
                        id='quantity'
                        value={qty}
                        required
                        onChange={(e) => setQty(e.target.value)}
                    >
                        <option value=''>0</option>
                        <option value='1'>1 ton</option>
                        <option value='2'>2 ton</option>
                        <option value='3'>3 ton</option>
                    </select>
                </div>
                <div className='flex gap-1'>
                    <label className='w-[100px]' htmlFor='address'>Address :</label>
                    <input
                        className='w-[250px] h-[40px] border-form-border border rounded-md px-3'
                        id='address'
                        type='text'
                        value={address}
                        readOnly
                    />
                </div>
                <div className='flex gap-1'>
                    <label className='w-[100px]' htmlFor='transporter'>Transporter :</label>
                    <select
                        className='w-[250px] h-[40px] border-form-border border rounded-md px-3'
                        id='transporter'
                        value={transporter}
                        required
                        onChange={(e) => setTransporter(e.target.value)}
                    >
                        <option value=''>Select Transporter</option>
                        {transporters.map((trp) => (
                            <option key={trp._id} value={trp._id}>{trp.username}</option>
                        ))}
                    </select>
                </div>
                <div className='flex justify-center'>
                  
                    <button
                        type='submit'
                        className='text-white bg-light-blue w-[200px] rounded-xl h-[45px] font-semibold text-lg'
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OrderForm