import { Router } from 'express';
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserController } from './controllers/UserController';
import { UrlController } from './controllers/UrlController';

const routes = Router();

// Public
routes.post('/register', new UserController().register);
routes.post('/login', new UserController().login);
routes.post('/url', new UrlController().post);
routes.get("/:shortUrl", new UrlController().redirect);

// Private
routes.use(authMiddleware);

routes.get('/profile', new UserController().getProfile);



export default routes;