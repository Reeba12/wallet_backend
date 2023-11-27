import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import { generateOTP } from '../utils/helperFunctions.js';
import { Vonage } from '@vonage/server-sdk';
import User from '../model/userMongo.model.js';

const otpMap = {};
const saltRounds = 10;

export const signup = async (req, res) => {
  // Validation using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { name, email_address, password, cnic, paypocket_id } = req.body;

    // Check if the email address is already registered
    const existingUser = await User.findOne({ email_address });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password using bcrypt before saving to the database
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      name,
      email_address,
      password: hashedPassword,
      cnic,
      paypocket_id,
    });

    const token = jwt.sign({ userId: newUser._id }, 'abc', { expiresIn: '1h' });
    res.status(201).json({
      message: 'User created successfully',
      user: {
        name: newUser.name,
        email_address: newUser.email_address,
        cnic: newUser.cnic,
        paypocket_id: newUser.paypocket_id,
        id: newUser._id,
        phone_number: newUser.mobile_number,
        is_active: newUser.is_active,
        login: newUser.login,
        is_verified: newUser.is_verified,
        token,
      },
    });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
};

export const login = async (req, res) => {
  // Validation using express-validator (if needed)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email_address, password } = req.body;

    // Check if user exists with the given email
    const user = await User.findOne({ email_address });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user._id }, 'abc', { expiresIn: '1h' });

    res.status(200).json({
      token,
      email_address: user.email_address,
      name: user.name,
      id: user._id,
      address: user.address,
      phone_number: user.mobile_number,
      is_active: user.is_active,
      cnic: user.cnic,
      date_of_birth: user.date_of_birth,
      login: user.login,
    });
  } catch (error) {
    console.error('Login error: ' + error);
    res.status(500).json({ error: 'Login failed' });
  }
};

export const sendOTPviaSMS = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const OTP = generateOTP();
    const vonage = new Vonage({
      apiKey: '96af7af7', // Replace with your Vonage API key
      apiSecret: 'GgZRq5TjxOfOM4Y7', // Replace with your Vonage API secret
    });

    const from = 'Vonage APIs'; // Replace with your desired sender name
    const to = phoneNumber; // Replace with the actual phone number
    const text = `Your OTP is ${OTP}. Please enter it on the verification page to proceed.`;

    await vonage.message.sendSms(from, to, text, (err, responseData) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error sending SMS' });
      }
      res.status(200).json({ message: 'OTP sent successfully' });
      otpMap[phoneNumber] = { code: OTP, expiresAt: Date.now() + 300000 }; // Expires in 5 minutes (300,000 milliseconds)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { userId, phoneNumber, OTP } = req.body;

    const storedOTP = otpMap[phoneNumber];

    if (!storedOTP || storedOTP.expiresAt < Date.now()) {
      return res.status(404).json({ message: 'OTP not found or expired' });
    }

    if (OTP === storedOTP.code) {
      delete otpMap[phoneNumber]; // Remove OTP after successful verification
      const user = await User.findByIdAndUpdate(userId, { is_verified: true, mobile_number: phoneNumber }, { new: true });

      if (user) {
        return res.status(200).json({
          is_verified: user.is_verified,
          message: 'OTP verified successfully',
        });
      }
    } else {
      return res.status(400).json({ message: 'Incorrect OTP' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
