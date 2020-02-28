const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const router = express.Router();

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

router.route("/logout").get(
    function (req, res) {
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
    }
)

router.route("/userInfo").get(

    function(req, res){
        if (req.session.user != null)
        res.render('userInfo');
        else
        res.render('userLogin');
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

router.route("/Register").post(
    function (req, res) {
            var newUser = new user(
                {
                    username: req.body.username,
                    password: req.body.password,
                    is_admin: false
                }
            );
            newUser.save();     
            res.render('userLogin')
    }
);

module.exports = router;