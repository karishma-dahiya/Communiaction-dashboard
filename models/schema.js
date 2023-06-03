const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  userType: {
        type: String,
        enum: ['manufacturer', 'transporter'],
        required: true
    },
  address: { type: String, required: true },
  orders: {
     type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
   }
});

const orderSchema = new mongoose.Schema({
  orderId: {type: String, unique:true, required:true},
  to: {
    type: String,
  },
  from: {
    type: String,
  },
  qty: {
    type: Number,
    enum: [1, 2, 3],
  },
  address: {
    type: String,
  },
  price:{type:Number},
  transporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted'],
    default:'pending',
  },
  manufacturer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});




const User = mongoose.model('User', userSchema);
const Order = mongoose.model('Order', orderSchema);


module.exports = { User, Order }