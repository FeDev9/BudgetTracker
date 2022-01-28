const { redirect } = require("express/lib/response");
const db = require("../database");
const model = require('../models/transactionsModel');

class TransactionsController {


    profile(req, res) {

        if (req.user) {
            /* recupero transazioni */
            var income;
            var expense;

            model.getIncome({ userId: req.user.id }, (results) => {
                if (!results[0]["sum(value)"]) {
                    income = 0;
                }
                else {
                    income = results[0]["sum(value)"];
                }
            });

            model.getExpense({ userId: req.user.id }, (results) => {
                if (!results[0]["sum(value)"]) {
                    expense = 0;
                }
                else {
                    expense = results[0]["sum(value)"];
                }
            });

            model.getTransactions({ userId: req.user.id }, (results) => {
                res.render('profile', {
                    user: req.user,
                    transactions: results,
                    income: income,
                    expense: expense
                });
            });

        } else {
            res.redirect('/login');
        }
    };

    add(req, res) {

        if (req.user != undefined) {

            const userId = req.user;
            var { type, value } = req.body;

            value = parseFloat(value);

            if (type === '' || typeof value !== 'number' || value === 0 || value === '' || value > 100000 || value < -100000 || type.length > 30) {
                console.log('Types a valid input');
            } else {

                model.addTransaction({ type: type, value, userId: req.user.id }, (results) => {
                    res.redirect('/profile');
                });
            }
        } else {
            res.redirect('/');
        }
    };

    delete(req, res) {

        const idTransaction = req.params.id;
        console.log(idTransaction);
        console.log(req.user.id);

        model.getUserTransaction({ id: req.params.id, userId: req.user.id }, async (results) => {

            console.log(results);
            if (!results) {
                res.redirect('back');
            } else {
                model.deleteTransaction({ id: req.params.id, userId: req.user.id }, (results) => {
                    res.redirect('back');
                });
            }
        })

    };

    allTransactions(req, res) {

        if (req.user != undefined) {

            model.getTransactions({ userId: req.user.id }, (results) => {
                res.render('all', {
                    transactions: results,
                    user: req.user
                });
            });
        } else {
            res.redirect('/');
        }
    };

    filter(req, res) {

        const { dateStart, dateEnd } = req.body;

        console.log(dateEnd, dateStart);



        if (dateStart > dateEnd || dateStart == '' || dateEnd == '') {
            res.render('all', {
                transactions: [],
                msg: "Input a valid type"
            })
        }

        model.filterTransactions({ userId: req.user.id, dateStart, dateEnd }, (results) => {

            res.render('all', {
                transactions: results,
                user: req.params,
            })
        })
    }

}

module.exports = new TransactionsController();