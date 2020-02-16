const jwt = require('./jwt');
const config = require('../config/config');
const models = require('../models');
const errorHandlers = require('./handleErrors');
const cockieName = require('../cookieName');

function auth(redirectUnauthenticated = true) {
    return function (req, res, next) {
        const token = req.cookies[cockieName] || '';
        Promise.all([
            jwt.verifyToken(token),
        ]).then(([data]) => {
            models.userModel.findById(data.id).then(user => {
                req.user = user;
                next();
            });
        }).catch(err => {
            if (!redirectUnauthenticated) { next(); return; }
          
            if (err.message === 'jwt must be provided' || err.message === 'token expired') {
                errorHandlers(res, 'authentication', err.message);
                res.render('login.hbs');
                return;
            }
            next(err);
        });
    };
}

module.exports = auth;