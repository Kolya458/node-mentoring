/* eslint-disable no-unused-vars */
import { Groups } from '../../database/models/Group';
import EntitiesService from '../common/entityService';
import { Users } from '../../database/models/User';
import { db } from '../../loaders/dbLoader';
import ServiceLogger from '../../logger/service.decorator';

@ServiceLogger
class GroupService extends EntitiesService {
    constructor() {
        super(Groups);
    }

    async addUsers(id: string, userIds: string[]) {
        const userGroupModel = db.models.UserGroup;
        const rowsToAdd = userIds.map(userId => ({ GroupId: id, UserId: userId }));
        await db.transaction((transaction: any) => {
            const requests = rowsToAdd.map(row =>
                userGroupModel.create(row, { transaction })
            );
            return Promise.all(requests);
        });

        return Groups.findByPk(id, {
            include: [Users],
            plain: true
        });
    }
}

const groupService = new GroupService();
export default groupService;
