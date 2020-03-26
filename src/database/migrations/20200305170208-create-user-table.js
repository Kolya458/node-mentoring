module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
              DROP TABLE IF EXISTS "Users" CASCADE;
              CREATE TABLE "Users"(
                id UUID DEFAULT uuid_generate_v4(),
                login VARCHAR(50) NOT NULL UNIQUE,
                password VARCHAR(50) NOT NULL,
                age SMALLINT NOT NULL,
                PRIMARY KEY(id)
              );`
        );
    },

    down: queryInterface => {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS "Users";');
    }
};
