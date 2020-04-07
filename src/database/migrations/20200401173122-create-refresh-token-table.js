
module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(
            `DROP TABLE IF EXISTS "RefreshTokens";
         CREATE TABLE "RefreshTokens"(
           id VARCHAR(100) NOT NULL,
           "UserId" UUID NOT NULL,
           PRIMARY KEY(id),
           FOREIGN KEY("UserId") REFERENCES "Users" ON DELETE CASCADE ON UPDATE CASCADE
         );`
        );
    },

    down: queryInterface => {
        return queryInterface.sequelize.query(
            'DROP TABLE IF EXISTS "RefreshTokens";'
        );
    }
};
