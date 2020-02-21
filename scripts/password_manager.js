const bcrypt = require('bcrypt');
const saltRounds = 10;

// no logging here. it is the class that implements this class's
// responsibility to log errors & status's.
exports.encrypt_password = (password, callback) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) {
            // return the error and an undefined hash
            return callback(err, undefined);
        }
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) {
                // return the error and an undefined hash
                return callback(err, undefined);
            }
            if (hash) {
                // return an undefined error, and the hash
                return callback(undefined, hash);
            }
        });
    });
}

exports.check_password_against_hash = (password, hash, callback) => {
    bcrypt.compare(password, hash, (err, password_hash) => {
        if (err) {
            // return error
            // passwords don't match: return false.
            return callback(err, false);
        }
        if (password_hash) {
            // return undefined error
            // passwords match: return true
            return callback(undefined, true);
        } else {
            // return undefined error
            // passwords don't match: return false
            return callback(undefined, false);
        }
    });
}