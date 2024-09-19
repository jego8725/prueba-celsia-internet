import { Sequelize } from 'sequelize';

const urlConnect = process.env.URI_BD;
const connection = new Sequelize(urlConnect, {
    logging: process.env.ISLOGGIN === 1,
    timezone: '-05:00'
});

export {connection};