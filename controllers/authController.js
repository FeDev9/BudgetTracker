const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { promisify } = require('util');
const model = require('../models/authModel');



module.exports = {

    register: (req, res) => {

        const { name, email, password, passwordConfirm } = req.body;

        model.getEmail({ email }, async (results) => {
            if (results.length > 0) {
                return res.render('register', {
                    msg: 'That email is already in use'
                });
            }
            else if (password !== passwordConfirm) {
                return res.render('register', {
                    msg: 'Password do not match'
                });
            }

            let hashedPassword = await bcrypt.hash(password, 8);

            model.addUser({ name, email, password: hashedPassword }, (results) => {
                console.log(results);
                res.redirect('/');
            });
        });
    },

    login: async (req, res) => {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).render('login', {
                msg: "Please provide an email and password"
            });
        }

        model.getUser({ email: email }, async (results) => {
            if (results.length == 0 || !(await bcrypt.compare(password, results[0].password))) {

                res.status(401).render('login', {
                    msg: 'Email or Password is incorrect'
                })

            } else {
                const id = results[0].id;

                const token = jwt.sign({ id }, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES_IN
                });

                console.log("This is token: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    httpOnly: true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/profile");
            }

        });
    },

    isLoggedIn: async (req, res, next) => {

        if (req.cookies.jwt) {
            try {
                //verify token
                const decoded = await promisify(jwt.verify)(
                    req.cookies.jwt,
                    process.env.JWT_SECRET
                );

                //Check if the user still exists
                model.getUser({ id: decoded.id }, (results) => {
                    if (!results) {
                        return next();
                    }

                    req.user = results[0];

                    return next();
                });

            } catch (err) {
                console.log(err);
                return res.redirect('/login');
            }
        } else {
            next();
        }



    },

    logout: (req, res) => {

        res.cookie('jwt', '', {
            expires: new Date(
                Date.now() + 2 * 1000
            ),
            httpOnly: true
        });

        res.status(200).redirect('/');

    }


}