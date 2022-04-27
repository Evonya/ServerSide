const express = require('express');
const { readFriends , createFriends, deleteFriends, updateFriends } = require('../models/friends');
const router = express.Router();

const linksForHome = 
[ {url: 'https://www.itsligo.ie/' , text: 'IT Sligo Home Page'},
{url: 'https://www.linkedin.com/in/jacques-remy-015268198/', text: 'My linkedin'},
{url: 'https://www.facebook.com/jacques.remy69/', text:'My Facebook'}];



// Get method to add a new person
router.get('/addnew', async (req, res) => {
    res.render('personform', {links : linksForHome})
})


// Get method when the person is added
router.get('/personadded', (req, res) =>
    res.render('personadded', {links : linksForHome})
)


    
// Get method to go on the information page about the person

router.get('/:name', async (req, res) => {
    var name = req.params.name;

    const person = await readFriends({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('person', { person: person, links : linksForHome });
    }
})

// Get method to delete a person

router.get('/:name/delete', async (req, res) => {
    var name = req.params.name;

    await deleteFriends(name);

    req.session.flash =    
    { type: 'success', intro: 'Data Deleted:', message:  "Data for <strong>" +
     name + "</strong> has been updated"};
    

    res.redirect(303, '/friends');

});

// Get method to edit a person

router.get('/:name/edit', async (req, res) => {

    var name = req.params.name;

    const person = await readFriends({'name': name})

    if (!person) {
        console.log('404 because person doesn\'t exist');
        res.render('404');
    }
    else {
        res.render('friendseditform', { person: person, links : linksForHome });
    }
})

// Post method to edit a person

router.post('/:name/edit', async (req,res) =>{

    await updateFriends(req.body);

    req.session.flash =    
    { type: 'success', intro: 'Data Updated:', message:  "Data for <strong>" +
     req.body.name+ "</strong> has been updated"};
    
    res.redirect(303, '/friends')

})

// Post method to add a new person

router.post('/addnew', async (req, res) => {

    // note we leave error handling for now and assume our data is created.
    
        await createFriends(req.body);
        req.session.flash =    
        { type: 'success', intro: 'Data Saved:', message:  "Data for <strong>" +
         req.body.name+ "</strong> has been added"};
 
        res.redirect(303, '/friends/personadded')
    })
        
// Get method to see all the person on the friends page

router.get('/', async (req, res) =>
{
    const friends = await readFriends();

    if (req.session.friendsdata){
        var newName = req.session.friendsdata.name;
    }
    else {
        var newName = ""
    }

    res.render('listing', { personlist: friends, newName : newName, links : linksForHome })
    
})
    

module.exports = router;