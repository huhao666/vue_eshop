var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var schema = new mongoose.Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    cateId:mongoose.Schema.ObjectId
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model("News", schema);