const bcrypt = require('bcrypt');

async function genHash(password: string) {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};

module.exports = {
    genHash
};
