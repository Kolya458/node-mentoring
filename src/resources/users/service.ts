/* eslint-disable no-unused-vars */
import { Users } from '../../database/models/initUser';
import { Op } from 'sequelize';
import { UserInfo } from '../../types/UserInfo.interface';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { UserException } from '../../types/UserException';
import { IUser } from '../../types/User.interface';

export const getAllUsers = async () => {
    const allUsers = await Users.findAll();
    return allUsers.map((user: Users) => user.get({ plain: true }));
};

export const getUserById = async (id: string) => {
    const user = await Users.findOne({
        attributes: ['id', 'login', 'password', 'age'],
        where: { id }
    });
    return user || {};
};

export const createUser = async (userDTO: UserInfo) => {
    const { login } = userDTO;
    const existedUser = await findUserByLogin(login);
    if (existedUser) {
        throw new UserException(400, 'user already exists');
    }
    const newUser = await Users.create(userDTO, {
        fields: ['login', 'password', 'age']
    });
    return newUser.get({ plain: true });
};

export const deleteUser = async (id: string) => {
    const userToDelete = await Users.findOne({
        where: { id }
    });
    if (!userToDelete) {
        throw new UserException(400, 'user doen\'t exist');
    }
    await Users.destroy({
        where: { id }
    });
    return getAllUsers();
};

export const updateUser = async (userDTO: IUser) => {
    const { login, id } = userDTO;
    const user = await findUserByLogin(login);
    if (user && (user.get({ plain: true }) as IUser).id !== id) {
        throw new UserException(400, 'User with this login already exists');
    }
    const [, updatedUsers] = await Users.update(userDTO, {
        fields: ['login', 'password', 'age'],
        where: { id },
        returning: true
    });
    if (!updatedUsers.length) {
        throw new UserException(400, 'there is no user');
    }
    return updatedUsers[0].get({ plain: true });
};

export const getAutoSuggestUsers = async (suggestInfo: SuggestInfo) => {
    const { login, limit } = suggestInfo;
    const foundUsers = await Users.findAll({
        where: {
            login: {
                [Op.like]: `%${login}%`
            }
        },
        order: ['login'],
        limit
    });
    return foundUsers.map((user: Users) => user.get({ plain: true }));
};

async function findUserByLogin(login: string) {
    return Users.findOne({
        where: { login }
    });
}
