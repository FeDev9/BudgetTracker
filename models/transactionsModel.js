const db = require('../database');


class TransactionsModel {

    async getIncome(userDetails) {

        try {
            const results = await db.promise().query('SELECT sum(value) FROM transactions WHERE value > 0 AND MONTH(date) = MONTH(now()) AND YEAR(date)=YEAR(now()) AND ?', userDetails);
            return results[0];
        } catch (err) {
            throw err;
        }
    };

    async getExpense(userDetails) {

        try {
            const results = await db.promise().query('SELECT sum(value) FROM transactions WHERE value < 0 AND MONTH(date) = MONTH(now()) AND YEAR(date)=YEAR(now()) AND ?', userDetails);
            return results[0];
        } catch (err) {
            throw err;
        }
    };

    async getTransactions(transactionDetails) {

        try {
            const results = await db.promise().query('SELECT * FROM transactions WHERE ?', transactionDetails);
            return results[0];
        } catch (err) {
            throw err;
        }
    };

    async addTransaction(transactionDetails, cb) {

        try {
            const results = await db.promise().query('INSERT INTO transactions SET ?', transactionDetails);
            return results;
        } catch (err) {
            throw err;
        }
    };

    async deleteTransaction(transactionDetails) {

        try {
            const results = await db.promise().query('DELETE FROM transactions WHERE id = ? AND userId = ?', [transactionDetails.id, transactionDetails.userId]);
            return results;
        } catch (err) {
            throw err;
        }
    };

    async getUserTransaction(transactionDetails) {

        try {
            const results = await db.promise().query('SELECT * FROM transactions WHERE id = ? AND userId = ?', [transactionDetails.id, transactionDetails.userId]);
            return results[0];
        } catch (err) {
            throw err;
        }
    };

    async filterTransactions(transactionDetails) {

        try {
            const results = await db.promise().query(`SELECT * FROM transactions WHERE userId = ${transactionDetails.userId} AND (DATE(date) BETWEEN '${transactionDetails.dateStart}' AND '${transactionDetails.dateEnd}')`);
            return results[0];
        } catch (err) {
            throw err;
        }
    }
}

module.exports = new TransactionsModel();