

// Function to list all "" parts in table
async function listParts(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];

    for (const part of partsData) {

        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";

        // part body
        const body = document.createElement('div');
        body.className = "card-body";

        // part name
        const name = document.createElement('h5');
        name.className = "card-title";
        name.innerText = part.name;

        // part price
        const order_id = document.createElement('h5');
        order_id.className = "card-subtitle mb-2";
        order_id.innerText = "Order id: ".concat(part.order_id);

        // part id
        const id = document.createElement('h6');
        id.className = "card-subtitle mb-2 text-muted";
        id.innerText = "Customer ID: ".concat(part.customer_id);

        const order_stat = document.createElement('h6');
        order_stat.className = "card-subtitle mb-2 text-muted";
        order_stat.innerText = "Order type: ".concat(part.order_stat);

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-dark addToBuild";
        button.customer_id = part.customer_id.toString();
        button.order_stat = part.order_stat.toString()
        button.order_id = part.order_id.toString()
        button.innerText = "See more";

        // Append children to card body
        body.appendChild(name);
        body.appendChild(order_id);
        body.appendChild(id);
        body.appendChild(order_stat);
       
        body.appendChild(button);

        // Append img and card body to card div
        main.appendChild(body);

        //append card to product table div
        document.getElementById("product-table").appendChild(main);
    }
}
async function listOrder(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];
    for (const part of partsData) {
        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";
        // part body
        const body = document.createElement('div');
        body.className = "card-body";

        // part price
        const order_id = document.createElement('h5');
        order_id.className = "card-subtitle mb-2";
        order_id.innerText = "Order ID: ".concat(part.order_id_order);

        // part id
        const id = document.createElement('h6');
        id.className = "card-subtitle mb-2 text-muted";
        id.innerText = "Customer ID: ".concat(part.order_customer_id);

        const items_id = document.createElement('h6');
        items_id.className = "card-subtitle mb-2 text-muted";
        items_id.innerText = "Item ID: ".concat(part.items_id);

        const time = document.createElement('h6');
        time.className = "card-subtitle mb-2 text-muted";
        time.innerText = "Order type: ".concat(part.time);

        const deliver = document.createElement('h6');
        deliver.className = "card-subtitle mb-2 text-muted";
        deliver.innerText = "Deliver id: ".concat(part.deliver);

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-dark addToBuild";
        button.customer_id = part.order_customer_id;
        button.items_id = part.items_id;
        button.order_id = part.order_id_order
        button.time = part.time
        button.deliver_id = part.deliver
        button.order_stat = part.order_stat

        button.innerText = "See more";

        // Append children to card body
        body.appendChild(id);
        body.appendChild(order_id);
        body.appendChild(items_id);
        body.appendChild(time);
        body.appendChild(deliver);
       
        body.appendChild(button);

        // Append img and card body to card div
        main.appendChild(body);

        //append card to product table div
        document.getElementById("product-table").appendChild(main);
    }
}

async function listItem(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];
    for (const part of partsData) {
        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";

        const img = document.createElement('img');
        img.src = part.img;
        img.className = "card-img-top";
        img.alt = "food";
        img.style.height = '200px';
        img.style.width = '200px';
        // part body
        const body = document.createElement('div');
        body.className = "card-body";

         // part name
        const name = document.createElement('h5');
        name.className = "card-title";
        name.innerText = part.name; 

        // part id
        const id = document.createElement('h6');
        id.className = "card-subtitle mb-2 text-muted";
        id.innerText = "Item ID: ".concat(part.item_id);

        const type = document.createElement('h6');
        type.className = "card-subtitle mb-2 text-muted";
        type.innerText = "Type: ".concat(part.type);


        const ingredients = document.createElement('h6');
        ingredients.className = "card-subtitle mb-2 text-muted";
        ingredients.innerText = "Order type: ".concat(part.ingredients);

        const price = document.createElement('h6');
        price.className = "card-subtitle mb-2 text-muted";
        price.innerText = "Price: $".concat(part.price);

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-dark addToBuild";
        //button.customer_id = part.order_customer_id;
        button.item_id = part.item_id;
        button.type = part.type
        button.ingredients = part.ingredients
        button.nameItem = part.name
        button.price = part.price

        button.innerText = "See more";

        // Append children to card body
        body.appendChild(id);
        body.appendChild(type);
        body.appendChild(ingredients);
        body.appendChild(price);
        //body.appendChild(deliver);
       
        body.appendChild(button);

        // Append img and card body to card div
        main.appendChild(img);
        main.appendChild(body);

        //append card to product table div
        document.getElementById("product-table").appendChild(main);
    }
}
async function listAddress(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];
    for (const part of partsData) {
        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";

        // part body
        const body = document.createElement('div');
        body.className = "card-body";

         // part name
        const address_id = document.createElement('h5');
        address_id.className = "card-title";
        address_id.innerText = part.address_id; 

        // part id
        const location = document.createElement('h6');
        location.className = "card-subtitle mb-2 text-muted";
        location.innerText = "Location: ".concat(part.location);

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-dark addToBuild";
        //button.customer_id = part.order_customer_id;
        button.item_id = part.item_id;
        button.address_id = part.address_id
        button.location = part.location
    

        button.innerText = "See more";

        // Append children to card body
        body.appendChild(address_id);
        body.appendChild(location);
        
        //body.appendChild(deliver);
       
        body.appendChild(button);

        // Append img and card body to card div
        main.appendChild(img);
        main.appendChild(body);

        //append card to product table div
        document.getElementById("product-table").appendChild(main);
    }
}
async function listBanquets(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];
    for (const part of partsData) {
        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";

        // part body
        const body = document.createElement('div');
        body.className = "card-body";

         // part name
        const name = document.createElement('h5');
        name.className = "card-title";
        name.innerText = "Booking ID: ".concat(part.booking_id); 

        // part id
        const id = document.createElement('h6');
        id.className = "card-subtitle mb-2 text-muted";
        id.innerText = "Item ID: ".concat(part.customer_id);

        const hall_capacity = document.createElement('h6');
        hall_capacity.className = "card-subtitle mb-2 text-muted";
        hall_capacity.innerText = "Hall capacity: ".concat(part.hall_capacity);


        const time = document.createElement('h6');
        time.className = "card-subtitle mb-2 text-muted";
        time.innerText = "Time: ".concat(part.time);

        const price = document.createElement('h6');
        price.className = "card-subtitle mb-2 text-muted";
        price.innerText = "Price: $".concat(part.price);

        // "Add part to User's build" button
        const button = document.createElement('a');
        button.className = "btn btn-dark";
        //button.customer_id = part.order_customer_id;
        button.customer_id = part.customer_id;
        button.booking_id = part.booking_id
        button.hall_capacity = part.ingredients
        button.time = part.time
        button.price = part.price

        button.innerText = "See more";

        // Append children to card body
        body.appendChild(id);
        body.appendChild(hall_capacity);
        body.appendChild(time);
        body.appendChild(price);
        //body.appendChild(deliver);
       
        body.appendChild(button);

        // Append img and card body to card div
        main.appendChild(body);

        //append card to product table div
        document.getElementById("product-table").appendChild(main);
    }
}

async function pcbBack() {
    cleanTable();

    document.getElementById("pcbButton").disabled = false;
    document.getElementById("caseButton").disabled = true;
        document.getElementById("addressButton").disabled = true;

    const backButton = document.getElementById("backButton");
    backButton.style.visibility = "hidden";

    backButton.removeEventListener('click', pcbBack);

    //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>PCB</span> of your choice to proceed to cases.</b>";

    await listParts("./pcbProducts");
    await pcbButtons();
}

async function caseBack() {
    cleanTable();

    document.getElementById("caseButton").disabled = false;
    document.getElementById("ksButton").disabled = true;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', pcbBack);
    backButton.removeEventListener('click', caseBack);

    //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Case</span> of your choice to proceed to cases.</b>";

    await listParts("./caseProducts");
    await caseButtons();
}

async function ksBack() {
    cleanTable();

    //document.getElementById("kcButton").disabled = true;
    document.getElementById("ksButton").disabled = false;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', caseBack);
    backButton.removeEventListener('click', ksBack);

    //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keyswitch</span> of your choice to proceed to cases.</b>";

    await listParts("./keySwitchProducts");
    await ksButtons();
}

async function kcBack() {
    cleanTable();

    document.getElementById("cableButton").disabled = true;
    document.getElementById("kcButton").disabled = false;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', ksBack);
    backButton.removeEventListener('click', kcBack);

    //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keycap</span> of your choice to proceed to cases.</b>";

    await listParts("./keyCapProducts");
    await kcButtons();
}

async function cableBack() {
    cleanTable();

    document.getElementById("kcButton").disabled = true;
    document.getElementById("cableButton").disabled = false;
    const backButton = document.getElementById("backButton");

    backButton.addEventListener('click', kcBack);
    backButton.removeEventListener('click', cableBack);

    document.getElementById("partGroup").style.visibility = "visible";
    //document.getElementById("sortGroup").style.visibility = "visible";
    document.getElementById("buildButtons").style.visibility = "hidden";
    document.getElementById("rebuildButton").style.visibility = "hidden";
    document.getElementById("cbuildButton").style.visibility = "hidden";

    //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Cable</span> of your choice to proceed to cases.</b>";

    await listParts("./cableProducts");
    await cableButtons();
}

// Function to add eventlistener to all buttons on pcb page
async function pcbButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    //partType: 'pcb',
                    order_stat: btnArray[i].order_stat,
                    order_id: btnArray[i].order_id
                })
            });
            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("pcbButton").disabled = true;
            document.getElementById("caseButton").disabled = false;
            document.getElementById("backButton").style.visibility = "visible";
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.addEventListener('click', pcbBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Case</span> of your choice to proceed to cases.</b>";

            // List products and update buttons
            await listOrder("./caseProducts");
            await caseButtons();
        });
    }
}
 
// Function to add eventlistener to all buttons on case page
async function caseButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    item_id: btnArray[i].items_id
                })
            });
            cleanTable();

            // Hide/show correct tabs to display build progress
            document.getElementById("caseButton").disabled = true;
            document.getElementById("ksButton").disabled = false;
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.removeEventListener('click', pcbBack);
            backButton.addEventListener('click', caseBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keyswitch</span> of your choice to proceed to keycaps.</b>";

            // List products and update buttons
            await listItem("./keySwitchProducts");
            await ksButtons();
        });
    }
}

async function ksButtons() {
    const btnArray = document.getElementsByClassName("addToBuild");
    for (let i = 0; i < btnArray.length; i++) {
        btnArray[i].addEventListener('click', async () => {
            await fetch('/updateParts', {
                method: 'POST',
                body: JSON.stringify({
                    item_id: btnArray[i].item_id
                })
            });
            cleanTable();
            // Hide/show correct tabs to display build progress
            document.getElementById("ksButton").disabled = true;
            //document.getElementById("ksButton").disabled = false;
            const backButton = document.getElementById("backButton");

            // Back button function
            backButton.removeEventListener('click', caseBack);
            backButton.addEventListener('click', ksBack);

            document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Keyswitch</span> of your choice to proceed to keycaps.</b>";

            // List products and update buttons
            await listAddress("./keyCapProducts");
            //await ksButtons();
        });
    }
}

// Function to clear all parts in table
function cleanTable() {
    const parent = document.getElementById("product-table");

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


window.addEventListener("load", async function () {
if(document.getElementById("pcbButton")){
    document.getElementById("pcbButton").disabled = true;
    document.getElementById("caseButton").disabled = true;
    document.getElementById("ksButton").disabled = true;

     document.getElementById("partGroup").style.visibility = "hidden";
    document.getElementById("sortGroup").style.visibility = "hidden";
   // document.getElementById("rebuildButton").style.visibility = "hidden";
    //document.getElementById("cbuildButton").style.visibility = "hidden";
    document.getElementById("backButton").style.visibility = "hidden";

    // when Build button is first clicked list pcbs and remove button
    document.getElementById("beginButton").addEventListener('click', async () => {
        cleanTable();

        const button = document.getElementById("beginButton");
        button.parentNode.removeChild(button);

        document.getElementById("partGroup").style.visibility = "visible";
        //document.getElementById("sortGroup").style.visibility = "visible";

        document.getElementById("pcbButton").disabled = false;

        document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>PCB</span> of your choice to proceed to cases.</b>";

        await listParts("./pcbProducts");
        await pcbButtons();
        //await fetch('./removePart');
    });
    /* document.getElementById('cbuildButton').addEventListener('click', async () => {
        await fetch('/insertBuild');
    }); */

}
    else if(document.getElementById("banquetButtonView")){
    document.getElementById("banquetButtonView").disabled = true;

    document.getElementById("partGroup").style.visibility = "hidden";

    document.getElementById("beginButton1").addEventListener('click', async () => {
        cleanTable();

        const button = document.getElementById("beginButton1");
        button.parentNode.removeChild(button);

        //document.getElementById("sortGroup").style.visibility = "visible";

        document.getElementById("banquetButtonView").disabled = false;

        document.getElementById("userInstruction1").innerHTML = "<b>Select a <span id='partWord'>PCB</span> of your choice to proceed to cases.</b>";

        await listBanquets("./banquetInfo");
        await pcbButtons();
        //await fetch('./removePart');
    
    });
}
    // Add to build button
    

    // Logout button
    document.getElementById('logoutButton').addEventListener('click', async () => {
        await fetch('/logout');
    });
});
