var mongoose = require("mongoose");
var Cate = require('../modules/cate.module');

exports.create = function(req, res, next) {
    const cate = new Cate(req.body);

    cate.save(function(err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data);
        }
    });
}

exports.update = function(req, res, next) {
    const cate = new Cate(req.body);
    const id = req.params.id;

    Cate.findByIdAndUpdate(id, { $set: req.body }, { new: false }).then(
        data => {
            res.json(data);
        }
    );
};
exports.remove = function(req, res, next) {
    var id = req.params.id;
    var ids = [];
    Cate.findOne({ _id: id }, function(err, doc) {
        if (doc) {
            ids = [doc._id];
            doc.getChildren(function(err, docs) {
                for (let i = 0; i < docs.length; i++) {
                    ids.push(docs[i]._id);
                }
                Cate.remove({ _id: { $in: ids } }).then(data => {
                    res.json({ "message": "deletes ok!" })
                })
            })
        }
    })
};
exports.removes = function(req, res, next) {
    console.log( req.body.ids)
    var ids = req.body.ids;
        if (ids.length>0) {
            Cate.remove({_id:{$in :ids}})
            .then(data=>{
                res.json({ "message": "removes deletes ok!" })
            })
        }
};
function reverseTree(data, pid) {
    var result = [];
    var temp;
    //原来传进来的data是数据模型对象，需要转成字符串，再转成object，此时的就变成了普通的javas对象
    var data = JSON.parse(JSON.stringify(data));
    for (var i in data) {
        if (data[i].parentId == pid) {
            result.push(data[i]);
            temp = reverseTree(data, data[i]._id);
            if (temp.length > 0) {
                data[i].children = temp;
            }
        }
    }
    return result;
}
exports.list = function(req, res, next) {
    var type = req.params.type||0;
    Cate.find({type:type}, function(err, data) {
        var rpTree = reverseTree(data, null);
        res.json(rpTree);
    })
};