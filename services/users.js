const db = require('./db');
const helper = require('../helper');

async function getAllUsers() {
    const rows = await db.query(
        `SELECT * FROM users`
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
    let profile = user.profile;

    const result = await db.query(
        "INSERT INTO `users` (`first_name`, `last_name`, `gender`, `date_of_birth`, `city`, `phone_nb`, `religion`, `age`, `disability`, `profile`) VALUES " +
        "('"+firstName+"', '"+lastName+"', '"+gender+"', '"+date_of_birth+"', '"+city+"', '"+phone_nb+"', '"+religion+"', '"+age+"', '"+disability+"', '"+profile+"')");

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
            profile: profile
        }
    }
    return {message};
}

module.exports = {
    getAllUsers,
    createUserInfo
}