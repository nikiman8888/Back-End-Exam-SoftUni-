const mongoose = require('mongoose');
const auth = require('../utils/auth');
const controllers = require('../controllers')



module.exports = (app) =>{
    app.get('/delete/:id',controllers.expenseController.getDelete);

    app.get('/report/:id',auth(),controllers.expenseController.getReport);

    app.get('/create',auth(),controllers.expenseController.getCreate);
    app.post('/create',auth(),controllers.expenseController.postCreate)

    app.get('/expenses',auth(),controllers.homeController.getReport);
    
    app.post('/register',controllers.userController.postRegister);
    app.get('/register',controllers.userController.getRegister);

    app.get('/login',controllers.userController.getLogin);
    app.post('/login',controllers.userController.postLogin);

    app.get('/logout',auth(),controllers.userController.logout);
    
    app.get('/',auth(false),controllers.homeController.getHome);
        
    app.all('*',auth(false),(req,res) =>{
        res.render('404.hbs')
    })
}