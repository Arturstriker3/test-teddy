import { Router } from 'express';
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserController } from './controllers/UserController';

const routes = Router();

// Public
routes.post('/register', new UserController().register);
routes.post('/login', new UserController().login);


// Private
routes.use(authMiddleware);

routes.get('/profile', new UserController().getProfile);



export default routes;