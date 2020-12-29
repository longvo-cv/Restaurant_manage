

// Function to list all "" parts in table
async function listParts(fetchPath) {
    const partsRequest = await fetch(fetchPath);
    const partsData = partsRequest.ok ? await partsRequest.json() : [];

    for (const part of partsData) {

        // part div
        const main = document.createElement('div');
        main.className = "card mb-2";
        main.style.width = "100%";

        const img = document.createElement('img');
        img.src = part.image;
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

        // part price
        const price = document.createElement('h5');
        price.className = "card-subtitle mb-2";
        price.innerText = "Price: ".concat(part.price);

        const type = document.createElement('h5');
        type.className = "card-subtitle mb-2";
        type.innerText = "Food type: ".concat(part.type);

        // part id
        const ingredients = document.createElement('h6');
        ingredients.className = "card-subtitle mb-2 text-muted";
        ingredients.innerText = "Ingredients: ".concat(part.ingredients);

        const item_id = document.createElement('h6');
        item_id.className = "card-subtitle mb-2 text-muted";
        item_id.innerText = "Item_id: ".concat(part.item_id);

        // "Add part to User's build" button
        /* const button = document.createElement('a');
        button.className = "btn btn-dark addToBuild";
        button.customer_id = part.customer_id.toString();
        button.order_stat = part.order_stat.toString()
        button.order_id = part.order_id.toString()
        button.innerText = "See more"; */

        // Append children to card body
        body.appendChild(name);
        body.appendChild(price);
        body.appendChild(type);
        body.appendChild(ingredients);
        body.appendChild(item_id);
       
        //body.appendChild(button);

        // Append img and card body to card div
         main.appendChild(img);
        main.appendChild(body);

        //append card to product table div
        document.getElementById("actualMenu").appendChild(main);
    }
}




// Function to add eventlistener to all buttons on pcb page
/* async function pcbButtons() {
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

            //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>Case</span> of your choice to proceed to cases.</b>";

            // List products and update buttons
            await listOrder("./caseProducts");
            await caseButtons();
        });
    }
} */

// Function to clear all parts in table
function cleanTable() {
    const parent = document.getElementById("actualMenu");

    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


window.addEventListener("load", async function () {
    //document.getElementById("menuButton").disabled = false;
    //document.getElementById("viewButton").disabled = true;

    document.getElementById("partGroup").style.visibility = "visible";
    //document.getElementById("sortGroup").style.visibility = "hidden";
   // document.getElementById("rebuildButton").style.visibility = "hidden";
    //document.getElementById("cbuildButton").style.visibility = "hidden";
    //document.getElementById("backButton").style.visibility = "hidden";
    //cleanTable();

    await listParts("./seeMenu");

    // when Build button is first clicked list pcbs and remove button
    /* document.getElementById("viewButton").addEventListener('click', async () => {
        cleanTable();

        const button = document.getElementById("viewButton");
        button.parentNode.removeChild(button);

        document.getElementById("partGroup").style.visibility = "visible";
        //document.getElementById("sortGroup").style.visibility = "visible";

        document.getElementById("menuButton").disabled = false;

        //document.getElementById("userInstruction").innerHTML = "<b>Select a <span id='partWord'>PCB</span> of your choice to proceed to cases.</b>";

        await listParts("./seeMenu");
        //await pcbButtons();
        //await fetch('./removePart');
    }); */
    /* document.getElementById('cbuildButton').addEventListener('click', async () => {
        await fetch('/insertBuild');
    }); */


   

    // Add to build button
    

    // Logout button
    document.getElementById('logoutButton').addEventListener('click', async () => {
        await fetch('/logout');
    });
});
