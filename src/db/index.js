import { connection } from './config.js';
import { Client, Service } from './models/index.js';

export const initializeDatabase = async () => {
    try {
        await connection.authenticate()
        await Client.sync({})
        await Service.sync({})

        console.log('Connection has been established and models synced successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
};