const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB is connected');
    }
    catch(err){
        console.log('Error connecting MongoDb',err.message);
        process.exit(1);
    }
}

module.exports= connectDB;