// controllers/UserController.js

import User from '../model/user.model.js';

export const updateUser = async (req, res) => {
  try{
    await User.update(req.body, {
      where: { id: req.params.userId },
    });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

export const getUser = async (req, res) => {
  // Logic to get a user
  try {
    const user = await User.findOne({ where: { id: req.params.userId } });
    res.status(200).json({ user: user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Error getting user' });
  }
};

export const getAllUser = async (req, res) => {
  // Logic to get all users
  try {
    const users = await User.findAll();
    res.status(200).json({ users: users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users' });
  }
}

export const deleteUser = async (req, res) => {
  // Logic to delete a user
  try {
    await User.destroy({ where: { id: req.params.userId } });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
}