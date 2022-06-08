import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite'
});