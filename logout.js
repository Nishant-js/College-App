const mysql = require('mysql2');
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const { application } = require("express");

const app = express();

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3345",
    database: "xenon"
});

connection.connect(function(error) {
    if (error) throw error
    else console.log("connected to database!!!")

});

app.post("/", encoder, function(req, res) {
    alert("logging out.........");
    var aid = req.body.username;
    connection.query("delete from activeUser", [aid], function(error, results, fields) {
        res.sendFile(__dirname + "/index.html");
        res.end();
    })
})

app.listen(4500);