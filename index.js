/*const express = require('express')
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
app.use(express.urlencoded({ extended: true })) 

// set up mangoose
const mongoose = require('mongoose')
const MongoDBStore = require('connect-mongodb-session')(session);


// custom 404 page
app.use( (req, res) => {
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.render('500');
});



app.listen(port, () => console.log(`Example app listening on port ${port}!`))*/

const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser');

const PORT =  process.env.PORT || 3000
const DATABASEURI = process.env.DATABASEURI || 'mongodb://127.0.0.1:27017/SS2022'
const SECRET = process.env.SECRET || 'jacques will have 100%'


const app = express()
const store = new MongoDBStore({uri:DATABASEURI,
collection: 'mySessions'})


// Catch errors
store.on('error', function(error) {
  console.log(error);
});


// Init middleware

const {flashMiddleware} = require('./lib/middleware.js');
const { newsMiddleware } = require('./lib/middleware');


// Routes

const home = require('./routes/home')
const friends = require('./routes/friends');



app.use(express.static('public'));

// set up handlebars view engine
var handlebars = require('express-handlebars')
.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

// middleware for parsing the body of a form need this before you can use req.body

app.use(express.urlencoded({ extended: true }))

app.use(session(
  {secret: SECRET,
cookie: {maxage: 6000},
resave: false,
saveUninitialized: false,
store: store
}
))


// import our own Middleware

app.use(cookieParser(SECRET));

app.use(flashMiddleware);
app.use(newsMiddleware)


const connectionString = DATABASEURI;


mongoose.connect(connectionString, {
  "useNewUrlParser": true,
  "useUnifiedTopology": true
}).
catch ( error => {
  console.log('Database connection refused' + error);
  process.exit(2);
})

const db = mongoose.connection;


db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("DB connected")
});



app.use('/', home)
app.use('/friends', friends)




// custom 404 page
app.use( (req, res) => {
  res.status(400);
    res.render('404');
});

// custom 500 page
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});


app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
