import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
console.log('process.env.Mognodb_url = ', process.env.MONGODB_URL);
const DBConnect = async () => {
  try {
    const connect = await mongoose.connect('mongodb+srv://unza123:mollify@cluster0.dietyht.mongodb.net/wallet');
    console.log("Connected successfully!");
    return connect;
  } catch (err) {
    console.log("Connection failed!", err);
  }
};

export default DBConnect;
