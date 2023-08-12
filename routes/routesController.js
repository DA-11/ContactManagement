const express = require('express');
const Contactrouter = express.Router();
const {getContacts,
    getContact,
    updateContact,
    createContact,
    delContact,
    getContactbyName,
    getContactbyPhoneNo,
    getContactbyEmail} = require('../controller/controller');
/* The Express Router() function returns a router object which can be exported. 
we can define multiple router objects and export all of them and use them in different logical application 
ex: we can define router1 for handling all requests related to user detail, same way router2 for handling all requests related to search and so on 
this makes it easier to manage code and increases readability and the router object we export acts as a middleware  
*/

const validateToken = require('../middleware/validateTokenHandler');

Contactrouter.use(validateToken);

Contactrouter.route('/getContacts').get(getContacts)

Contactrouter.route('/getContact/:id').get(getContact)


Contactrouter.route('/getContactbyName/:name').get(getContactbyName)
Contactrouter.route('/getContactByPhoneNo/:phone').get(getContactbyPhoneNo)
Contactrouter.route('/getContactByEmail/:mail').get(getContactbyEmail)


Contactrouter.route('/updateContact/:id').put(updateContact)

Contactrouter.route('/createContact').post(createContact)

Contactrouter.route('/delContact/:id').delete(delContact)
    
module.exports = Contactrouter;