const express = require('express');
const { User ,Order } = require('../models/schema');
const router = express.Router();
const bcrypt = require('bcrypt');


//Registration
router.post('/register', async (req, res) => {
    try {
        const { username, email, password, userType, address } = req.body;

        //check for existing email
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ error: 'Email already exists!!' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password:hashedPassword, userType, address });
        await newUser.save();
        res.status(200).json({ message: 'Registration successful!!' });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Failed to register' });
    }
});

//Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //console.log('Email:', email);
        //console.log('Password:', password);
        const user = await User.findOne({ email });
        //console.log('User:', user);
        if (!user) {
            return res.status(400).json({ error: 'Invalid email' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', userType : user.userType , userId: user._id });
        
    } catch (error) {
        res.status(500).json({ error:'Login failed!!'})
   }
});

//fetch transporters
router.get('/transporters', async (req, res) => {
    try {
        const transporters = await User.find({ userType: 'transporter' });
        if (transporters.length === 0) {
            return res.status(200).json({ message: 'No transporters found' });
        }
        res.status(200).json(transporters);
        
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error: 'Error Fetching transporters' });
   }
});

//fetch user's address
router.get('/user/:id/address', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        const address = user.address;
        res.status(200).json({address});
       
    } catch (error) {
       res.status(500).json({ error: 'Error Fetching address' }); 
   }
});

//Create order
router.post('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { orderId, to, from, qty, address, transporter } = req.body;
        const order = new Order({ orderId, to, from, qty, address, transporter,manufacturer:id });
        await order.save();
        res.status(200).json({ message: 'Order created successfully!!' });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ error: 'Error creating new order' });
   }
});

//Manufacturer orders
router.get('/orders/manufacturer/:manId', async (req, res) => {
    try {
        const { manId } = req.params;
        const orders = await Order.find({ manufacturer: manId })
            .populate('transporter').exec();
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch(error) {
        res.status(500).json({ error: 'Error fetching orders' });
   }
});


//Transporter orders

router.get('/orders/transporter/:trpId', async (req, res) => {
    try {
        const { trpId } = req.params;
        const orders = await Order.find({ transporter: trpId });
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found' });
        }
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching orders' });
    }
});

//Transporter Dashboard

router.put('/orders/:id', async (req, res) => {
    try {
        const { id } = req.params.id;
        const { price } = req.body;
        const orders = await Order.findByIdAndUpdate(id, { price,status:'accepted' });
        res.status(200).json({ message: 'Order updated' });
        
    } catch (error) {
        res.status(500).json({ error: 'Error sending order' });
    }
});







module.exports = router;