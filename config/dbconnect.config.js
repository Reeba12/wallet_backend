import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log('process.env.Mognodb_url = ', process.env.MONGODB_URL);
const DBConnect = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected successfully!");
    return connect;
  } catch (err) {
    throw new Error("Database Error");
  }
};

export default DBConnect;
