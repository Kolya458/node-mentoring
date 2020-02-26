/* eslint-disable no-unused-vars */
import express from 'express';
import * as UserService from './service';
import { validate } from '../../validation/validation';
import { UserInfo } from '../../types/UserInfo.interface';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { HttpException } from '../../types/HttpException';


const userRouter = express.Router();
userRouter.get('/', (req: express.Request, res: express.Response) => {
    return res.json(UserService.getAllUsers());
});
userRouter.post('/', validate('user-schema'), (req: express.Request, res: express.Response) => {
    const userDTO = req.body as UserInfo;
    return res.json(UserService.createUser(userDTO));
});
userRouter.get('/auto', (req: express.Request, res: express.Response) => {
    const suggestDTO = req.body as SuggestInfo;
    res.json(UserService.getAutoSuggestUsers(suggestDTO));
});
userRouter
    .route('/:id')
    .get((req: express.Request, res: express.Response) => {
        const { id } = req.params;
        return res.json(UserService.getUserById(id));
    })
    .delete((req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const success = UserService.deleteUser(id);
            return res.json(success);
        } catch (e) {
            next(e);
        }
    })
    .put(validate('user-schema'), (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        const userDTO = req.body as UserInfo;
        try {
            const success = UserService.updateUser(id, userDTO);
            return res.json(success);
        } catch (e) {
            next(e);
        }
    });

export default userRouter;
