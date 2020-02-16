const cokieName = require('../cookieName')
const models = require('../models')

function getHome (req,res,next){
    const user = req.user;
    const hbsObject = {
        isLoggedIn:req.cookies[cokieName] !== undefined
    }

  res.render('home.hbs' ,hbsObject);
}

function getReport(req,res,next){

    const {user} =req.user
    console.log(user);

    models.expensesModel.find()
    .then(expenses =>{
        const hbsObj = {
            isLoggedIn: req.cookies[cokieName] !== undefined,
            expenses,
            user
        }
        res.render('expenses.hbs',hbsObj);
    })
    
}

module.exports = {
    getHome,
    getReport
}