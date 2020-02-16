const express = require('express');
const handlebars = require('express-handlebars');
const boydParser = require('body-parser');
const path = require('path');
const cokieParser = require('cookie-parser');
const secret = 'bigSeret'

module.exports = (app) =>{
    app.use(cokieParser(secret));
    app.use(boydParser.urlencoded({extended:false}));
    app.use(express.static(path.resolve(__basedir,'static')));
   // app.use(express.static('/static'));
    app.engine('.hbs',handlebars({extname : '.hbs',defaultLayout:false}));
    app.set('views',path.resolve(__basedir,'views'));
}