const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 9;

const expencesSchema = new mongoose.Schema({
    merchant: {
        type: String,
        required: true,
       
       // minlength: [5, 'Username should be at least 5 characters!'],
       // validate: {
       //     validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
       //     message: 'Username should consist only with English letters and digits!'
       // }
    },
    date: {
        //type: Date,
        type:Object,
        required: true,
       //default:Date.now()

        
    },
    total: {
        type:Number,
        required:true,
        
    },
    category:{
        type:String,
        required:true
    },
    description: {
        type:String,
        required:true,
        minlength:[10,'Length must be minimum 10 charachters'],
        maxlength: [50,'Length must be max 50 charachters']
    },
    report: {
        type:Boolean,
        required: true,

    },
    creator: {type:mongoose.Schema.Types.ObjectId, ref:'User'}
    
});

module.exports = mongoose.model('Expenses',expencesSchema);



