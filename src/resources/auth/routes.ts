// eslint-disable-next-line no-unused-vars
import express, { Router } from 'express';
import authService from './service';
import auth from './auth';

const authRouter = Router();
authRouter.post('/signin', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { login, password } = req.body;
    try {
        const tokens = await authService.signIn(login, password);
        return res.json(tokens);
    } catch (e) {
        next(e);
    }
});
authRouter.post('/signout', auth, async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { userId } = req.body;
    try {
        await authService.signOut(userId);
        return res.json({ status: 'success' });
    } catch (e) {
        next(e);
    }
});
authRouter.post('/refresh', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { refreshToken } = req.body;

    try {
        const tokens = await authService.refresh(refreshToken);
        return res.json(tokens);
    } catch (e) {
        return next(e);
    }
});

export default authRouter;

