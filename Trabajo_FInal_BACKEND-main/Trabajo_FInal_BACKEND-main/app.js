// Variables generales de la aplicación
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

// env
require("dotenv").config();

// session
var session = require("express-session");

// express fileupload
var fileupload = require("express-fileupload");

// Rutas variables
var indexRouter = require("./routes/index");
var registerRouter = require("./routes/admin/register");
var loginRouter = require("./routes/admin/login");
var productosRouter = require("./routes/admin/productos");
var apiRouter = require("./routes/api");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Configuración de la aplicación
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// app use fileupload
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// app use session
app.use(
  session({
    secret: "PW2021awqyeudj",
    cookie: { maxAge: null },
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware de sesión
secured = async (req, res, next) => {
  try {
    console.log(req.session.id_usuario);
    if (req.session.id_usuario) {
      next();
    } else {
      res.redirect("/admin/login");
    }
  } catch (error) {
    console.log(error);
  }
};

// Rutas de la aplicación
app.use("/", indexRouter);
app.use("/admin/register", registerRouter);
app.use("/admin/login", loginRouter);
app.use("/admin/productos", secured, productosRouter);
app.use("/api", cors(), apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
