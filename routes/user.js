var express = require('express');
var router = express.Router();


router.get('/register', function(req, res) {
    res.render("Register")
});

router.post('/register', async function(req, res, next) {
    var user = new User("");
    username = req.body.regusername
    password = req.body.regpass
    email = req.body.regemail
    await user.register(username, password, email)
    req.session.user = user
    req.session.save()
     res.redirect("/")
});

router.get('/login', function(req, res) {
    res.render("Login")
});

router.get('/logout', function(req, res) {
    console.log(req.session.user)
    req.session.user = null

    res.redirect("/")
});


router.post('/login', async function(req, res, next) {

    username = req.body.logusername
    password = req.body.logpass
    Parse.User.logIn(username, password).then( async function(result) {
        user =  new User(result.id)
        await user.fetchUser(result.id)
        req.session.user = user
        req.session.save()
        res.redirect("/")
    }, function(error) {
        console.log(error)
    });
})

module.exports = router;
