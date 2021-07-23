
import * as Headers from  "./headers.js";
Headers.createHeader(); 

//creating main window of a page

let glavniProzor = document.createElement("div");
glavniProzor.className = "mainWindow";
document.body.appendChild(glavniProzor);

let divNajveci = document.createElement("div");
divNajveci.classList.add("divNajveci");

glavniProzor.appendChild(divNajveci);

//creating divs
let classNames = ["headingDiv", "chooseGymDiv", "gymPicDiv"];
for(let i = 0; i < 3; i++)
{
    let tmpDiv = document.createElement("div");
    tmpDiv.classList.add(classNames[i]);

    divNajveci.appendChild(tmpDiv);
}

let loginDiv = document.createElement("div");
loginDiv.classList.add("loginDiv");
glavniProzor.appendChild(loginDiv);

//creating heading 
let prvaRecenica = "Proverite i zakazite svoj trening";
let drugaRecenica = "unapred i trenirajte";
let trecaRecenica = "bez brige!";

let headingDiv = document.querySelector(".headingDiv");


let partOfHeading = document.createElement("h2");
partOfHeading.classList.add("slova");
partOfHeading.innerText = prvaRecenica;
headingDiv.appendChild(partOfHeading);

partOfHeading = document.createElement("h2");
partOfHeading.classList.add("slova");
partOfHeading.innerText = drugaRecenica;
headingDiv.appendChild(partOfHeading);

partOfHeading = document.createElement("h2");
partOfHeading.classList.add("slova");   
partOfHeading.innerText = trecaRecenica;
headingDiv.appendChild(partOfHeading);

//creating paragraph for choosing gym 
let paragraph = document.createElement("p");
paragraph.classList.add("gymParagraph");
paragraph.classList.add("slova")
paragraph.textContent = "Teretane u kojima mozete da trenirate: ";

let chooseGymDiv = document.querySelector(".chooseGymDiv");
chooseGymDiv.appendChild(paragraph);

//creating listBox 
let gymList = document.createElement("select");
gymList.classList.add("gymListSelect");
gymList.classList.add("slova");

/*ovde treba da pokupim listu teretana iz baze*/
// let teretane = api.getTeretane();
let teretane =  ["kangoo", "konzulat", "strongman"];
for (let i = 0; i < 3; i++)
{
    let option = document.createElement("option");
    option.value = teretane[i];
    option.innerText = teretane[i];
    option.classList.add("slova");
    gymList.appendChild(option);
}   
chooseGymDiv.appendChild(gymList);

//adding the images of a selected gym
/*1. check which gym is loaded
  2. make an image element for a picture
  3. load that picture from a database
  4. add two buttons for forwarding and backwarding through the gallery
  5. add events to those buttons
  6. integrate all with coresponding api*/