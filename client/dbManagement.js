
const pgp = require('pg-promise')({
    connect(client) {
        console.log('Connected to database:', client.connectionParameters.database);
    },

    disconnect(client) {
        console.log('Disconnected from database:', client.connectionParameters.database);
    }
});

const username = 'postgres';
const password = 'postgres';
const psqlURL = process.env.DATABASE_URL || `postgres://${username}:${password}@localhost/psiproject`;
const db = pgp(psqlURL);

console.log('Trying to find:', psqlURL);
async function connectAndRun(task) {
    let connection = null;

    try {
        connection = await db.connect();
        return await task(connection);
    } catch (e) {
        console.error('Error in handling SQL query');
        console.error(e);
        // throw e;
        return null;
    } finally {
        try {
            connection.done();
        } catch (ignored) {
            console.log(ignored);
        }
    }
}

// The next 5 functions are generic select * statements for each table in the database. TODO: Add tables for login and profile
async function getCus() {
    return await connectAndRun(db => db.any('SELECT * FROM customers;'));
}
async function getAddresses() {
    return await connectAndRun(db => db.any('SELECT * FROM addresses;'));
}
async function getItems() {
    return await connectAndRun(db => db.any('SELECT * FROM items;'));
}
async function getDeliver() {
    return await connectAndRun(db => db.any('SELECT * FROM delivery;'));
}
async function getOrders() {
    return await connectAndRun(db => db.any('SELECT * FROM orders;'));
}
async function getBanquets() {
    return await connectAndRun(db => db.any('SELECT * FROM banquets;'));
}
async function getLocation(item_id) {
    return await connectAndRun(db => db.any('SELECT * FROM addresses WHERE item_id=$1;', [item_id]));
}

async function getOrder(order_id) {
    return await connectAndRun(db => db.any('SELECT * FROM orders WHERE order_id=$1;', [order_id]));
}
async function getDelivery(deliver_id) {
    return await connectAndRun(db => db.any('SELECT * FROM delivery WHERE deliver_id=$1;', [deliver_id]));
}

async function getItem(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM items WHERE item_id=$1;', [itemID]));
}

async function getUser(itemID) {
    return await connectAndRun(db => db.any('SELECT * FROM customers WHERE item_id=$1;', [itemID]));
}

async function findUser(username) {

    const r = await connectAndRun(db => db.any('SELECT * FROM profiles where username=$1;', [username]));
    return r;
}

async function addUser(email, username, buildID, password, salt) {
    return await connectAndRun(db => db.any('INSERT INTO profiles (email, username, hashedpwd, salt) VALUES ($1, $2, $3, $4);', [email, username, password, salt]));
}

async function addMenu(item_id, type, image, name, price) {
    return await connectAndRun(db => db.any('INSERT INTO items (item_id, type, image, name,price) VALUES ($1, $2, $3, $4,$5);', [item_id, type, image, name,price]));
}

async function addBuild(buildID, pcbID, caseID, switchID, keycapID, cableID) {
    return await connectAndRun(db => db.any('INSERT INTO Builds VALUES ($1, $2, $3, $4, $5, $6);', [buildID, pcbID, caseID, switchID, keycapID, cableID]));
}
// Export functions
module.exports = {
    getCus: getCus,
    getAddresses: getAddresses,
    getItems: getItems,
        getItem: getItem,
    getBanquets:getBanquets,
    getDeliver: getDeliver,
    getOrders: getOrders,
    getLocation: getLocation,
    getOrder: getOrder,
    findUser: findUser,
    addUser: addUser,
    addBuild: addBuild,
    getDelivery: getDelivery,
    getUser:getUser,
    addMenu: addMenu
};