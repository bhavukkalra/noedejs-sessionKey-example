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
    // Need to know more about "saveUninitialized"
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    // need to know more about "saveUninitialized"
    resave: false
}));

// parsing the incoming data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//serving public file
app.use(express.static(__dirname));

// cookie parser middleware
app.use(cookieParser());

// {We will get these from the DB in case of production environment}
//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;


/*
Where is this req.session coming from?
How it is getting appended to the req parameter

 */

/*
@route
This will render and serve the HTML form to the client to fill in the
login credentials. If the user is logged in, we’ll display a logout link.

 */

app.get('/',(req,res) => {
    session=req.session;
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
        res.sendFile('views/index.html',{root:__dirname})
});


/*

Route for creating the sessions
(This is where the)

If the credentials are valid:

The user will be granted the necessary access.
The server will create a temporary user session with a random string known as a session ID to identify that session.
The server will send a cookie to the client’s browser. The session ID is going to be placed inside this cookie.
 */
app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        // From where did we got the session? Where was it defined in this scope?

        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})


/*
This will define the logout endpoint. When the user decides to log out, the server will destroy (req.session.destroy();)
the session and clear out the cookie on the client-side. Cookies are cleared in the browser when the maxAge expires.

Question 1 - Can cookie be removed before the maxAge expiry time?

 */


/*
When the user logs out the cookie in the browser remains
but the session on the DB gets destroyed


Kuch rahega hi nahi comapre karne ke liye to karoge kiske sath?
 */

app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

app.listen(PORT, () => console.log(`Server Running at port ${PORT}`));
