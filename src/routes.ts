import { Router } from 'express';
// import { LogController } from './controllers/LogController';
import { authMiddleware } from "./middlewares/authMiddleware";

const routes = Router();

// Public
// routes.post('/logs', new LogController().create);


// Private
routes.use(authMiddleware);



export default routes;