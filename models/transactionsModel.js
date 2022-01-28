const db = require('../database');


class TransactionsModel {

    getIncome(userDetails, cb) {

        db.query('SELECT sum(value) FROM transactions WHERE value > 0 AND MONTH(date) = MONTH(now()) AND YEAR(date)=YEAR(now()) AND ?', userDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }
        });
    };

    getExpense(userDetails, cb) {

        db.query('SELECT sum(value) FROM transactions WHERE value < 0 AND MONTH(date) = MONTH(now()) AND YEAR(date)=YEAR(now()) AND ?', userDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }
        });
    };

    getTransactions(transactionDetails, cb) {

        db.query('SELECT * FROM transactions WHERE ?', transactionDetails, async (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }

        });
    };

    addTransaction(transactionDetails, cb) {

        db.query('INSERT INTO transactions SET ?', transactionDetails, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }
        });

    };

    deleteTransaction(transactionDetails, cb) {

        db.query('DELETE FROM transactions WHERE id = ? AND userId = ?', [transactionDetails.id, transactionDetails.userId], (err, results) => {
            try {
                console.log(results);
                return cb(results);
            } catch (err) {
                throw err;
            }
        });

    };

    getUserTransaction(transactionDetails, cb) {

        db.query('SELECT * FROM transactions WHERE id = ? AND userId = ?', [transactionDetails.id, transactionDetails.userId], async (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }

        });
    };

    filterTransactions(transactionDetails, cb) {

        db.query(`SELECT * FROM transactions WHERE userId = ${transactionDetails.userId} AND date >= '${transactionDetails.dateStart}' AND date <= '${transactionDetails.dateEnd}' `, (err, results) => {
            try {
                return cb(results);
            } catch (err) {
                throw err;
            }
        });
    }
}

module.exports = new TransactionsModel();