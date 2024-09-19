import { Service } from '../db/models/index.js';

const getServices = async (data) => {
    console.log(data);
    let services;
    let response = {
        status: 'OK',
        message: '',
        data: '',
    };

    try {
        services = await Service.findAll({
            where: {
                identification: data.identification
            },
        });
        response.data = services;
    } catch(error) {
        response.status = 'FAIL';
        response.message = 'Error: '+error;
    }

return response;
};

const getServiceById = async (data)=> {
    let service;
    let response = {
        status: 'OK',
        message: '',
        data: '',
    };
    try {
        service = await Service.findAll({
            where: {
                identification: data.identification,
                service: data.service
            },
        });

        response.data = service;
    } catch(error) {
        response.status = 'FAIL';
        response.message = 'Error: '+error;
    }

    return response;
}

const saveService = async (data)=> {
    console.log(data);
    let response = {
        status: 'OK',
        message: ''
    };
    try {
        await Service.create(data);
    } catch(error) {
        response.status = 'FAIL';
        console.log(error);
        if(error?.name?.SequelizeUniqueConstraintError !== undefined) {
            response.message = 'Error: El cliente ya tiene este servicio';
        } else {
            response.message = 'Error: '+error;
        }
    }
    return response;
}

const updateService = async (data)=> {
    console.log(data);
    let response = {
        status: 'OK',
        message: ''
    };
    try {
        await Service.update(data, {
            where: {
                identification: data.identification,
                service: data.service
            },
        });
    } catch(error) {
        response.status = 'FAIL';

        if(error.includes('SequelizeUniqueConstraintError')) {
            response.message = 'Error: El cliente ya tiene este servicio';
        } else {
            response.message = 'Error: '+error;
        }        
    }
    return response;
}

export { getServices, getServiceById, saveService, updateService }