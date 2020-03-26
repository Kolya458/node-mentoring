/* eslint-disable no-unused-vars */
import express from 'express';
import GroupService from './service';
import { IGroup } from '../../types/Group.interface';
import { validate } from '../../validation/validation';
import { Users } from '../../database/models/User';


const groupRouter = express.Router();

groupRouter.get('/', async (req: express.Request, res: express.Response) => {
    const allGroups = await GroupService.findAll({ include: [Users] });
    return res.json(allGroups);
});

groupRouter.post('/', validate('group-schema'), async (req: express.Request, res: express.Response) => {
    const group = req.body;
    const newGroup = await GroupService.create(group);
    return res.json(newGroup);
});

groupRouter.post('/:id/addUsers', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id: groupId } = req.params;
    const { userIds } = req.body;
    try {
        const result = await GroupService.addUsers(groupId, userIds);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
}
);

groupRouter
    .route('/:id')
    .get(async (req: express.Request, res: express.Response) => {
        const { id } = req.params;
        const group = await GroupService.findById(id, { include: [Users] });
        return res.json(group);
    })
    .delete(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        try {
            const result = await GroupService.delete(id);
            return res.json(result);
        } catch (e) {
            next(e);
        }
    })
    .put(validate('group-schema'), async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const { id } = req.params;
        const groupData = req.body as IGroup;
        groupData.id = id;
        try {
            const updatedGroup = await GroupService.update(groupData);
            return res.json(updatedGroup);
        } catch (e) {
            next(e);
        }
    });

export default groupRouter;
