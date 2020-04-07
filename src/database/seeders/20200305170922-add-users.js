const bcrypt = require('bcrypt');
const usersMock = require('../../mocks/user.mock.json');

module.exports = {
    up: async queryInterface => {
        const hashPromises = usersMock.map(({ password }) =>
            bcrypt.hash(password, 10)
        );
        const hashes = await Promise.all(hashPromises);
        const query = hashes.reduce((acc, hash, index) => {
            const { login, age } = usersMock[index];
            return `${acc} INSERT INTO "Users" (login, password, age) VALUES ('${login}', '${hash}', ${age});\n`;
        }, '');
        return queryInterface.sequelize.query(query);
    },

    down: queryInterface => {
        return queryInterface.sequelize.query(`
        DELETE FROM "Users";
      `);
    }
};
