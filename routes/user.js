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


router.post('/login', async function(req, res) {

    username = req.body.username
    password = req.body.password

    Parse.User.logIn(username, password, {
          // If the username and password matches
          success: function(user) {
              res.render("Register")
          },
          // If there is an error
          error: function(user, error) {
              res.render("Login")
          }
      });
})

module.exports = router;
