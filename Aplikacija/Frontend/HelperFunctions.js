import { HomePageApi } from "./Api/HomePageApi.js";
import { ClientPageApi } from "./Api/ClientPageApi.js";

export class Helpers
{
    constructor()
    {
        this.HomePageApi = new HomePageApi();
        // this.ClientPageApi = new ClientPageApi();
    }
    //main window 
    CreateMainWindow()
    {
        let glavniProzor = document.createElement("div");
        glavniProzor.className = "mainWindow";
        document.body.appendChild(glavniProzor);
        return glavniProzor;
    }
    
    //gymPicker
    async CreateGymPicker(kontejner,evFunc)
    {
        
        //creating drop-down list 
        let gymList = document.createElement("select")
        gymList.classList.add("gymListSelect");
        gymList.classList.add("slova");
        
        //calling api for all gyms 
        let gyms = await this.HomePageApi.GetAllGyms();

        //creating default option
        let option = document.createElement("option");
        option.value = "";
        option.innerText = "Izaberi teretanu..";
        option.classList.add("slova");
        gymList.appendChild(option);

        //actual gym options 
        for (let i = 0; i < gyms.length; i++)
        {
            let option = document.createElement("option");
            option.value = gyms[i].gymID;
            option.innerText = gyms[i].naziv;
            option.classList.add("slova");
            gymList.appendChild(option);

            
        }   
        gymList.addEventListener('change',async () => {await evFunc();})
        kontejner.appendChild(gymList);
    }
    //input
    CreateInput(specificInput,type,kontejner)    
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

        kontejner.appendChild(div);
        // this.kontejner.appendChild(kontejner);   
    }

    CreateRadioButton(kontejner)
    {
        
        let div = document.createElement("div");
        div.className = "regDiv";
        kontejner.appendChild(div);

        // //label, M F POL
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

    }

    CreateButton(innerWord, kontejner)
    {
        //div
        let div = document.createElement("div");
        div.classList.add("regDiv");

        // //button 
        let btn = document.createElement("button");
        btn.classList.add("regLogBtn");
        btn.classList.add("slova");
        btn.innerHTML = innerWord;
        div.appendChild(btn);
        kontejner.appendChild(div);
        

    }
    
    ValidateString(word)
    {
        if(word === "") return false;
        if(word == undefined) return false;
        if(word == null) return false;

        return true;
    }
}