import { Helpers } from "../HelperFunctions.js";
import { GymForm } from "../HomePage/gymPicForm.js";

export class RegisterForm
{
    constructor()
    {
        this.kontejner = document.createElement("div");
        let mainWindow = document.querySelector(".mainWindow");
        mainWindow.appendChild(this.kontejner);
    }

    DrawForm()
    {
        //adding name input 
        this.CreateInput("Ime","text");
        //adding surname input 
        this.CreateInput("Prezime","text");
        //adding sex radio button input 
        this.CreateRadioButton();
        //adding gym picker 
        this.CreateGymPicker();
        //adding username input 
        this.CreateInput("Username","text");
        //adding password input 
        this.CreateInput("Password","password");
        //adding cardNo input
        this.CreateInput("Broj kartice", "number");
        //adding Register button
        this.CreateRegisterButton();
    }

    CreateInput(specificInput, type)
    {
        //div
        let div = document.createElement("div");
        div.classList.add("regDiv");
        
        this.kontejner.appendChild(div);
        Helpers.CreateInput(specificInput,type,div);
        
    }

    CreateGymPicker()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");

        //label
        let label = document.createElement("label");
        label.classList.add("slova");
        label.innerHTML = "Teretana:";
        div.appendChild(label);
        
        //gymPicker from GymForm
        Helpers.CreateGymPicker(div);
        
        //appending
        this.kontejner.appendChild(div);
    }

    CreateRadioButton()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");

        Helpers.CreateRadioButton(div);

        this.kontejner.appendChild(div);
        
        
    }

    CreateRegisterButton()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");
        
        Helpers.CreateButton("Registruj se",div);

        

        //appending
        // div.appendChild(regBtn);
        this.kontejner.appendChild(div);
        
    }
}