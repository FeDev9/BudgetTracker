class PagesController {

    home(req, res) {

        res.render('homepage', {
            user: req.user
        });
    };

    login(req, res) {

        res.render('login');
    };

    register(req, res) {

        res.render('register');
    };




}

module.exports = new PagesController();