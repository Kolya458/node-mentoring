import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

export class Users extends Model {}

export default (sequelize: Sequelize.Sequelize) => {
    const User = Users.init({
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: v4(),
            primaryKey: true
        },
        login: Sequelize.DataTypes.STRING,
        password: Sequelize.DataTypes.STRING,
        age: Sequelize.DataTypes.SMALLINT
    }, { sequelize, timestamps: false });
    return User;
};
