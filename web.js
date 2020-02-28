const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

app.use(expressLayouts);
app.set('view engine', 'ejs');


app.get(
    '/',
    (req, res) => res.render('welcome')
);


app.listen(8001);