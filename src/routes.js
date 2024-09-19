import express from 'express';
import path from "path";
import { 
    getClients, saveClient, updateClient, getClientById,
    getServices, getServiceById, saveService, updateService
} from './services/index.js';

const listRoutes = express.Router();
const __dirname = path.resolve();

/** Rutas estaticas **/
listRoutes.use(express.static(path.join(__dirname, 'public')));

listRoutes.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

listRoutes.get('/client', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/client/createClient.html'));
});

listRoutes.get('/client/:id', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/client/createClient.html'));
});

listRoutes.get('/service', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/service/createService.html'));
});

listRoutes.get('/service/:id', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/service/createService.html'));
});

listRoutes.get('/service/:id/:service', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/service/createService.html'));
});

listRoutes.get('/getServices', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/service/listService.html'));
});

listRoutes.get('/getServices/:id', (req, res)=> {
    res.sendFile(path.join(__dirname, 'public', 'pages/service/listService.html'));
});

/** Api de servicios POST **/

listRoutes.post('/getClients', async (req, res)=> {
    const result = await getClients();
    res.json(result);
});

listRoutes.post('/getClientById', async (req, res)=> {
    const result = await getClientById(req.body);
    res.json(result);
});

listRoutes.post('/saveClient', async (req, res)=> {
    console.log(req.body);
    const result = await saveClient(req.body);
    res.json(result);
});

listRoutes.post('/updateClient', async (req, res)=> {
    console.log(req.body);
    const result = await updateClient(req.body);
    res.json(result);
});

listRoutes.post('/getServices', async (req, res)=> {
    const result = await getServices(req.body);
    res.json(result);
});

listRoutes.post('/getServiceById', async (req, res)=> {
    const result = await getServiceById(req.body);
    res.json(result);
});

listRoutes.post('/saveService', async (req, res)=> {
    console.log(req.body);
    const result = await saveService(req.body);
    res.json(result);
});

listRoutes.post('/updateService', async (req, res)=> {
    console.log(req.body);
    const result = await updateService(req.body);
    res.json(result);
});

export { listRoutes };