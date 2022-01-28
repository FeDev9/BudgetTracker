const { redirect } = require("express/lib/response");
const db = require("../database");
const model = require('../models/transactionsModel');

class TransactionsController {


    async profile(req, res) {

        if (req.user) {
            /* recupero transazioni */
            var income;
            var expense;

            const incomeResults = await model.getIncome({ userId: req.user.id });
            if (!incomeResults[0]["sum(value)"]) {
                income = 0;
            }
            else {
                income = incomeResults[0]["sum(value)"];
            }

            const expenseResults = await model.getExpense({ userId: req.user.id })
            if (!expenseResults[0]["sum(value)"]) {
                expense = 0;
            }
            else {
                expense = expenseResults[0]["sum(value)"];
            }

            const results = await model.getTransactions({ userId: req.user.id });
            res.render('profile', {
                user: req.user,
                transactions: results,
                income: income,
                expense: expense
            });


        } else {
            res.redirect('/login');
        }
    };

    async add(req, res) {

        if (req.user != undefined) {

            const userId = req.user;
            var { type, value } = req.body;

            value = parseFloat(value);

            if (type === '' || typeof value !== 'number' || value === 0 || value === '' || value > 100000 || value < -100000 || type.length > 30) {
                console.log('Types a valid input');
            } else {

                model.addTransaction({ type: type, value, userId: req.user.id })
                res.redirect('/profile');
            }
        } else {
            res.redirect('/');
        }
    };

    async delete(req, res) {

        const idTransaction = req.params.id;
        console.log(idTransaction);
        console.log(req.user.id);

        const results = await model.getUserTransaction({ id: req.params.id, userId: req.user.id });
        console.log(results);
        if (!results) {
            res.redirect('back');
        } else {
            model.deleteTransaction({ id: req.params.id, userId: req.user.id });
            res.redirect('back');
        }
    };

    async allTransactions(req, res) {

        if (req.user != undefined) {

            const results = await model.getTransactions({ userId: req.user.id });
            res.render('all', {
                transactions: results,
                user: req.user
            });
        } else {
            res.redirect('/');
        }
    };

    async filter(req, res) {

        const { dateStart, dateEnd } = req.body;

        console.log(dateEnd, dateStart);



        if (dateStart > dateEnd || dateStart == '' || dateEnd == '') {
            res.render('all', {
                transactions: [],
                msg: "Input a valid type"
            })
        }

        const results = await model.filterTransactions({ userId: req.user.id, dateStart, dateEnd });

        res.render('all', {
            transactions: results,
            user: req.params,
        })
    }

}

module.exports = new TransactionsController();