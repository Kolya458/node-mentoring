import Sequelize, { Model } from 'sequelize';
import { v4 } from 'uuid';

export class Users extends Model {}

export default (sequelize: Sequelize.Sequelize) => {
    const User = Users.init({
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: v4(),
            primaryKey: true,
            unique: true,
            allowNull: false
        },
        login: {
            type: Sequelize.DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^(?=.*[a-zA-Z])(?=.*[0-9])/i
            }
        },
        age: {
            type: Sequelize.DataTypes.SMALLINT,
            allowNull: false,
            validate: {
                min: 4,
                max: 130
            }
        }
    }, { sequelize, modelName: 'Users', timestamps: false });
    return User;
};
