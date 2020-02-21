const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const DealerSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    stock:[{type:Schema.Types.ObjectId, ref:"item"}]
    ,
    details:{
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    }
});
const DealerModel =  mongoose.model('dealer',DealerSchema);
module.exports = DealerModel;