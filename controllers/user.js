
const cokieName =  require('../cookieName');
const models = require('../models');
const jwt = require('../utils/jwt');
const errorHandler = require('../utils/handleErrors');

function getRegister (req,res,next){
    res.render('register.hbs');
}

function postRegister(req, res, next) {
    const { username, password, repeatPassword,amount} = req.body;

    if (password !== repeatPassword) {
        errorHandler(res, 'repeatPassword', 'Passwords should be same!');
        res.render('register.hbs', { username, password, repeatPassword ,amount});
        return;
    }
    if(+amount < 0){
        errorHandler(res, 'amount', 'Amount have to be more then 0');
        res.render('register.hbs', { username, password, repeatPassword ,amount});
        return;
    }

    const newUser = {
        username,
        password,
        amount
    };

    return models.userModel.create(newUser)
        .then(() => {
            res.redirect('/login');
        })
        .catch(err => {
            err.code === 11000 ? errorHandler(res, 'username', 'Username is taken!') : errorHandler(res, err);

            res.render('register.hbs', { username, password, repeatPassword });
        });
}

function getLogin (req,res,next){
    res.render('login.hbs');
}

function postLogin(req,res,next){
    const {username, password} = req.body;

    models.userModel.findOne({ username }).then((user) => {
        Promise.all([user, user.matchPassword(password)])
            .then(([user, match]) => {
                if (!match) {
                    
                    errorHandler(res, 'auth', 'Wrong username or password!');
                    res.render('login.hbs', { username, password });
                    return;              
                }

                const token = jwt.createToken({ id: user._id });

                res
                    .cookie(cokieName, token)
                    .redirect('/expenses');
            })
    }).catch(error =>{
        errorHandler(res, 'auth', 'Wrong username or password!');
        res.render('login.hbs', { username, password });
    })
}

function logout(req,res,next){
    res.clearCookie(cokieName).redirect('/');
}

module.exports = {
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logout
}