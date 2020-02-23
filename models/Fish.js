const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const FishSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    scientificname:{
        type: String,
        required:true
    },
    maxlength:{
        type: Number,
        required:true
    },
    temperament:{
        type: String,
        default:"Unknown"
    },
    habitat:{
        type: String,
        default:"Unknown"
    },
    description:{
        type: String,
        default:"Not Available"
    },
    picture:{
        type: Array,
        default: []
    }
});
const FishModel =  mongoose.model('fish',FishSchema);
module.exports = FishModel;
