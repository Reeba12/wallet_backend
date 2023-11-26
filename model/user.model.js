// models/User.js
import { DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../config/db.config.js";
import Batch from "./batch.model.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.UUID,
    defaultValue: () => uuidv4(),
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email_address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  login: {
    type: DataTypes.TEXT,
    allowNull: true,
    defaultValue: {
      login_count: 0,
      failed_attempts_count: 0,
      last_login_at: null,
      locked_out_till: null,
      last_failed_at: null,
    },
  },
//   -------- reeba's code ----------------
  // login: {
  //     type: DataTypes.JSON,
  //     allowNull: true,
  //     defaultValue: {
  //         login_count: 0,
  //         failed_attempts_count: 0,
  //         last_login_at: null,
  //         locked_out_till: null,
  //         last_failed_at: null,
  //     },
  // },
//   ------------------------
  // Change this line in your User model definition
 
  // login: {
  //     type: DataTypes.TEXT,
  //     allowNull: true,
  //     defaultValue: null, // or your default object
  // },

  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  is_verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  cnic: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mobile_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  paypocket_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// User.belongsToMany(Batch, {
//     through: 'BatchUser', // Same join table 'BatchUser'
//     as: 'Batches', // Alias for the association
// });

sequelize
  .sync({ force: true })
  .then(() => {
    console.log("User table created successfully!");
  })
  .catch((error) => {
    console.error("Unable to create table:", error);
  });

export default User;
