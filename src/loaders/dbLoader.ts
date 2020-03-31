import { Sequelize } from 'sequelize';
import { loggers } from 'winston';
import { Groups } from '../database/models/Group';
import { Users }  from '../database/models/User';
import config from '../config';
import initModels from '../database/models';

export let db: Sequelize;
const logger = loggers.get('logger');

export default async () => {
    const sequelize = new Sequelize(config.dbUrl, { dialect: 'postgres' });

    try {
        Object.values(initModels).forEach(initModel => {
            initModel(sequelize);
        });

        Groups.belongsToMany(Users, { through: 'UserGroup', timestamps: false });
        Users.belongsToMany(Groups, { through: 'UserGroup', timestamps: false });

        sequelize
            .authenticate()
            .then(() => {
                logger.info('Connection has been established successfully.');
                db = sequelize;
            })
            .catch(err => {
                logger.error('Unable to connect to the database:', err);
            });
    } catch (err) {
        console.log(err.message);
    }
};
