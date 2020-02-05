const express = require('express');
const mongoose = require('mongoose');

var databaseUrl = "mongodb+srv://Admin:Admin123@cluster-hsisi.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(databaseUrl, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Connected to Database"))
.catch(err => {console.log(Error, err.message) });

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    score : Number,
    gamesPlayed : Number,
    gameName : String,
    losses : Number,
    wins : Number
});

/*
Score - int
Games played - int
Game Name / ID - varchar(max)
Losses - int
Wins - int
*/


const router = express.Router();

router.route("/").get(

    function(req, res){
        res.render('index')
    }
)

router.route("/gameScreen").get(
    
    function(req, res){
        res.render('game')
    }
)

module.exports = router;