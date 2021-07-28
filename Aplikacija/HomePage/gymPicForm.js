import { Helpers } from "../HelperFunctions.js";

export class GymForm
{
    
    constructor()
    {
        
        this.kontejner = document.createElement("div");
        this.kontejner.classList.add("leftDiv");

        let mainWindow = document.querySelector(".mainWindow");
        mainWindow.appendChild(this.kontejner);

    }
    
    
    CreateThreeDivs() //heading, chooseGym and gymPic divs
    {
        let classNames = ["headingDiv", "chooseGymDiv", "gymPicDiv"];
        
        for(let i = 0; i < 3; i++)
        {
            let tmpDiv = document.createElement("div");
            tmpDiv.classList.add(classNames[i]);
            
            this.kontejner.appendChild(tmpDiv);
        }
    }
    
    CreateHeading()
    {
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
    }
    
    CreateGymText(kontejner)
    {
        //first creating text
        let paragraph = document.createElement("p");
        paragraph.classList.add("gymParagraph");
        paragraph.classList.add("slova");
        paragraph.textContent = "Teretane u kojima mozete da trenirate: ";
        
        let chooseGymDiv = document.querySelector(".chooseGymDiv");
        kontejner.appendChild(paragraph);
        

    }

    CreateGymPicker(kontejner)
    {
        Helpers.CreateGymPicker(kontejner);
    }
    
    CreateGymGallery()
    {
        //first creating 3 divs for 3 elements: two buttons and an image
        let divPrev,divNext,divImg;
        divPrev = document.createElement("div");
        divNext = document.createElement("div");
        divImg = document.createElement("div");
        
        //creting buttons and image elements
        let btnPrevious = document.createElement("button");
        btnPrevious.innerHTML = "<";
        btnPrevious.classList.add("btnForPic");
        
        let btnNext =  document.createElement("button");
        btnNext.innerHTML = ">";
        btnNext.classList.add("btnForPic");
        
        let img = document.createElement("img");
        img.src = "../Resource/logoWithName.png";
        img.classList.add("gymPic");
        
        //apending..
        divPrev.appendChild(btnPrevious);
        divImg.appendChild(img);
        divNext.appendChild(btnNext);
        
        let gymPicDiv = document.querySelector(".gymPicDiv");
        gymPicDiv.appendChild(divPrev);
        gymPicDiv.appendChild(divImg);
        gymPicDiv.appendChild(divNext);
    }

    CreateWorkingHours()
    {
        //adding working hours in chooseGymDiv
        let div = document.querySelector(".chooseGymDiv");
        let div2 = document.createElement("div");
        div2.className = "radnoVremeDiv";
        div.appendChild(div2);

        //adding label with working hours
        let workingHoursPar = document.createElement("p");
        workingHoursPar.classList.add("workingHourPar");
        workingHoursPar.classList.add("slova");
        workingHoursPar.innerHTML = `Radno vreme teretane: 6-22h`; //ovde ide chosenGym.RadnoVreme
        
        div2.appendChild(workingHoursPar);
    }

    DrawForm()
    {
        //creating three divs for three parts
        this.CreateThreeDivs();
        //puting text inside heading div
        this.CreateHeading();

        let div = document.createElement("div");
        div.classList.add("chooseGymDiv2");
        let chooseGym = document.querySelector(".chooseGymDiv");
        chooseGym.appendChild(div);
        //adding text left from the gym picker
        this.CreateGymText(div);
        //adding gym picker
        this.CreateGymPicker(div);
        //adding gym gallery
        this.CreateGymGallery();
        //adding working hours 
        this.CreateWorkingHours();

        
    }
}



