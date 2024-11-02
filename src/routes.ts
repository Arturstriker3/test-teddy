import { Router } from 'express';
// import { LogController } from './controllers/LogController';
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

// Public
// routes.post('/logs', new LogController().create);


// Private
routes.use(authMiddleware);

routes.get('/private-data', (req, res) => {
    res.status(200).json({ message: 'Esta é uma rota privada.' });
});



export default routes;