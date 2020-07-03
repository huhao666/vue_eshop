var mongoose = require("mongoose");
var materializedPlugin = require('mongoose-materialized');

var schema = new mongoose.Schema({   
    type: { type: Number },   //0新闻分类，1产品分类，2上传分类，3地区分类
    title: { type: String }
});
schema.plugin(materializedPlugin);

module.exports = mongoose.model("Cate", schema);