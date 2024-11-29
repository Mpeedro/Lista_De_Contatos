import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import ContatoController from './app/controllers/ContatoController';

import authMiddleware from './app/middlewares/auth'

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);
//rotas que precisam estar autenticada

routes.use(authMiddleware)
routes.put('/users', UserController.update);

//contatos:
routes.post('/contatos', ContatoController.store);
routes.put('/contatos/:contatoId', ContatoController.update);
routes.get('/contatos', ContatoController.index);
routes.delete('/contatos/:contatoId',  ContatoController.delete);










export default routes;