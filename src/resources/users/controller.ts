/* eslint-disable no-unused-vars */
import express from 'express';
import UserService from './service';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { IUser } from '../../types/User.interface';

export const findAll = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const allUsers = await UserService.findAll();
        return res.json(allUsers);
    } catch (e) {
        next(e);
    }
};

export const create = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const userDTO = req.body as Omit<IUser, 'id'>;
    try {
        const newUser = await UserService.create(userDTO);
        return res.json(newUser);
    } catch (e) {
        next(e);
    }
};

export const getAutoSuggestUsers = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const suggestDTO = req.body as SuggestInfo;
        const suggestions = await UserService.getAutoSuggestUsers(suggestDTO);
        res.json(suggestions);
    } catch (e) {
        next(e);
    }
};

export const findById = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const user = await UserService.findById(id);
        return res.json(user);
    } catch (e) {
        next(e);
    }
};

export const deleteUser = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    try {
        const result = await UserService.delete(id);
        return res.json(result);
    } catch (e) {
        next(e);
    }
};

export const update = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const { id } = req.params;
    const userDTO = req.body as IUser;
    userDTO.id = id;
    try {
        const updatedUser = await UserService.update(userDTO);
        return res.json(updatedUser);
    } catch (e) {
        next(e);
    }
};
