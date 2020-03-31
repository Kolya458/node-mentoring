/* eslint-disable no-unused-vars */
import express from 'express';
import UserService from './service';
import { validate } from '../../validation/validation';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { IUser } from '../../types/User.interface';

const userRouter = express.Router();

userRouter.get('/', async (req: express.Request, res: express.Response) => {
    const allUsers = await UserService.findAll();
    return res.json(allUsers);
});

userRouter.post('/', validate('user-schema'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userDTO = req.body as Omit<IUser, 'id'>;
    try {
        const newUser = await UserService.create(userDTO);
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
        const user = await UserService.findById(id);
        return res.json(user);
    })
    .delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const result = await UserService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    })
    .put(validate('user-schema'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        const userDTO = req.body as IUser;
        userDTO.id = id;
        try {
            const updatedUser = await UserService.update(userDTO);
            return res.json(updatedUser);
        } catch (e) {
            next(e);
        }
    });

export default userRouter;
