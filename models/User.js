const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  
    email:{
        type: String,
        required:true
    },
    address:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    profilepicture:{
        type: String
    },
    date:{
        type:Date,
        default:Date.now
    }
});
const UserModel =  mongoose.model('user',UserSchema);
module.exports = UserModel;
