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



router.get('/addnew', (req, res) =>{    
    res.render('personform', {links : linksForHome})
})

/*router.post('/addnew', (req, res) => {
    console.log("Data sent via post");
    console.table(req.body);
    res.redirect(303, 'personadded',)
})*/

router.get('/personadded', (req, res) =>
    res.render('personadded', {links : linksForHome})
)


    


router.get('/:name', (req, res) => {
    var name = req.params.name;
    
    if (!data[name]) {
        res.render('404')
    }
    else {
        res.render('person', { person: data[name], links : linksForHome });
    }
})
        

router.get('/', (req,res) =>
    res.render('listing', { listing: data, links : linksForHome }))

module.exports = router;