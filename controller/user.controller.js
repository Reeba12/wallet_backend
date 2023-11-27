import User from '../model/user.model.js';

// Update a user
export const updateUser = async (req, res) => {
  try {
    await User.updateOne({ _id: req.params.userId }, { $set: req.body });
    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Error updating user' });
  }
};

// Get a user
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json({ user: user });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Error getting user' });
  }
};

// Get all users
export const getAllUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users: users });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({ message: 'Error getting users' });
  }
};

// Delete a user
export const deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.params.userId });
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Error deleting user' });
  }
};
