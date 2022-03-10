const express = require('express')
const app = express()
const port = 3000

app.use(express.static('public'));

//set up Middleware
const { newsMiddleware } = require('./lib/middleware');
app.use(newsMiddleware)

// set up cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser("jacques will have 100%"));

// set up routes
const home = require('./routes/home')
app.use('/', home)
const friends = require('./routes/friends')
app.use('/friends', friends)

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware for parsing the body of Posts
// need this before you can use req.body
app.use(express.urlencoded({ extended: true })) 


// custom 404 page
app.use( (req, res) => {
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('500');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))
