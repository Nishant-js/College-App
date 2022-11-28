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

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var aid = req.body.username;
    connection.query("select * from logindetails where user_email = ? and user_key = ?", [username, password], function(error, results, fields) {
        if (results.length > 0) {
            res.redirect("/welcome");

            connection.query("insert into activeUser(activeID) values(?)", [aid]);

        } else {
            res.redirect("/");
        }
        res.end()
    })
})


app.get("/welcome", function(req, res) {
    res.sendFile(__dirname + "/welcome.html");
})

app.get("/contactus", function(req, res) {
    res.sendFile(__dirname + "/contactus.html");
})

app.get("/logo", function(req, res) {
    res.sendFile(__dirname + "/logo.jpg");
})

app.get("/sem", function(req, res) {
    res.sendFile(__dirname + "/sem.jpg");
})

app.get("/sample", function(req, res) {
    res.sendFile(__dirname + "/sample.html");
})


// function logout() {

//     app.post("/", encoder, function(req, res) {
//         alert("logging out.........");
//         var aid = req.body.username;
//         connection.query("delete from activeUser", [aid], function(error, results, fields) {
//             res.sendFile(__dirname + "/index.html");
//             res.end();
//         })
//     })
// }

app.listen(4500);