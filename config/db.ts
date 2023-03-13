const mongoose = require('mongoose');

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

const connectDB = async () => {
    try{
        // const conn = await mongoose.connect(process.env.MONGO_URI);
        // console.log(`Connected to MogoDB at: ${conn.connection.host}`);

        const connString = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
        const conn = await mongoose.connect(connString); // process.env.MONGO_URI
        console.log(`Connected to MogoDB on: ${DB_PORT}`);
    }
    catch(err){
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectDB;