const db = require('../database');

class AuthModel {

    async getEmail(userDetails) {



        try {
            const results = await db.promise().query('SELECT email FROM users WHERE ?', userDetails);
            return results[0];

        } catch (err) {
            throw err;
        }


    };

    async addUser(userDetails) {

        try {
            const results = await db.promise().query('INSERT INTO users SET ?', userDetails);
            return results;
        } catch (err) {
            throw err;
        }
    };

    async getUser(userDetails) {

        try {
            const results = await db.promise().query('SELECT * FROM users WHERE ?', userDetails);
            return results[0];
        } catch (err) {
            throw err;
        }

    }

}

module.exports = new AuthModel();