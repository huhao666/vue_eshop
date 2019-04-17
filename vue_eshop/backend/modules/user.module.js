var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");

var schema = new mongoose.Schema({
    name: String,
    password: String,
    mail: String,
    city: String,
    date: { type: Date, default: Date.now },
    gender: String,
    interest: [],
    desc: String,
    commentCount:Number
});
schema.plugin(mongoosePaginate);

module.exports = mongoose.model("User", schema);