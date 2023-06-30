const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const PORT = 4000;


// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));