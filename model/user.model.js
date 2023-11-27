import mongoose from 'mongoose';
import { v4 } from 'uuid';

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: v4,
    primaryKey: true,
  },
  name: {
    type: String,
    required: true,
  },
  email_address: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  login: {
    type: mongoose.Schema.Types.Mixed, // You can use Mixed for flexibility in storing various data types
    default: {
      login_count: 0,
      failed_attempts_count: 0,
      last_login_at: null,
      locked_out_till: null,
      last_failed_at: null,
    },
  },
  is_active: {
    type: Boolean,
    default: false,
  },
  is_verified: {
    type: Boolean,
    default: false,
  },
  cnic: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: String,
  },
  paypocket_id: {
    type: String,
    required: true,
    unique: true
  },
  walletId: {
    type: String,
    ref: 'Wallet'
  },
  batchId: {
    type: String,
    ref: 'Batch'
  }
});

const User = mongoose.model('User', userSchema);

export default User;
