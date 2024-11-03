import { Router } from 'express';
import { authMiddleware } from "./middlewares/authMiddleware";
import { UserController } from './controllers/UserController';
import { UrlController } from './controllers/UrlController';
import { optionalAuthMiddleware } from "./middlewares/optionalAuthMiddleware";

const routes = Router();

// Public
routes.post('/register', new UserController().register);
routes.post('/login', new UserController().login);
routes.post('/urls', optionalAuthMiddleware, new UrlController().post);
routes.get("/urls/:shortUrl", new UrlController().redirect);

// Private
routes.use(authMiddleware);
routes.get('/profile', new UserController().getProfile);
routes.get('/urls', new UrlController().get);
routes.patch("/urls/:urlId", new UrlController().patch);
routes.delete("/urls/:urlId", new UrlController().delete);

export default routes;