//Requires gerais
const path = require("path");
require("dotenv").config();

//Express
const express = require('express')
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

//Template Mustache
var mustacheExpress = require("mustache-express");
var engine = mustacheExpress()
app.engine("mustache", engine);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");

//Cokies
const cookieParser = require("cookie-parser");
app.use(cookieParser());

//Sessão
const session = require("express-session")
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use("/", require('./Controller/main'))
app.use("/", require('./Controller/home'))
app.use("/", require('./Controller/novaNoticia'))
app.use("/", require('./Controller/edit'))
app.use("/", require('./Controller/noticia'))

app.listen(process.env.PORT, ()=> {
  console.log("Servidor Inicializado")
})

