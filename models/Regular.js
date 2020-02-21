const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const RegularSchema = new Schema({
    firstname:{
        type: String,
        required:true
    },
    lastname:{
        type: String,
        required:true
    },
   
    details:{
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    },
    favfish:{
        type: Array,
        default:[]
    },
    aqlevel:{
        type: Number,
        default:0
    }
});
const RegularModel =  mongoose.model('reguser',RegularSchema);
module.exports = RegularModel;
