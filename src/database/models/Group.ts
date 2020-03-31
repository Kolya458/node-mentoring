import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

export class Groups extends Model {}

export default (sequelize: Sequelize.Sequelize) => {
    const Group = Groups.init({
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: v4(),
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: Sequelize.DataTypes.ARRAY(
                Sequelize.ENUM('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES')
            ),
            allowNull: false
        }
    }, { sequelize, modelName: 'Groups', timestamps: false });
    return Group;
};
