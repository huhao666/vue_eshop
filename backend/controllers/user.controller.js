var mongoose = require("mongoose");
var User = require('../modules/user.module');


exports.create = function(req, res, next) {
    console.log(req.body)
    const user = new User(req.body);

    user.save(function(err, data) {
        if (err) {
            console.log(err)
        } else {
            res.json(data);
        }
    })
}

exports.update = function(req, res, next) {
    const user = new User(req.body);
    const id = req.params.id;

    User.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(data => {
        res.json(data);
    });
};

exports.remove = function(req, res, next) {
    const id = req.params.id;

    User.findByIdAndRemove(id, function(err, data) {
        res.json({ 'message': 'delete ok' });
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
    var queryCondition = {};
    if (req.body.name && req.body.name.trim().length) {
        name = req.body.name;
        queryCondition = {
            "name": new RegExp(name, "i")
        }
    }
    User.paginate(queryCondition, { page: page, limit: limit }, function(err, results) {
        res.json(results);
    })

};