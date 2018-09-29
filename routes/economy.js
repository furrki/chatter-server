var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    res.render("Template",{
        page:"AllCurrencies",
        args: {

        }
    })
});
router.get('/currency', function(req, res) {
    res.render("Template",{
        page:"AllCurrencies",
        args: {

        }
    })
});
router.get('/currency/:name', function(req, res) {
    res.render("Template",{
        page:"Currency",
        args: {
            name: req.params.name
        }
    })
});
module.exports = router;
