var express = require('express');
var router = express.Router();


router.get('/register', function(req, res) {
    res.render("Register")
});

router.post('/register', function(req, res) {
    var user = new Parse.User();
    username = req.body.username
    password = req.body.password
    email = req.body.email

    user.set("username", username);
    user.set("password", password);
    user.set("email", email);

    try {
        user.signUp();
    // Hooray! Let them use the app now.
    } catch (error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
    }
    res.render("Register")
});

router.get('/login', function(req, res) {
    res.render("Login")
});

router.get('/logout', function(req, res) {
    console.log(req.session.user)
    req.session.user = null

    res.redirect("/")
});


router.post('/login', function(req, res, next) {

    username = req.body.logusername
    password = req.body.logpass
    console.log(username,password)
    Parse.User.logIn(username, password).then(function(result) {
        req.session.user = result
        req.session.save()
        console.log(req.session.user)
        res.redirect("/")
    }, function(error) {
        console.log(error)
    });
})

module.exports = router;
