var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');


var schema = new mongoose.Schema({
    name: {type: String},
    content: {type: String},
    date: { type: Date, default: Date.now },
    newId:mongoose.Schema.ObjectId
});

schema.plugin(mongoosePaginate);

module.exports =  mongoose.model('Comment',  schema); // Model.paginate()