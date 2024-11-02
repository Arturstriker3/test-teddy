import { Router } from 'express';
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserController } from './controllers/UserController';

const routes = Router();

// Public
routes.post('/register', new UserController().register);
routes.post('/login', new UserController().login);


// Private
routes.use(authMiddleware);

routes.get('/private-data', (req, res) => {
    res.status(200).json({ message: 'Esta é uma rota privada.' });
});



export default routes;