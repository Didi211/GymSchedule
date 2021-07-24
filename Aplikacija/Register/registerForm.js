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
        
        //label
        let label = document.createElement("label");
        label.classList.add("slova");
        label.innerHTML = specificInput + ":";
        
        //input
        let input = document.createElement("input");
        input.type = type;
        input.classList.add("slova");
        input.classList.add("regInputs");

        //appending 
        div.appendChild(label);
        div.appendChild(input);
        this.kontejner.appendChild(div);
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
        let gymPicker = new GymForm();
        gymPicker.CreateGymPicker(div)
        
        //appending
        this.kontejner.appendChild(div);
    }

    CreateRadioButton()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");

        //label, M F POL
        let labelNames = ["Pol:", "M", "F"];
        for(let i = 0; i < 3; i++)
        {
            let label = document.createElement("label");
            label.classList.add("slova");
            label.innerHTML = labelNames[i];

            div.appendChild(label);
            //radio buttons 
            if(i !== 0) // 0 for sex label, 1 and 2 for M and F
            {
                let rbtn = document.createElement("input");
                rbtn.type = "radio";
                rbtn.name = "polRadio"
                rbtn.classList.add("polRadioBtn");
                div.appendChild(rbtn);
            }
        }

        this.kontejner.appendChild(div);
        
        
    }

    CreateRegisterButton()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");
        
        //button 
        let regBtn = document.createElement("button");
        regBtn.classList.add("regBtn");
        regBtn.classList.add("slova");
        regBtn.innerHTML = "Registruj se";

        //appending
        div.appendChild(regBtn);
        this.kontejner.appendChild(div);
        
    }
}