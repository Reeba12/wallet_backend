// config/database.js
import { Sequelize } from 'sequelize';
console.log(process.env.DB, process.env.USER, process.env.PASSWORD)
const sequelize = new Sequelize('wallet', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
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
