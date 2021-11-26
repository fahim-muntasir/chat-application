const mongoose = require('mongoose');

const connectDB = () =>{
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => console.log('database connection successfull'))
    .catch((err) => console.log(err));
}

module.exports = connectDB;