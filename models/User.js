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
    salt:{
        type: String,
        required:true
    },
    profilepicture:{
        type: String,
        default:""
    },
    date:{
        type:Date,
        default:Date.now
    },
    typeref: {
        type: Schema.Types.ObjectId,
        refPath: 'usertype'
      },
    usertype:{
        type: String,
        required: true,
        enum: ['reguser', 'dealer']
      }
});
const UserModel =  mongoose.model('user',UserSchema);
module.exports = UserModel;
