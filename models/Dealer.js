const mongoose  = require('mongoose');
const Schema = mongoose.Schema;
const DealerSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    stock:[{type:Schema.Types.ObjectId, ref:"item"}]
});
const DealerModel =  mongoose.model('dealer',DealerSchema);
module.exports = DealerModel;