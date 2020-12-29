

 // File Stream stuff
const fs = require('fs');
const readFileSync = fs.readFileSync;
const existsSync = fs.existsSync;

// server webpage serving and endpoint handling
const express = require('express');
const expressSession = require('express-session');

// data faking
// const faker = require('faker');

// Login system
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const minicrypt = require('../server/miniCrypt');
const mc = new minicrypt();

const session = {
    secret: process.env.SECRET || 'SECRET', // set this encryption key in Heroku config (never in GitHub)!
    resave: false,
    saveUninitialized: false
};


// Database operations
const db = require('../client/dbManagement');

const app = express();
const port = process.env.PORT || 8080;

// Global variable keeping track of the currently logged in user
let user; 



const strategy = new LocalStrategy(
    async (username, password, done) => {

        // First look for user in database
        const dbQuery = await db.findUser(username);

        // console.log(userFound);

        // if user is not found
        if (dbQuery.length === 0) { // pretty sure we move the below if statement up here for error checking
            return done(null, false, { 'message': 'Wrong cred' });

        }
        // Set the global user. This is really bad and I need to figure out how to fix it
        user = dbQuery.find(item => item.username === username);

        if (!validatePassword(username, password, user)) {
            await new Promise((r) => setTimeout(r, 2000)); // two second delay
            return done(null, false, { 'message': 'Wrong password' });
        }
        // success!
        return done(null, username);
    });

function validatePassword(username, pwd, sqlUser) {
    const salt = sqlUser.salt;
    const hashedpwd = sqlUser.hashedpwd;

    if (!mc.check(pwd, salt, hashedpwd)) {
        return false;
    }
    return true;
}

app.use(expressSession(session));
passport.use(strategy);
app.use(passport.initialize());
app.use(passport.session());

// Convert user object to a unique identifier.
passport.serializeUser((user, done) => {
    done(null, user);
});
// Convert a unique identifier to a user object.
passport.deserializeUser((uid, done) => {
    done(null, uid);
});

app.use(express.json()); // allow JSON inputs
app.use(express.urlencoded({ 'extended': true })); // allow URLencoded data



// Serve css data
app.use(express.static('public'));
// Serve the webpages
app.use(express.static('client'));



// Profile Page is now a private page until logged in.
app.get('/profilePage.html', checkLoggedIn, (req, res) => {
    const path = 'private/profilePage.html';
    console.log('Trying to serve: profilePage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(readFileSync(path));
        res.end();
    }
    // res.send(readFileSync(path));
});

app.get('/profile.js', checkLoggedIn, (req, res) => {
    const path = 'private/profile.js';
    console.log('Trying to serve: profilePage');
    if (existsSync(path)) {
        res.writeHead(200, { 'Content-Type': 'text/javascript' });
        res.write(readFileSync(path));
        res.end();
    }
});

 const build = {
    pcb: null,
    pcbSwitchType: null,
    pcbCaseType: null,
    case: null,
    switch: null,
    keycap: null,
    cable: null,
    order_id:null,
    item_id:null,
    deliver:null,
    order_stat:null
}; 

// Updates the above global variable build with each call.
// Clientside access to this enforces each part of build is updated in order.
app.post('/updateParts', (req, res) => {
    // Add pcbPart to data object. 
    console.log('starting post');
    let body = '';
    req.on('data', data => body += data);
    req.on('end', async () => {
        const data = JSON.parse(body);
        console.log("Post request handling");
        console.log(data);
        console.log(data.order_id);
        console.log(data.order_stat);
        console.log(build)

       /*  build[data.partType] = parseInt(data.partID, 10);
        console.log(build); */
            build.order_id = data.order_id
            build.order_stat = data.order_stat
            console.log(build)
        // Store compatibility parameters if receiving pcb information
        if (build.order_stat === 1) {
            const tuple = await db.getOrder(build.order_id);
            console.log(tuple[0])
            build.item_id = tuple[0].item_id
            build.deliver = tuple[0].deliver_id
            /* build.pcbSwitchType = tuple[0].item_id;
            build.pcbCaseType = tuple[0].time; */
        }
        build.item_id = data.item_id

        res.writeHead(200);
        res.end('Post Request Handled');
    });

});

// Adds the build from the global variable build to the builds table with the build id from global variable user.
// Checks to make sure all variables are initializedi in build and can only be called if the user variable is set
app.get('/insertBuild', checkLoggedIn, (req, res) => {
    console.log('Trying insert');
    if (build.pcb && build.case && build.switch && build.keycap && build.cable) {
        console.log('Inserting build in table');
        db.addBuild(user.buildid, build.pcb, build.case, build.switch, build.keycap, build.cable);
        res.end();
    } else {
        console.log('Failed insert');
        res.end();
    }
});

// Removes the build for the current user.
// Should probably be renamed to removeBuild but I don't feel like checking if that breaks something.
app.get('/removePart', (req, res) => {
    db.deleteBuild(user.buildid);
    res.send('Post Request handled');
});

// Retrieves all the parts from their respective table using the ids stored in the builds table with the id from user
 app.get('/userParts', async (req, res) => {
    console.log("Trying to send: JSON response data");
    const tuple = await db.getBuild(user.buildid);
    const pcbPart = await db.getSpecificPcb(tuple[0].pcbpartid);
    const casePart = await db.getSpecificCase(tuple[0].casepartid);
    const switchPart = await db.getSpecificSwitch(tuple[0].switchpartid);
    const keyCapPart = await db.getSpecificKeycap(tuple[0].keycappartid);
    const cablePart = await db.getSpecificCable(tuple[0].cablepartid);
    console.log(pcbPart);
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify(convertDbToObject([pcbPart[0], casePart[0], switchPart[0], keyCapPart[0], cablePart[0]], pcbObject)));
    res.end();
}); 

function checkLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        // If we are authenticated, run the next route.
        next();
    } else {
        res.redirect('/login.html');
    }
}
// Deprecated functions
// Convert a pcb tuple obtained from a SQL table into an object with correctly named keys
function customerObject(object) {
    return { customer_id: object.customer_id, name: object.name, email: object.email, booking_id: object.booking_id, address_id: object.address_id, order_id: object.order_id,order_stat: object.order_stat,booking_stat: object.booking_stat};
}
function addressObject(object) {
    return { address_id: object.address_id, location: object.location};
}

function orderObject(object) {
    return { order_id: object.order_id, item_id: object.item_id , customer_id: object.customer_id, time:object.time, deliver:object.deliver};
}

function itemObject(object) {
    return { item_id: object.item_id, type: object.type , image: object.image, ingredients:object.ingredients, nameItem:object.name, price:object.price};
}

// These can be modified for more specific stuff, but they already do everything we need them to.
// A case of being more robust than needed.
function caseObject(object) {
    return { order_id_order: object.order_id, 
        items_id: object.item_id, 
        order_customer_id: object.customer_id, 
        time: object.time, 
        deliver: object.deliver_id };
}


function switchObject(object) {
    return { 
        item_id: object.item_id, 
        type:object.type,
        img:object.image,
        ingredients: object.ingredients, 
        name: object.name, 
        price: object.price };
}
function banquetObject(object) {
    return { 
        customer_id: object.customer_id, 
        booking_id:object.booking_id,
        hall_capacity:object.hall_capacity,
        time: object.time, 
        price: object.price };
}
function keyCapObject(object) {
    return { address_id:object.address_id,
    location: object.location,
item_id: object.item_id };
}
function itemsObject(object) {
    return { item_id:object.item_id,
    type: object.type,
image: object.image,
ingredients: object.ingredients,
name: object.name,
price: object.price };
}
function cableObject(object) {
    return { imgSource: object.image, imgDesc: 'placeholder text', name: object.partname, id: object.itemid, desc: object.partdescription, price: object.price };
}

// Convert all tuples in an sql table object into an array of objects with correct key names using the function f
// @param f: {} => {}
function convertDbToObject(sqlObject, f) {
    return sqlObject.map(object => {
        return f(object);
    });
}
// Send an sql table in json form in a server response to a get request. Server response must be ended manually.
function writeDbObject(res, sqlObject, f) {
    res.writeHead(200, { 'Content-Type': 'text/json' });
    res.write(JSON.stringify(convertDbToObject(sqlObject, f), null, 2));
    // allow calling function to end response
}

// const x = {imgSource : "asdfoiwje.com", imgDesc : "picture of part", name : "name of part", id: unique id number, desc : "part description"}
app.get('/caseProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getOrder(build.order_id);
    writeDbObject(res, sqlObject, caseObject);
    res.end();
});
//customer object
app.get('/seeMenu', async (req, res) => {
    // writeBlob(res);
    const cus = await db.getItems();
    writeDbObject(res, cus, itemsObject);
    res.end();
});
app.get('/pcbProducts', async (req, res) => {
    // writeBlob(res);
    const cus = await db.getCus();
    writeDbObject(res, cus, customerObject);
    res.end();
});
app.get('/banquetInfo', async (req, res) => {
    // writeBlob(res);
    const cus = await db.getBanquets();
    writeDbObject(res, cus, banquetObject);
    res.end();
});
app.get('/keySwitchProducts', async (req, res) => {
    // writeBlob(res);
    // const sqlObject = await db.getSwitches();
    const sqlObject = await db.getItem(build.item_id);
    writeDbObject(res, sqlObject, switchObject);
    res.end();
});
app.get('/keyCapProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getLocation(build.item_id);
    writeDbObject(res, sqlObject, keyCapObject);
    res.end();
});
app.get('/cableProducts', async (req, res) => {
    // writeBlob(res);
    const sqlObject = await db.getCables();
    writeDbObject(res, sqlObject, cableObject);
    res.end();
});
app.get('/userInfo', (req, res) => {
    console.log("Trying to send: JSON response data");
    res.writeHead(200, { 'Content-Type': 'text/json' });
    const name = user.username;
    const date = "some day";
    const email = user.email;
    const phone = "111 2222 3333";
    res.write(JSON.stringify({ name: name,email: email}));
    res.end();
});


app.get('/',
    checkLoggedIn,
    (req, res) => {
        console.log("Checking login");
        res.send("Hello world");
    });

// Handle post data from the login.html form.
app.post('/login',
    passport.authenticate('local', {     // use username/password authentication
        'successRedirect': '/profilePage.html',   // when we login, go to /private 
        'failureRedirect': '/login.html'      // otherwise, back to login
    }));

// Handle the URL /login (just output the login.html file).
app.get('/login',
    (req, res) => res.sendFile('client/login.html', { 'root': __dirname }));

// Handle logging out (takes us back to the login page).
app.get('/logout', (req, res) => {
    req.logout(); // Logs us out!
    res.redirect('/login.html'); // back to login
});


app.post('/register', (req, res) => {
    const email = req.body['email'];
    const username = req.body['username'];
    const ret = mc.hash(req.body['password']);

    if (db.addUser(email, username, 234, ret[1], ret[0])) {
        res.redirect('/login.html');
    } else {
        res.redirect('/register.html');
    }
});
app.post('/addMenu', (req, res) => {
    const item_id = req.body['itemId'];
    const type = req.body['type'];
    const imageLink = req.body['imageLink'];
    const ingredients = req.body['ingredients'];
    const name = req.body['name'];
        const price = req.body['price'];


    if (db.addMenu(item_id, type, imageLink, ingredients, name,price)) {
        res.redirect('/menu.html');
    } else {
        res.redirect('/addMenu.html');
    }
});

// Register URL
app.get('/register',
    (req, res) => res.sendFile('client/register.html',
        { 'root': __dirname }));


// Start the server
app.listen(port, () => {
    console.log('Server listening on port:', port);
});