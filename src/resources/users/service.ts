/* eslint-disable no-unused-vars */
import { Users } from '../../database/models/User';
import { Op } from 'sequelize';
import { SuggestInfo } from '../../types/SuggestInfo.interface';
import { IUser } from '../../types/User.interface';
import EntitiesService from '../common/entityService';

class UsersService extends EntitiesService {
    constructor() {
        super(Users);
    }

    async getAutoSuggestUsers(suggestInfo: SuggestInfo) {
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
}

const usersService = new UsersService();
export default usersService;
