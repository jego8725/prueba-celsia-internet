import { Client } from '../db/models/index.js';

const getClients = async () => {
    let clients;
    let response = {
        status: 'OK',
        message: '',
        data: '',
    };

    try {
        clients = await Client.findAll();
        response.data = clients;
    } catch(error) {
        response.status = 'FAIL';
        response.message = 'Error: '+error;
    }

return response;
};

const getClientById = async (data)=> {
    let client;
    let response = {
        status: 'OK',
        message: '',
        data: '',
    };
    try {
        client = await Client.findAll({
            where: {
            identification: data.identification,
            },
        });

        response.data = client;
    } catch(error) {
        response.status = 'FAIL';
        response.message = 'Error: '+error;
    }

    return response;
}

const saveClient = async (data)=> {
    console.log(data);
    let response = {
        status: 'OK',
        message: ''
    };
    try {
        await Client.create(data);
    } catch(error) {
        response.status = 'FAIL';
        if(error.includes('SequelizeUniqueConstraintError')) {
            response.message = 'Error: El cliente ya existe';
        } else {
            response.message = 'Error: '+error;
        }
    }
    return response;
}

const updateClient = async (data)=> {
    console.log(data);
    let response = {
        status: 'OK',
        message: ''
    };
    try {
        await Client.update(data, {
            where: {
                identification: data.identification,
            },
        });
    } catch(error) {
        response.status = 'FAIL';
        if(error.includes('SequelizeUniqueConstraintError')) {
            response.message = 'Error: El cliente ya existe';
        } else {
            response.message = 'Error: '+error;
        }
    }
    return response;
}

export { getClients, getClientById, saveClient, updateClient }