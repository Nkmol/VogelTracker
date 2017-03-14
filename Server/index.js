var express = require("express")
var app = express();

// set the port of our application
// process.env.PORT lets the port be set by Heroku
var port = process.env.PORT || 80;

app.get('/', (req, res) =>
    res.send('Welkom bij de hello world pagina!'));

app.listen(port , () => console.log("Started server on port " + port));
