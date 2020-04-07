/* eslint-disable no-unused-vars */
import express from 'express';
import GroupService from './service';
import { IGroup } from '../../types/Group.interface';
import { Users } from '../../database/models/User';

export const findAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const allGroups = await GroupService.findAll({ include: [Users] });
        return res.json(allGroups);
    } catch (e) {
        next(e);
    }
};

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const group = req.body;
        const newGroup = await GroupService.create(group);
        return res.json(newGroup);
    } catch (e) {
        next(e);
    }
};

export const addUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id: groupId } = req.params;
    const { userIds } = req.body;
    try {
        const result = await GroupService.addUsers(groupId, userIds);
        return res.json(result);
    } catch (e) {
        return next(e);
    }
};

export const findById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const group = await GroupService.findById(id, { include: [Users] });
        return res.json(group);
    } catch (e) {
        next(e);
    }
};

export const deleteGroup = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    try {
        const result = await GroupService.delete(id);
        return res.json(result);
    } catch (e) {
        next(e);
    }
};

export const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    const groupData = req.body as IGroup;
    groupData.id = id;
    try {
        const updatedGroup = await GroupService.update(groupData);
        return res.json(updatedGroup);
    } catch (e) {
        next(e);
    }
};
