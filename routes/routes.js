const express = require('express');
const mongoose = require('mongoose');

var databaseUrl = "mongodb+srv://Admin:Admin123@cluster-hsisi.mongodb.net/test?retryWrites=true&w=majority"
var userCollectionName = "users";

mongoose.connect(databaseUrl, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    score : Number,
    gamesPlayed : Number,
    gameName : String,
    losses : Number,
    wins : Number,
    isAdmin : Boolean
});

const User = mongoose.model(userCollectionName, UserSchema);

const router = express.Router();

router.route("/").get(

    function(req, res){
        res.render('index')
    }
)

router.route("/login").get(
    function(req, res) {
        res.render('login');
    }
)

router.route("/gameScreen").get(
    
    function(req, res){
        res.render('game')
    }
)

router.route("/userInfo").get(

    function(req, res){
        res.render('userInfo')
    }
)

module.exports = router;