const express = require('express');
const session = require('express-session');
const pgPool = require('./db/pool'); 
const path = require('path');
require('dotenv').config();
const PORT = process.env.PORT || 3001;

const app = express();

//define public assets path (frontend)
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
//define view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Read body
app.use(express.urlencoded({extended: true}));


//set session store to DB
const sessionStore = require("./session/sessionStore");
console.log(pgPool)
app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: true,
        store: sessionStore,
        cookie: { 
            maxAge: 24 * 60 * 60 * 1000 
        },
    })
); 

const indexRouter = require('./routes/indexRouter');
const { sourceMapsEnabled } = require('process');
app.use('/', indexRouter);



/*
const globalMiddleWare = (req, res, next) => {
    console.log('global middleware running...');
    next();
};

// Register global middleware
app.use(globalMiddleWare);

const middleware = (req, res, next) => {
    res.send('hello express');
    next();
};

const middleware2 = (req, res, next) => {
    console.log('this is middleware #2');
    next();
};

const middleware3 = (req, res) => {
    console.log('this is middleware #3');
};

// Define routes
app.get('/', middleware, middleware2, middleware3);

app.get('/users/:userId', (req, res) => {
    console.log(`This is my user Id: ${req.params.userId}`);
    res.send(`This is my user Id: ${req.params.userId}`);
});
app.get('users/create', (req, res) => {
    res.send(`create new user`)
})

app.get('/login', (req, res) => {
    res.send('this is login');
});
*/
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
