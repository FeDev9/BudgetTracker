const { redirect } = require("express/lib/response");
const db = require("../database");

module.exports = {


    profile: (req, res) => {

        if (req.user) {

            /* recupero transazioni */

            var income;
            var expense;

            db.query('SELECT sum(value) FROM transactions WHERE value > 0 AND ?', { userId: req.user.id }, (err, results) => {

                if (err) {
                    console.log(err);
                }

                else {
                    if (!results[0]["sum(value)"]) {
                        income = 0;
                    }
                    else {
                        income = results[0]["sum(value)"];
                    }

                }

            });
            db.query('SELECT sum(value) FROM transactions WHERE value < 0 AND ?', { userId: req.user.id }, (err, results) => {

                if (err) {
                    console.log(err);
                    res.redirect('/profile');
                }

                else {
                    if (!results[0]["sum(value)"]) {
                        expense = 0;
                    }
                    else {
                        expense = results[0]["sum(value)"];
                    }
                }

            });


            db.query('SELECT * FROM transactions WHERE ?', { userId: req.user.id }, (err, results) => {

                if (err) {
                    console.log(err);
                } else {

                    res.render('profile', {
                        user: req.user,
                        transactions: results,
                        income: income,
                        expense: expense
                    });

                }

            });
        } else {
            res.redirect('/login');
        }
    },

    add: (req, res) => {

        const userId = req.user;
        var { type, value } = req.body;

        value = parseFloat(value);

        if (type === '' || typeof value !== 'number' || value === 0 || value === '') {
            console.log('Types a valid input');
        } else {
            db.query('INSERT INTO transactions SET ?', { type: type, value, userId: req.user.id }, (err, results) => {
                if (err) {
                    console.log(err);
                }
                else {
                    res.redirect('/profile');
                }
            });
        }
    },

    delete: (req, res) => {

        const idTransaction = req.params.id;

        console.log(req.user.id);

        db.query('SELECT * FROM transactions WHERE id = ? AND userId = ?', [idTransaction, req.user.id], (err, results) => {

            if (err) {
                console.log(err);
                res.redirect('/profile');
            } else {
                if (!results) {
                    res.redirect('/profile');
                } else {
                    db.query('DELETE FROM transactions WHERE id = ? AND userId = ?', [idTransaction, req.user.id], (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            res.redirect('/profile');
                        }
                    })
                }
            }

        })

    }

}