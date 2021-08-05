import { Helpers } from "../HelperFunctions.js";
import { GymForm } from "../HomePage/gymPicForm.js";
import { User } from "../Classes/User.js";
import { HomePageApi } from "../Api/HomePageApi.js";
export class RegisterForm
{
    constructor()
    {
        this.kontejner = document.createElement("div");
        let mainWindow = document.querySelector(".mainWindow");
        mainWindow.appendChild(this.kontejner);
        this.helper = new Helpers();
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
        this.helper.CreateInput(specificInput,type,div);
        
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
        function Nothing() { }
        this.helper.CreateGymPicker(div,Nothing);
        
        //appending
        this.kontejner.appendChild(div);
    }

    CreateRadioButton()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");

        this.helper.CreateRadioButton(div);

        this.kontejner.appendChild(div);
        
        
    }

    CreateRegisterButton()
    {
        //div 
        let div = document.createElement("div");
        div.classList.add("regDiv");
        
        this.helper.CreateButton("Registruj se",div, this.RegisterFunc);
        
        //appending
        // div.appendChild(regBtn);
        this.kontejner.appendChild(div);
        
    }

    
    async RegisterFunc()
    {
        //collecting data from controlls
        let inputs = document.querySelectorAll(".regEditInputs");
        let ime,prezime,pol,teretana,username,password,brKartice
        let niz = [ime,prezime,pol,teretana,username,password,brKartice];
        for(let i = 0; i< inputs.length; i++)
        {
            if(inputs[i].type == "radio")
            {
                if(inputs[i].checked != "") //nije M 
                {
                    pol = "M";
                }
                else
                {
                    pol = "F"; //nego je F
                }
                i++;
            }
            else
            {
                niz[i] = inputs[i].value;
            }
        }
        let usr =   new User(0,niz[0],niz[1],pol,niz[4],niz[5],niz[6],niz[7]);
        if(!usr.Validate())
        {
            alert("Validation failed.");
        }
        else
        {
            //calling api 
            let api = new HomePageApi();
            usr = await api.Register(usr);

            //ubaci id u cookies 
            const d = new Date();
            d.setTime(d.getTime() + (5*24*60*60*1000));
            let expires = "expires="+ d.toUTCString();
            //cookie for userID
            document.cookie = "id" + "=" + usr.id + ";" + expires + ";path=/";

            //cookie for gymID
            document.cookie = "gymID" + "=" + usr.gymid + ";" + expires + ";path=/";
            
            
            location = "../UserHomePage/userHomePage.html";
        }

        //

    }
}