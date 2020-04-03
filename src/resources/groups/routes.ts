/* eslint-disable no-unused-vars */
import express from 'express';
import GroupService from './service';
import { IGroup } from '../../types/Group.interface';
import { validate } from '../../validation/validation';
import { Users } from '../../database/models/User';
import auth from '../auth/auth';
import * as groupController from './controller';


const groupRouter = express.Router();

groupRouter.get('/', auth, groupController.findAll);
groupRouter.post('/', auth, validate('group-schema'), groupController.create);
groupRouter.post('/:id/addUsers', auth, groupController.addUsers);
groupRouter
    .route('/:id')
    .get(auth, groupController.findById)
    .delete(auth, groupController.deleteGroup)
    .put(auth, validate('group-schema'), groupController.update);

export default groupRouter;
