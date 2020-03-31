module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(`
      INSERT INTO "Groups" (name, permissions) VALUES ('admins', '{"READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"}');
      INSERT INTO "Groups" (name, permissions) VALUES ('moderators', '{"READ", "WRITE", "SHARE", "UPLOAD_FILES"}');
      INSERT INTO "Groups" (name, permissions) VALUES ('users', '{"READ", "SHARE"}');
    `);
    },

    down: queryInterface => {
        return queryInterface.sequelize.query('DELETE FROM "Groups"');
    }
};
