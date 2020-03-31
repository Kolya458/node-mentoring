module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(
            `DROP TABLE IF EXISTS "UserGroup";
              CREATE TABLE "UserGroup"(
                "UserId" UUID NOT NULL,
                "GroupId" UUID NOT NULL,
                PRIMARY KEY("UserId", "GroupId"),
                FOREIGN KEY("UserId") REFERENCES "Users" ON DELETE CASCADE ON UPDATE CASCADE,
                FOREIGN KEY("GroupId") REFERENCES "Groups" ON DELETE CASCADE ON UPDATE CASCADE
              );`
        );
    },

    down: queryInterface => {
        return queryInterface.sequelize.query('DROP TABLE IF EXISTS "UserGroup";');
    }
};
