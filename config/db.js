const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.URL;

const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true
        });
        console.log("Connected to db");
    } catch (err) {
        console.log('Database Connection failed!!');
        
    }

}
module.exports = connectDB;