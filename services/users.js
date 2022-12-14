const db = require('./db');
const helper = require('../helper');

async function getAllUsers() {
    const rows = await db.query(
        `SELECT * FROM users`
    );
    return helper.emptyOrRows(rows);
}

async function search(search) {
    const rows = await db.query(
        `SELECT * FROM users WHERE first_name = ? OR last_name = ?`, [search, search]
    );
    return helper.emptyOrRows(rows);
}

async function createUserInfo(user) {
    let firstName = user.first_name;
    let lastName = user.last_name;
    let gender = user.gender;
    let date_of_birth = user.date_of_birth;
    let city = user.city;
    let phone_nb = user.phone_nb;
    let religion = user.religion;
    let age = user.age;
    let disability = user.disability;

    const result = await db.query(
        'INSERT INTO `users` (`first_name`, `last_name`, `gender`, `date_of_birth`, `city`, `phone_nb`, `religion`, `age`, `disability`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [firstName, lastName, gender, date_of_birth, city, phone_nb, religion, age, disability]);

    let message = 'Error in creating posts';

    if (result.affectedRows) {
        return {
            id: result.insertId,
            first_name: firstName,
            last_name: lastName,
            gender: gender,
            date_of_birth: date_of_birth,
            city: city,
            phone_nb: phone_nb,
            religion: religion,
            age: age,
            disability: disability,
        }
    }
    return {message};
}

async function updateUserInfo(id, user) {
    const result = await db.query(
        'UPDATE users SET first_name = ?, last_name = ?, gender = ?, date_of_birth = ?, city = ?, phone_nb = ?, religion = ?, age = ?, disability = ? WHERE id= ?;',
        [user.first_name, user.last_name, user.gender, user.date_of_birth, user.city, user.phone_nb, user.religion, user.age, user.disability, id]

    );
    let message = 'Error in updating posts';

    if (result.affectedRows) {
        return {
            id: id,
            first_name: user.first_name,
            last_name: user.last_name,
            gender: user.gender,
            date_of_birth: user.date_of_birth,
            city: user.city,
            phone_nb: user.phone_nb,
            religion: user.religion,
            age: user.age,
            disability: user.disability,
        }
    }
    return {message};
}

async function removeUserInfo(id) {
    const result = await db.query(
        `DELETE FROM users WHERE id= ?`, [id]
    );
    let message = 'Error in deleting posts';

    if (result.affectedRows) {
        return {}
    }
    return {message};
}

module.exports = {
    getAllUsers,
    createUserInfo,
    updateUserInfo,
    removeUserInfo,
    search
}