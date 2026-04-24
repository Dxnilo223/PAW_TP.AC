var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');


// routes
var indexRouter = require('./routes/index');
var authRouter = require('./routes/authenticationRoutes');
var productRouter = require('./routes/productRoutes');
var saleRouter = require('./routes/saleRoutes');
var supermarketRouter = require('./routes/supermarketRoutes');

//DB connection
const mongoose = require('mongoose');
const MONGO_URI = "mongodb+srv://dannyalramos06_db_user:PAW_TP.AC@paw.trofioj.mongodb.net/?appName=PAW";//CHANGED URL

mongoose.connect(MONGO_URI).then((res) => {
  console.log("Connected to db!");
  console.log("http://localhost:3000");
});

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
//routes
app.use('/', indexRouter);
//app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/sales', saleRouter);
app.use('/supermarkets', supermarketRouter);

app.use(session({
  secret: 'paw_secret_key',
  resave: false,
  saveUninitialized: false
}));


app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});


// 404
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error", { title: "500" });
});

module.exports = app;
app.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});
