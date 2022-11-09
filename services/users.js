const db = require('./db');
const helper = require('../helper');

async function getAllUsers() {
    const rows = await db.query(
        `SELECT * FROM users`
    );

    return helper.emptyOrRows(rows);
}

module.exports = {
    getAllUsers
}