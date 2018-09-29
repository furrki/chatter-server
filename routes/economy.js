var express = require('express');
var router = express.Router();
router.get('/', function(req, res) {
    res.render("Template",{
        page:"Economy",
        args: {
            
        }
    })
});
module.exports = router;
