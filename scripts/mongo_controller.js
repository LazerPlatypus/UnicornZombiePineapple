// imports
const mongoose = require('mongoose');

// consts
const databaseUrl = "mongodb+srv://Admin:Admin123@cluster-hsisi.mongodb.net/test?retryWrites=true&w=majority"
const userCollectionName = "users";

// connect to database
mongoose.connect(databaseUrl, {
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => console.log("Connected to Database"))
.catch(err => {console.log(Error, err.message) });

// define Schema
const Schema = mongoose.Schema;

// create user schema
const UserSchema = new Schema({
    username : String,
    password: String,
    score : Number,
    games_played : Number,
    losses : Number,
    wins : Number,
    is_admin : Boolean
});

// create user object
exports.user = mongoose.model(userCollectionName, UserSchema);

exports.createUser = (user, callback) => {
    this.user.find({user:user.username}, (err, found_user) => {
        if (err) {
            return callback(undefined, err);
        }

        if (found_user[0]) {
            return callback(undefined, 'Username already Exists!');

        } else {
            password_manager.encryptPassword(user.password, (err, hash) => {
                if (err) {
                    return callback(undefined, err);
                }
                if (hash) {
                    let new_user = createBlankUser(username, hash);
                    new_user.save();
                    // build safe user
                    let safe_user = createSafeUser(new_user);
                    return callback(safe_user, 'User created Successfully!');
                } else {

                    return callback(undefined, 'Error in creating password.');
                }
            });
        }
    });
}

exports.loginUser = (username, password, callback) => {
    this.user.find({username: username}, (err, found_user) => {
        if (err) {
            return callback(undefined, err);
        }

        if (found_user[0]) {
            password_manager.checkPasswordAgainstHash(password, found_user[0].password, (err, passwords_match) => {
                if (err) {
                    return callback(undefined, err);
                }
                if (passwords_match) {
                    let safe_user = createSafeUser(found_user[0]);
                    return callback(safe_user, 'Logged in successfully');
                } else {
                    return callback(undefined, 'Incorrect Username or Password');
                }
            });
        } else {
            return callback(undefined, 'Incorrect Username or Password');
        }
    });
}

exports.edit_user = (user, callback) => {
    this.user.find({_id:user.id}, (err, found_user) => {
        if (err) {
            return callback(undefined, err);
        }

        if (found_user[0]) {
            found_user[0].score = user.score;
            found_user[0].games_played = user.games_played;
            found_user[0].losses = user.losses;
            found_user[0].wins = user.wins;

            found_user[0].save();

            let safe_user = createSafeUser(found_user);
            return callback(safe_user, 'Stats saved');
        } else {
            return callback(undefined, 'User not found');
        }
    });
}

exports.getHighScores = (callback) => {
    this.user.find({}, `username score`, {sort: {score: descending}}, (err, leaderboard) => {
        if (err) {
            return callback(undefined);
        }

        if (leaderboard) {
            return callback(leaderboard)
        } else {
            return callback(undefined);
        }
    });
};

// helper functions
const createBlankUser = (username, hash) => {
    let user = new this.user({
        username: username,
        password: hash,
        score: 0,
        gamesPlayed: 0,
        losses: 0,
        wins: 0,
        isAdmin: false
    });
    return user;
};

const createSafeUser = (user) => {
    let safe_user = {
        id: user.id,
        username: user.username,
        score: user.score,
        gamesPlayed: user.gamesPlayed,
        losses: user.losses,
        wins: user.wins,
        isAdmin: user.isAdmin
    };
    return safe_user;
};
