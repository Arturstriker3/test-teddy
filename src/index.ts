import express from 'express';
import { AppDataSource } from "./data-source";
import { errorMiddleware } from "./middlewares/error";
import corsMiddleware from './middlewares/cors';
import routes from './routes';
import swaggerApp from './swagger';
import metric from './middlewares/metric';
import timeoutMiddleware from './middlewares/timeoutMiddleware'

const api = express();

AppDataSource.initialize().then(() => {

    api.use(corsMiddleware);
    api.use(express.json());
    api.use(timeoutMiddleware)
    api.use('/api-docs', swaggerApp);
    api.use(metric);
    api.use(routes);

    api.get('/status', async (_req, res, _next) => {
        const environment = process.env.NODE_ENV || 'development';
        const msg = `Server is running on port: ${process.env.PORT || 3000} in ${environment} mode.`;

        return res.status(200).json(msg);
    });

    api.use(errorMiddleware);
    
    api.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });

}).catch(error => console.log('Error during Data Source initialization:', error));