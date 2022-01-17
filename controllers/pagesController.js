module.exports = {

    home: (req, res) => {

        res.render('homepage', {
            user: req.user
        });
    },

    login: (req, res) => {

        res.render('login');
    },

    register: (req, res) => {

        res.render('register');
    },




}