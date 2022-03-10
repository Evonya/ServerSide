const express = require('express');
const router = express.Router();

const linksForHome = 
[ {url: 'https://www.itsligo.ie/' , text: 'IT Sligo Home Page'},
{url: 'https://www.linkedin.com/in/jacques-remy-015268198/', text: 'My linkedin'},
{url: 'https://www.facebook.com/jacques.remy69/', text:'My Facebook'}];

var data = {"baptiste" : { "name": "baptiste Prevot",
         "dob": "06/11/2002",
        "imageurl": "/images/baptiste.jpeg",
        "hobbies": ["Can drink alcohol endlessly"]},

"cyriaque" :  { "name": "cyriaque Devisme",
        "dob": "03/05/2002",
       "imageurl": "/images/cyriaque.jpg",
       "hobbies": ["Can eat without gaining fat"]},
    
"jacques" : { "name": "jacques REMY",
        "dob": "06/08/2002",
        "imageurl": "/images/jacquesimage1.jpg",
        "hobbies": ["Put himself in the friends category"]},
        
"amine" : { "name": "amine LATTI",
        "dob": "24/12/2001",
        "imageurl": "/images/amineimage1.jpg",
        "hobbies": ["Fight alone against 7 guys"]},

"jose" : { "name": "jose Alberola Torres",
        "dob": "06/02/1999",
        "imageurl": "/images/jose.jpeg",
        "hobbies": ["Create beautiful website"]}, 
    }

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