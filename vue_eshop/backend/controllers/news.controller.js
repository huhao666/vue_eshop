var mongoose = require("mongoose");
var News = require('../modules/news.module');

exports.create = function(req, res, next) {
    const news = new News(req.body);

    news.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
}

exports.update = function(req, res, next) {
    const news = new News(req.body);
    const id = req.params.id;

    News.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
        res.json(data);
    });
};
exports.remove = function(req, res, next) {
    const id = req.params.id;

    News.findByIdAndRemove(id, function(err, data) {
        res.json({ message: "delete ok" });
    });
};
exports.removes = function(req, res, next) {
    //console.log( req.body.ids)
    var ids = req.body.ids;
    if (ids.length>0) {
        User.remove({_id:{$in :ids}})
        .then(data=>{
            res.json({ "message": "removes deletes ok!" })
        })
    }
};
exports.list = function(req, res, next) {
    var page = (req.body.page) ? req.body.page : 1;
    var limit = (req.body.limit) ? req.body.limit : 3;
    //查询条件
    var queryCondition = {};

    if (req.body.cateId && req.body.cateId.trim().length) {
        cateId = req.body.cateId;
        queryCondition = {
            cateId: cateId
        }
    }

    if (req.body.name && req.body.name.trim().length) {
        name = req.body.name;
        queryCondition = {
            "name": new RegExp(name,"i")
        }
    }

    News.paginate(queryCondition, { page: page, limit: limit }, function(
        err,
        results
    ) {
        res.json(results);
    });

};