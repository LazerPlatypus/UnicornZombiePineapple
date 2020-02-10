const express = require("express");
var routes = require("./routes/routes");
const path = require('path')
const app = express();
let port = 3000;

app.set("view engine", "pug");
app.use(express.static(path.join(__dirname+'/public')))

app.use("/", routes);

app.listen(port, function(){
    console.log("Listening on port: " + port);
});
