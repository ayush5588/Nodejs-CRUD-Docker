const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');

const SessionStore = new session.MemoryStore;


const app = express();
require('dotenv/config');
require('./connection/db');  // database connection

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname,'/public')));
app.use(session({
    cookie: {maxAge: 60000},
    store: SessionStore,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    resave: true
}));
app.use(flash());
/*
app.use((req,res,next)=>{
    res.locals.success_message = req.flash('success_message');
    res.locals.error_message = req.flash('error_messages');
    next();
});*/

app.set('view engine','ejs');

app.use((req,res,next)=>{
    res.locals.removeMessage = ()=>{
        req.session.message = [];
    };
    next();
});

const user = require('./src/employee/index');
app.use('/user',user);
const port = process.env.PORT || 3000;

app.listen(port,(e)=>{
    if(e){
        console.log(`Error in starting the server - ${e}`);
    }else{
        console.log(`App listening at http://localhost:${port}`);
    }
});

module.exports = app;