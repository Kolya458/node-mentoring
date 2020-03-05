/* eslint-disable no-unused-vars */
import express from 'express';
import * as UserService from './service';
import { validate } from '../../validation/validation';
import { UserInfo } from '../../types/UserInfo.interface';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { IUser } from '../../types/User.interface';

const userRouter = express.Router();

userRouter.get('/', async (req: express.Request, res: express.Response) => {
    const allUsers = await UserService.getAllUsers();
    return res.json(allUsers);
});

userRouter.post('/', validate('user-schema'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userDTO = req.body as UserInfo;
    try {
        const newUser = await UserService.createUser(userDTO);
        return res.json(newUser);
    } catch (e) {
        next(e);
    }
});

userRouter.get('/auto', async (req: express.Request, res: express.Response) => {
    const suggestDTO = req.body as SuggestInfo;
    const suggestions = await UserService.getAutoSuggestUsers(suggestDTO);
    res.json(suggestions);
});
userRouter
    .route('/:id')
    .get(async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const user = await UserService.getUserById(id);
        return res.json(user);
    })
    .delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const allUsers = await UserService.deleteUser(id);
            return res.json(allUsers);
        } catch (e) {
            next(e);
        }
    })
    .put(validate('user-schema'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        const userDTO = req.body as IUser;
        userDTO.id = id;
        try {
            const updatedUser = await UserService.updateUser(userDTO);
            return res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    });

export default userRouter;
