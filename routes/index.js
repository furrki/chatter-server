var express = require('express');
var router = express.Router();

function ensureAuthenticated(req, res, next){
    if(!req.session.user){
        res.redirect('/');
    }
    return next();
}

router.get('/', async function(req, res) {
    if(req.session.user){
        const query = new Parse.Query(User);
        const people = await query.find();
        res.render("Template",{
            page:"Home",
            args: {
                users: people
            }
        })
    } else {
        res.render("Template",{
            page:"Public_Home",
            args: {
            }
        })
    }
});
router.get('/room/:user', ensureAuthenticated, async function(req, res) {
    const query = new Parse.Query(User);
    query.equalTo("username", req.params.user);  // find all the women
    const user = await query.find();

    const params =  { who: user[0].id };
    const cr = await Parse.Cloud.run("createRoom", params);

    res.render("Template",{
            page:"Room",
            args: {
                username: req.params.user,
                to: user[0].id
            }
    })

});

module.exports = router;
