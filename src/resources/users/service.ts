/* eslint-disable no-unused-vars */
import { Users } from '../../database/models/User';
import { Op } from 'sequelize';
import { UserInfo } from '../../types/UserInfo.interface';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
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

export const createUser = async (user: UserInfo) => {
    const { login } = user;
    const existedUser = await findUserByLogin(login);
    if (existedUser) {
        throw new Error('user already exists');
    }
    const newUser = await Users.create(user, {
        fields: ['login', 'password', 'age']
    });
    return newUser.get({ plain: true });
};

export const deleteUser = async (id: string) => {
    const destroyedUser = await Users.destroy({
        where: { id }
    }).then(countOfDestroyed => {
        if (countOfDestroyed === 0) {
            throw new Error('user doen\'t exist');
        }
    });
    return { status: 'success' };
};

export const updateUser = async (user: IUser) => {
    const { login, id } = user;
    const currentUser = await findUserByLogin(login);
    if (currentUser && (currentUser.get({ plain: true }) as IUser).id !== id) {
        throw new Error('User with this login already exists');
    }
    const [, updatedUsers] = await Users.update(user, {
        fields: ['login', 'password', 'age'],
        where: { id },
        returning: true
    });
    if (!updatedUsers.length) {
        throw new Error('there is no user');
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
