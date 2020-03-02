const express = require("express");
const session = require("express-session");
var routes = require("./routes/routes");
const path = require('path')
const bcrypt = require('bcrypt');
const app = express();
let port = 3000;

app.use(session({
    username : null,
    userId : null,
    isAdmin : null,
    secret: 'ooga',
    cookie: { }
}));

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname+'/public')))

app.use("/", express.urlencoded({ extended: true }), routes);

app.listen(port, function(){
    console.log("Listening on port: " + port);
});



