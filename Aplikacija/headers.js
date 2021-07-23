/*Ovo moze da se kreira i kao funkcija sa metodama
Ali kada importujem fajl tamo gde mi treba vec se ponasa kao da je klasa 
Pa onda nema potrebe ni da bude ovo klasa */

 export function createHeader(){ 
     //creating elements
    let body = document.body;
    let header = document.createElement("header");
    let blueDiv = document.createElement("div");
    blueDiv.className = "blueDiv"

   
    //creating table for even placement
    let tabela = document.createElement("table");
    let tableBody = document.createElement("tbody");
    
    tabela.appendChild(tableBody);

    let red = document.createElement("tr");
    tableBody.appendChild(red);
    let celije = ["prvaCelija","drugaCelija","trecaCelija"];
    for( let i = 0; i < 3; i++)
    {
        let cell = document.createElement("td");
        cell.className = celije[i];
        red.appendChild(cell);
        
    }
    
    blueDiv.appendChild(tabela);

    //logo
    let logo = document.createElement("img");
    logo.classList.add("logo");
    // logo.classList.add("forPositioning");
    logo.src = "./Resource/logoWithName.png";

    //appending to DOM
    
    
    // red.headers[1].appendChild(logo);
    red.cells[1].appendChild(logo);
    header.appendChild(blueDiv);
    body.appendChild(header);
    
}

export function createRegisterHeader()
{
    // createHeader();
    createBackArrowButton();
}

export function createClientHeader()
{
    // createHeader();
    createProfileButton();
    createLogOutButton();
}

export function createProfileHeader()
{
    // createHeader();
    createBackArrowButton();
    createLogOutButton();
}

function createBackArrowButton()
{
    //kreira se u levom delu header-a 
    
    let prvaCelija = document.querySelector(".prvaCelija");
      
    //kreira se dugme za nazad
    let backArrowBtn = document.createElement("img");
    backArrowBtn.src = "./Resource/backarrowbutton.png";
    backArrowBtn.classList.add("backArrowBtn");

    prvaCelija.appendChild(backArrowBtn);

}

function createLogOutButton()
{
    //kreira se dugme za logout
    
    let trecaCelija = document.querySelector(".trecaCelija");

    //kreira se logout dugme
    let logOutBtn = document.createElement("img");
    logOutBtn.src = "./Resource/logout.png";
    logOutBtn.classList.add("logOutBtn");

    trecaCelija.appendChild(logOutBtn);
}

function createProfileButton()
{
    //kreira se dugme za moj profil

    let prvaCelija = document.querySelector(".prvaCelija");

    // let children = prvaCelija.childNodes;
    // prvaCelija.removeChildren(children);
    //creating profile button
    let profileBtn = document.createElement("img");
    profileBtn.src = "./Resource/profile.jpg";
    profileBtn.classList.add("profileBtn");

    prvaCelija.appendChild(profileBtn);
}