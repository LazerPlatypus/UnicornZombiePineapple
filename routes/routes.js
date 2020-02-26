const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();
var isLoggedIn = false;

var url = 'mongodb+srv://user:pass@cluster0-b22qb.mongodb.net/Games?retryWrites=true&w=majority';

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username : String,
    password: String,
    score : Number,
    games_played : Number,
    losses : Number,
    wins : Number,
    is_admin : Boolean
});

const user = mongoose.model("users", UserSchema);


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
    async function (req, res) {
        var User = await user.findOne({username:req.body.username});
        var valid = false;
        console.log(1);
        if(User.password == req.body){
            console.log(2);
        }
        console.log(3);
        if(User && valid){
            console.log(User);
            req.session.username = User.username;
            req.session.userId = User._id;
            req.session.isAdmin = User.roles.includes("Admin");
            res.redirect("/games");
        }else{
            console.log(4);
            req.session.username = null;
            req.session.userId = null;
            req.session.isAdmin = null;

            var model = {
                title : "Login Page",
                message: "Failed login!"
            }

            res.render("game", model);
        }
    }
);

router.route("deleteProfile").get(
    function (req, res) {
        if(user._id.includes(req.session.userId)) {
            var thisUser = user.get(user._id);
            user.deleteOne(thisUser);
        }
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
        if (req.session.user != null)
        res.render('game');
        else
        res.render('userLogin');
        //auth.requireLogin(req, res, () => {
            res.render('game', {loggedIn: isLoggedIn});
        //});
    }
)

router.route("/userInfo").get(

    function(req, res){
        if (req.session.user != null)
        res.render('userInfo');
        else
        res.render('userLogin');
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
                if(callback[i]){
                    topTenUsers.push(callback[i])
                }
            }
            
            model = {
                users : topTenUsers,
                loggedIn: isLoggedIn
            }
            res.render("leaderboard", model);
        }) 
    }
);

module.exports = router;