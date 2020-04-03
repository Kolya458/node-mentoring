import { Router } from 'express';
import * as AuthController from './controller';
import auth from './auth';

const authRouter = Router();
authRouter.post('/signin', AuthController.signIn);
authRouter.post('/signout', auth, AuthController.signOut);
authRouter.post('/refresh', AuthController.refresh);

export default authRouter;

