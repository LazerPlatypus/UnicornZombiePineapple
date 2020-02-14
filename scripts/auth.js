exports.requireLogin = (req, res, callback) => {
    if (req.session.user) {
        return callback();
    } else {
        let model = {
            title: 'Error',
            message: 'You must be logged in to view this page.'
        };
        res.redirect("/", model);
        return;
    }
}

exports.requireAdmin = (req, res, callback) => {
    if (req.session.user.isAdmin) {
        return callback();
    } else {
        let model = {
            title: 'Error',
            message: 'You must do not have the previleges to view this page.'
        };
        res.redirect("/", model);
        return;
    }
}