var express = require("express")
var app = express();

app.get('/', function(req, res) {
    res.send('Welkom bij de hello world pagina!');
});