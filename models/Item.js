const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const ItemSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    quantity:{
        type: Number,
        default:0
    },
    seller:{
        type: Schema.Types.ObjectId, 
        ref: 'dealer',
        required: true
    }
});
const ItemModel =  mongoose.model('item',ItemSchema);
module.exports = ItemModel;