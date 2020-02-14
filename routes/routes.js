const express = require('express');
const mongo_controller = require('../scripts/mongo_controller.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const router = express.Router();

router.route("/").get(
    function(req, res){
        res.render('index')
    }
)

router.route("/login").get(
    function (req, res) {
        var model = {
            title : "Login Page",
            username : req.session.username,
            userId : req.session.userId,
            isAdmin : req.session.isAdmin
        }
        res.render("userLogin", model);
    }
);

router.route("/login").post(
    function (req, res) {

        mongo_controller.loginUser(req.body.username, req.body.password, (user, err) => {
            if (err) {
                var model = {
                    title: 'Login Page',
                    message: err
                };
                res.render("userLogin", model);
                return;
            }

            if (user) {
                req.session.user = user;
                res.redirect("/games")
            }
        });
    }
);

router.route("/logout").get(
    function (req, res) {
        // Need to clear our session logout
        req.session.user = null;

        res.redirect("/");
    }
);

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

router.route("/logout").get(

    function(req, res){
        res.render('index')
    }
)

router.route("/register").get(

    async function(req, res){
        res.render('userRegister')
    }
)

router.route("/register").post(
    function(req,res){ 
        mongo_controller.createUser(req.body.username, req.body.password, (user, err) => {
            if (err) {
                var model = {
                    title: 'Register Page',
                    message: err
                };
                res.render('userRegister', model);
                return;
            }
            if (user) {
                req.session.user = user;
                res.redirect("/games");
            }
        })

        res.redirect("/");
    }
)

module.exports = router;