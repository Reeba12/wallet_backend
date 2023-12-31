// config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();
console.log(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASSWORD,
  process.env.HOST
);

// consolepen.log(process.env.DATABASE, process.env.USER, process.env.PASSWORD)
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
    dialectModule: await import('mysql2'), // Use `await import` for dynamic import
    benchmark: true,
    logging: console.log,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
export { sequelize };
