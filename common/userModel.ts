const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name : {
        type:String
    },
    dept : {
        type:String
    },
    ph : {
        type :String
    },
    loc : {
        type:String
    }
});


export const User:any =  mongoose.model('User',userSchema);