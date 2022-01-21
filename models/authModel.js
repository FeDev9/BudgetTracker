const db = require('../database');

module.exports = {

    getEmail: (userDetails, cb) => {

        db.query('SELECT email FROM users WHERE ?', userDetails, (err, results) => {

            try {
                return cb(results);

            } catch (err) {
                throw err;
            }

        });
    },

    addUser: (userDetails, cb) => {

        db.query('INSERT INTO users SET ?', userDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }
        });
    },

    getUser: (userDetails, cb) => {
        db.query('SELECT * FROM users WHERE ?', userDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }
        });
    }

}