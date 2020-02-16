const mongoose =  require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 9;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [4, 'Username should be at least 4 characters!'],
        validate: {
            validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
            message: 'Username should consist only with English letters and digits!'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Password should be at least 8 characters!'],
        
        
    },
    amount: {
        type:Number,
        required:true,
        default:0
    },
    expenses: [{type:mongoose.Schema.Types.ObjectId, ref:'Expenses'}]
    
});
userSchema.methods = {
    matchPassword: function(password){
        return bcrypt.compare(password,this.password);
    }
}

userSchema.pre('save',function(next){
    if(this.isModified('password')){
        bcrypt.genSalt(saltRounds,(err,salt) =>{
            if(err){next(err);return;}
            bcrypt.hash(this.password,salt,(err,hash) => {
                if(err){next(err);return}

                this.password = hash;
                next();
            })
        })
        return;
    }
    next();
})


module.exports = mongoose.model('User',userSchema);



