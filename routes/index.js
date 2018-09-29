var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {

    if(req.session.user){
        res.render("Template",{
            page:"Home",
            args: {
                name:"furrki"
            }
        })
    } else {
        res.render("Template",{
            page:"Public_Home",
            args: {
                name:"furrki"
            }
        })
    }
});

router.get('/map', function(req, res) {
    res.render("Template",{
        page:"Map",
        args: { 
        }
    })

});

module.exports = router;
