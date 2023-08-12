const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection');
const cors = require('cors');
connectDb();
const app = express();

/*Here app is an instance of the express applications*/ 

const port = process.env.PORT || 5000 ;

/**
 * we have declared below a method called app.get which is as the name suggests a method which will run
 * on GET req on the address given as first argument the 2nd argument is a function which itself has two objects as arguments request and response
 * you can provide a third argument usually called next which is a function which you can either call or use inside the function app.get function itself
 *
 */

/*
app.get('',(req,res) => {

    const html = `<div>HELLO</div>`

    //res.send(html);
    //res.json({"message":"JSON VALUE"});
    //res.status(200).json({"Message2":"Hello"});

    const obj = {
        "Message2":"Hello",    
        "Message3":"Hello Again"
    }

    res.status(200).json(obj);

});
*/

/* There can be many many api's for which we would need to write functions bundling them all in a single file can be problamatic in the long run 
therefore to overcome this issue we can write all our functions in a new file and simply call a function app.use()
app.use takes two argument 
1st : a base uri address ex : /contacts , now everytime our server gets a request starting with /contacts '/...' something something our app.use function will redirect us to our 2nd argument 
2nd : route object, we will create a new js file and create a route object there and import in our current js file and pass the route object as the 2nd argument

the js file where route object was declared will have all the functions such as .get, .post ... which will be called accordingly depending on the request URI

app.use() is used to define middleware as the callback function in our case the callback functions are part of the router object
*/
const router = require('./routes/routesController');
const userRouter = require('./routes/userRoutesController');

app.use(cors());
app.use(express.json());

app.use('/api/contact',router);
app.use('/api/user',userRouter);

app.use(errorHandler);

app.listen(port,(req,res) => {
    console.log("Server Initiated");
});   


