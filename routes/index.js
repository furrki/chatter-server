var express = require('express');
var router = express.Router();
router.get('/', async function(req, res) {
    if(req.session.user){
        Parse.Cloud.run('buyCurrency', {
            "buyName": "PhoboCoin",
            "sellName": "DeimoCoin",
            "buyAmount": 5
         }, { sessionToken: req.session.user.sessionToken }).then(function(a) {
            console.log(a)
        });
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
