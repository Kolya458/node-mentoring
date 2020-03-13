import { Sequelize } from 'sequelize';
import config from '../config';
import initModels from '../database/models';

export default async () => {
    const sequelize = new Sequelize(config.dbUrl, { dialect: 'postgres' });

    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });
    Object.values(initModels).forEach(initModel => {
        initModel(sequelize);
    });
};
