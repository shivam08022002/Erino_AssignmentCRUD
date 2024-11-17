const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        // Set Mongoose strictQuery option
        mongoose.set('strictQuery', true); // Use true or false based on your preference
        
        // Connect to MongoDB
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`Mongodb Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDb;
