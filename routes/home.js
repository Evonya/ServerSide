const express = require('express');
const router = express.Router();

const linksForHome = 
[ {url: 'https://www.itsligo.ie/' , text: 'IT Sligo Home Page'},
{url: 'https://www.linkedin.com/in/jacques-remy-015268198/', text: 'My linkedin'},
{url: 'https://www.facebook.com/jacques.remy69/', text:'My Facebook'}];


router.get('/',  (req, res) => {

    var message = "";
     
    if (req.signedCookies.tracking){
        var dateLastVisit = req.signedCookies.tracking;
        var message = "Welcome back, you last visited on :" + dateLastVisit;
    }

    var currentDate = new Date();

    res.cookie ('tracking', currentDate.toDateString(), {signed: true});
    res.render('home', {'message': message, links : linksForHome});
});

router.get('/about',  (req, res) => {
    res.render('about', {links : linksForHome})
});

router.get('/contact',  (req, res) => {
    res.render('contact', {links : linksForHome})
});

module.exports = router;