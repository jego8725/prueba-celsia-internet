import { DataTypes } from 'sequelize';
import { Client } from './client.js';
import { connection } from '../config.js';

const Service = connection.define('service', {
    service: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    initDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
    },
    lastFacturer: {
        type: DataTypes.DATE,
        allowNull: false
    },
    lastPay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    identification: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: Client,
            key: 'identification',
        },
    },
}, {
  tableName: 'service'
});

export { Service };