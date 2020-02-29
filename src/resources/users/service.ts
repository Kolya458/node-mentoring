/* eslint-disable no-unused-vars */
import { users } from '../../collections/UserCollection';
import { User } from '../../models/User';
import { UserInfo } from '../../types/UserInfo.interface';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { UserException } from '../../types/UserException';

export const getAllUsers = () => {
    return users.findAll();
};

export const getUserById = (id: string) => {
    return users.findById(id);
};

export const createUser = (userDTO: UserInfo) => {
    const { login, password, age } = userDTO;
    const newUser = new User(login, password, age);
    users.append(newUser);
    return newUser;
};

export const deleteUser = (id: string) => {
    users.delete(id);
    return { status: 'success' };
};

export const updateUser = (id: string, userDTO: UserInfo) => {
    const { login, password, age } = userDTO;
    users.update(id, login, password, age);
    return { status: 'success' };
};

export const getAutoSuggestUsers = (suggestInfo: SuggestInfo) => {
    const { login, limit } = suggestInfo;
    return users.findBySubstr(login, limit);
};
