
const { Sequelize } = require('sequelize');
require('dotenv').config();

const db = new Sequelize(
    process.env.DATABASE_URL ||
        `postgres://${process.env.DB_USERNAME}:${process.env.DATABASE_PWD}@localhost/messenger`,
    {
        logging: false,
    },
);

module.exports = db;
