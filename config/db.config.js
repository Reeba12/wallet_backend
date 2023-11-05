// config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

export { sequelize };
