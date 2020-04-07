/* eslint-disable no-unused-vars */
import express from 'express';
import UserService from './service';
import { validate } from '../../validation/validation';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { IUser } from '../../types/User.interface';
import auth from '../auth/auth';
import { RefreshToken } from '../../database/models/RefreshToken';
import * as userController from './controller';

const userRouter = express.Router();

userRouter.get('/', auth, userController.findAll);

userRouter.post('/', auth, validate('user-schema'), userController.create);

userRouter.get('/auto', auth, userController.getAutoSuggestUsers);
userRouter
    .route('/:id')
    .get(auth, userController.findById)
    .delete(auth, userController.deleteUser)
    .put(auth, validate('user-schema'), userController.update);

export default userRouter;
