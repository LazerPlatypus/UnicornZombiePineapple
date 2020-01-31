const express = require("express");


let port = 3000;

const app = express();


app.set("view engine", "pug");

var routes = require("./routes/routes");
app.use("/", routes);

app.listen(port, function(){
    console.log("Listening on port: " + port);
});
