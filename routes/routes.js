const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

router.route("/").get(

    function(req, res){
        res.render('index')
    }
)

module.exports = router;