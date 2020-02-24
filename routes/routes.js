const express = require('express');
const session = require('express-session');
const mongo_controller = require('../scripts/mongo_controller.js');
const auth = require('../scripts/auth.js');
const router = express.Router();
var isLoggedIn = false;

router.route("/").get(
    function(req, res){
        var model = {
            username: req.session.username,
            isAdmin: req.session.isAdmin,
            loggedIn: isLoggedIn
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
            isAdmin : req.session.isAdmin,
            loggedIn: isLoggedIn
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
                    message: err,
                    loggedIn: isLoggedIn
                };
                res.render("userLogin", model);
                return;
            }

            if (user) {
                req.session.user = user;
                isLoggedIn = true;
                res.redirect("/gameScreen")
            }
        });
    }
);

router.route("/gameover").post(
    function(req, res) {
        if (req.session.user) {
            req.session.user.score += parseInt(req.body.score);
            req.session.user.games_played += 1;
            mongo_controller.edit_user(req.session.user, (err, user) => {
                if (err) {
                    console.log(err);
                }
    
                if (user) {
                    req.session.user = user;
                }
            })
        }

        res.render("gameOver", {Score: req.body.score, loggedIn: isLoggedIn});
    }
)

router.route("/logout").get(
    
    function (req, res) {
        isLoggedIn =  false;
        // Need to clear our session logout
        req.session.user = null;
        res.redirect("/");
    }
);

router.route("/gameScreen").get(
    
    function(req, res){
        auth.requireLogin(req, res, () => {
            res.render('game', {loggedIn: isLoggedIn});
        });
    }
)

router.route("/userInfo").get(

    function(req, res){
        auth.requireLogin(req, res, () => {
            res.render('userInfo', {user: req.session.user,
                loggedIn: isLoggedIn});
        });

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
                    message: err,
                    loggedIn: isLoggedIn
                };
                res.render('userRegister', model);
                return;
            }
            console.log(user);
            if (user) {
                isLoggedIn = true;
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
            var topTenUsers = []
            for(i = 0; i < 10; i++){
                topTenUsers.push(callback[i])
            }
            console.log(topTenUsers)

            model = {
                users : topTenUsers,
                loggedIn: isLoggedIn
            }
            res.render("leaderboard", model);
        }) 
    }
)

module.exports = router;