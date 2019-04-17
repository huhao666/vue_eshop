var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

/* GET home page. */
router.get('/', function(req, res, next) {

    var Cat = mongoose.model("Cat", { name: String, sex: Number });

    var kitty = new Cat({ name: "Zildjian", sex: 2 });
    kitty.save(function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("meow");
        }
    });
});

module.exports = router;