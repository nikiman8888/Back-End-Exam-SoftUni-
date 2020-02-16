const models = require('../models');
const errorHandler = require('../utils/handleErrors')

function getCreate (req,res,next){
    res.render('new-expense.hbs');
}

function postCreate(req,res,next){
    const{merchant,total,category,description,report} = req.body
    let date = new Date;
    let saveDate = {year:date.getFullYear(),month:date.getMonth(),day:date.getDate()}
    
    //const {id} = req.params;
    const { user } = req;

    const isChecked = report === 'on'
    
    models.expensesModel.create({ merchant,total,category,description,report:isChecked,creator:user._id,date:saveDate})
    .then(cube => {
        res.redirect('/expenses');
      }).catch(err =>{
        
            errorHandler(res, 'auth', err);
            res.render('new-expense.hbs', );
      })
}

function getReport(req,res,next){

    const expenseId = req.params.id;
    const user = req.user;

    models.expensesModel.findById(expenseId)
    .then(expense =>{
        const hbsObj = {
            user,
            expense
    
        }
        res.render('report.hbs',hbsObj)
    })
}

function getDelete(req,res,next){
    const {id} = req.params;
    models.expensesModel.findByIdAndDelete({_id:id})
    .then(deleted =>{
        res.redirect('/expenses')
    })
    .catch(err =>{
        console.log(err)
    })
}


module.exports = {
    getCreate,
    postCreate,
    getReport,
    getDelete
}