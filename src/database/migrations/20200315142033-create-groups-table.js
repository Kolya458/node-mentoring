module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(
            `CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
              DROP TABLE IF EXISTS "Groups" CASCADE;
              DROP TYPE IF EXISTS permission;
              CREATE TYPE permission AS ENUM ('READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES');
              CREATE TABLE "Groups"(
                id UUID DEFAULT uuid_generate_v4(),
                name VARCHAR(50) NOT NULL UNIQUE,
                permissions permission[] NOT NULL,
                PRIMARY KEY(id)
              );`
        );
    },

    down: queryInterface => {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS "Groups";');
    }
};
