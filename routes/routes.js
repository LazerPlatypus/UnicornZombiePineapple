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




const router = express.Router();

router.route("/").get(

    function(req, res){
        res.render('index')
    }
)

module.exports = router;