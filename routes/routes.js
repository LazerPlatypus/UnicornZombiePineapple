const express = require('express');
const mongo_controller = require('../scripts/mongo_controller.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;


// var databaseUrl = "mongodb+srv://Admin:Admin123@cluster-hsisi.mongodb.net/test?retryWrites=true&w=majority"
// var userCollectionName = "users";

// mongoose.connect(databaseUrl, {
//     useNewUrlParser : true,
//     useUnifiedTopology : true
// });

// const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
    username : String,
    password : String,
    userId : Number,
    score : Number,
    gamesPlayed : Number,
    gameName : String,
    losses : Number,
    wins : Number,
    isAdmin : Boolean
});

// const User = mongoose.model(userCollectionName, UserSchema);

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
    async function (req, res) {
        var user;
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
            }
        });
        var user = await User.findOne({username:req.body.username});
        var valid = false;
        var valid = false;
        if(user){
            valid = await bcrypt.compare(req.body.password, user.password);
        }

        if(user && valid){
            console.log(user);
            req.session.username = user.username;
            req.session.userId = user._id;
            req.session.isAdmin = user.roles.includes("Admin");
            res.redirect("/games");
        }else{
            req.session.username = null;
            req.session.userId = null;
            req.session.isAdmin = null;

            var model = {
                title : "Login Page",
                message: "Failed login!"
            }

            res.render("userLogin", model);
        }
    }
);

router.route("/logout").get(
    function (req, res) {
        // Need to clear our session logout
        req.session.username = null;
        req.session.userid = null;
        req.session.isAdmin = null;

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

    function(req, res){
        res.render('userRegister')
    }
)

router.route("/register").post(
    function(req,res){

    }
)

module.exports = router;