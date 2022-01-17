const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//Database
require('./database');

//set up templete engine
app.set('view engine', 'ejs');


//static files
app.use(express.static('./public'));

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: false }));

//parse json bodies
app.use(express.json());

app.use(cookieParser());


//Routes
const pagesRoute = require('./routes/pages');
const authRoute = require('./routes/auth');
const transactionsRoute = require('./routes/transactions');

app.use('/', pagesRoute);
app.use('/auth', authRoute);
app.use('/transactions', transactionsRoute);

app.listen(3000, () => {
    console.log("server is running on port 3000");
});