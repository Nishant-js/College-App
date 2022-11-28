const mysql = require('mysql2');
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

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
    var feedbackuser = req.body.feedbackuser;
    var nameusr = req.body.feedbackuser;
    var emailuser = req.body.emailuser;
    connection.query("insert into feedback(nameusr,emailuser,feedbackuser) values(?,?,?)", [nameusr, emailuser, feedbackuser]);
    res.end();
})

app.listen(4500);