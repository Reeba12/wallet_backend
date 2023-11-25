const bcrypt = require('bcrypt');
import { validationResult } from 'express-validator'
import User from '../model/user.model'
import jwt from 'jsonwebtoken';
const saltRounds = 10; // The number of salt rounds for bcrypt

export const signup = async (req, res) => {
  // Validation using express-validator
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const {
      name,
      email_address,
      password,
      cnic,
      mobile_number,
      address,
      date_of_birth,
    } = req.body;

    // Check if the email address is already registered
    const existingUser = await User.findOne({ where: { email_address } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password using bcrypt before saving to the database
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    const newUser = await User.create({
      name,
      email_address,
      password: hashedPassword,
      cnic,
      mobile_number,
      address,
      date_of_birth,
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
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
    const user = await User.findOne({ where: { email_address } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token for authentication
    const token = jwt.sign({ userId: user.id }, 'abc', { expiresIn: '1h' });

    res.status(200).json({
      token: token,
      email_address: user.email_address,
      name: user.name,
      id: user.id,
      address: user.address,
      phone_number: user.mobile_number,
      is_active: user.is_active,
      cnic: user.cnic,
      date_of_birth: user.date_of_birth,
      login: user.login
    });
  } catch (error) {
    console.error('Login error: ' + error);
    res.status(500).json({ error: 'Login failed' });
  }
};
