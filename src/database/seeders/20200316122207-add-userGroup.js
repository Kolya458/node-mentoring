module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(`
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1), (SELECT "id" FROM "Groups" WHERE "name"='admins')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 1), (SELECT "id" FROM "Groups" WHERE "name"='moderators')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 1), (SELECT "id" FROM "Groups" WHERE "name"='users')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 2), (SELECT "id" FROM "Groups" WHERE "name"='users')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 2), (SELECT "id" FROM "Groups" WHERE "name"='admins')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 3), (SELECT "id" FROM "Groups" WHERE "name"='users')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 4), (SELECT "id" FROM "Groups" WHERE "name"='moderators')
        );
        INSERT INTO "UserGroup" ("UserId", "GroupId") VALUES (
          (SELECT "id" FROM "Users" LIMIT 1 OFFSET 5), (SELECT "id" FROM "Groups" WHERE "name"='users')
        );
      `);
    },

    down: queryInterface => {
        return queryInterface.sequelize.query(`
        DELETE FROM "UserGroup";
      `);
    }
};
