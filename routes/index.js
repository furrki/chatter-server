var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    console.log(req.session.user)
    if(req.session.user){
        res.render("Home")
    } else {
        res.render("Public_Home")
    }
});

router.get('/map', function(req, res) {
    console.log(req.session.user)
    isLogged = req.session.user !== undefined
    res.render("Map", {
        isLogged: isLogged
    })

});

module.exports = router;
