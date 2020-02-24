const express = require('express');
const session = require('express-session');
const mongo_controller = require('../scripts/mongo_controller.js');
const auth = require('../scripts/auth.js');
const router = express.Router();

router.route("/").get(
    function(req, res){
        var model = {
            username: req.session.username,
            isAdmin: req.session.isAdmin
        }
        res.render('index', model)
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
            // console.log(`Err: ${err} User: ${user}`);
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
                res.redirect("/gameScreen")
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
        //auth.requireLogin(req, res, () => {
            res.render('game');
        //});
    }
)

router.route("/userInfo").get(

    function(req, res){
        auth.requireLogin(req, res, () => {
            res.render('userInfo', {user: req.session.user});
        });

    }
)

router.route("/logout").get(

    function(req, res){
        res.render('index')
    }
)

router.route("/register").get(
    function(req, res){

        console.log(req.session)
        res.render('userRegister')
    }
)

router.route("/register").post(
    function(req,res){ 
        mongo_controller.createUser(req.body.username, req.body.password, (user, err) => {
            // console.log(`Err: ${err} User: ${user}`);
            if (err) {
                var model = {
                    title: 'Register Page',
                    message: err
                };
                res.render('userRegister', model);
                return;
            }
            console.log(user);
            if (user) {
                console.log("there is a user");
                req.session.user = user;
                console.log(req.session);
                res.redirect("/gameScreen");
            } else {
                res.redirect("/");
            }
        })

    }
)

router.route("/leaderboard").get(
    async function(req, res){
        await mongo_controller.getHighScores(function (callback, err){
            
            model = {
                users : callback
            }
            res.render("leaderboard", model);
        }) 
    }
)

module.exports = router;