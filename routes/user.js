var express = require('express');
var router = express.Router();


router.get('/register', function(req, res) {
    res.render("Register")
});

router.post('/register', async function(req, res, next) {
    var user = new User();
    username = req.body.regusername
    password = req.body.regpass
    email = req.body.regemail
    await user.register(username, password, email)
    req.session.user = user
    req.session.save()
    res.redirect("/")
});

router.get('/login', function(req, res) {
    res.redirect("/")
});

router.get('/logout', function(req, res) {
    req.session.user = undefined
    res.redirect("/")
});


router.get('/login/:token',  function(req, res, next) {
    req.session.user = req.params.token
    res.redirect("/")

})

module.exports = router;
