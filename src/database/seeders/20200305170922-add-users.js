module.exports = {
    up: queryInterface => {
        return queryInterface.sequelize.query(`
        INSERT INTO "Users" (login, password, age) VALUES ('admin', 'admin1', 33);
        INSERT INTO "Users" (login, password, age) VALUES ('qwer', 'qwer1', 32);
        INSERT INTO "Users" (login, password, age) VALUES ('dsa', 'dsa1', 23);
        INSERT INTO "Users" (login, password, age) VALUES ('zxc', 'zxc1', 14);
        INSERT INTO "Users" (login, password, age) VALUES ('ddd', 'ddd1', 66);
        INSERT INTO "Users" (login, password, age) VALUES ('fee', 'fee1', 45);
      `);
    },

    down: queryInterface => {
        return queryInterface.sequelize.query(`
        DELETE FROM "Users";
      `);
    }
};
