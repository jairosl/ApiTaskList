import { Router } from 'express';

import authMiddleware from './App/Middlewares/auth';

import UserController from './App/Controllers/UserController';
import SessionController from './App/Controllers/SessionController';
import TaskController from './App/Controllers/TaskController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware); // Todas as rotas agora têm o Middleware de auth

routes.put('/users', UserController.update);

routes.post('/tasks', TaskController.store);
routes.get('/tasks', TaskController.index);
routes.put('/tasks/:task_id', TaskController.update);
routes.delete('/tasks/:task_id', TaskController.delete);

export default routes;
