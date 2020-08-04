import express from 'express';
import db from './database/connection'

import converHoursToMinutes from './utils/convertHoursToMinutes';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const connectionsController = new ConnectionsController();
const classesController = new ClassesController();

const routes = express.Router();

routes.post('/classes', classesController.create);
routes.post('/connections', connectionsController.create);

routes.get('/classes', classesController.index);
routes.get('/connections', connectionsController.index);



export default routes;