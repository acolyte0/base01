const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const expressLayouts = require('express-ejs-layouts'); //setting up views
const mongoose = require('mongoose'); // after EJS
const flash = require('connect-flash');
const session = require('express-session');

// CSS Folder
const path = require('path');
app.use(
    '/public',
    express.static(
        path.join(
            __dirname,
            'static'
        )
    )
);

// Passport Config
const passport = require('passport');
require('./config/passport')(passport);

// DB Config
const db = require('./config/keys').MongoURI;

// DB Connect
mongoose.connect(
    db,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(
    () => console.log('MongoDB is Connected.')
).catch(
    (err)=> console.log(err)
);

// Setting up views: EJS
app.use(expressLayouts);
app.set('view engine', __dirname + 'ejs');

// Body Parser - after DB
app.use(
    express.urlencoded(
        {
            extended: false
        }
    )
);

// express session
app.use(
    session(
        {
            secret: 'no secret',
            resave: true,
            saveUninitialized: true
        }
    )
);

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(
    flash()
);

// Add Global Variables
app.use(
    (req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');

        next();
    }
);

// Routes - after creating routes/index.js
app.use(
    '/',
    require('./routes/index')
);

// Routes for login & register - after creating routes/users.js
app.use(
    '/users',
    require('./routes/users')
);

app.listen(
    PORT,
    console.log('The server is started on the port, ' + PORT + '.')
);