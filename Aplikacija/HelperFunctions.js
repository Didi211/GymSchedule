export class Helpers
{
    //main window 
    static CreateMainWindow()
    {
        let glavniProzor = document.createElement("div");
        glavniProzor.className = "mainWindow";
        document.body.appendChild(glavniProzor);
        return glavniProzor;
    }

    //gymPicker
    static CreateGymPicker(kontejner)
    {

        //creating drop-down list 
        let gymList = document.createElement("select")
        gymList.classList.add("gymListSelect");
        gymList.classList.add("slova");
        
        /*treba da se doda event kada se izabere teretana
        da se ucitaju odredjene slike iz baze za tu teretanu*/
        
        //after that, inserting gyms as options for selection
        
        /*treba da pozovem api koji pokuplja listu teretana iz baze*/
        
        let teretane =  ["kangoo", "konzulat", "strongman"];
        for (let i = 0; i < 3; i++)
        {
            let option = document.createElement("option");
            option.value = teretane[i];
            option.innerText = teretane[i];
            option.classList.add("slova");
            gymList.appendChild(option);
        }   
        kontejner.appendChild(gymList);
    }
    //input
    static CreateInput(specificInput,type,kontejner)    
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
        kontejner.appendChild(label);
        kontejner.appendChild(input);
        // this.kontejner.appendChild(kontejner);   
    }

    static CreateRadioButton(kontejner)
    {
        

        // //label, M F POL
        let labelNames = ["Pol:", "M", "F"];
        for(let i = 0; i < 3; i++)
        {
            let label = document.createElement("label");
            label.classList.add("slova");
            label.innerHTML = labelNames[i];

            kontejner.appendChild(label);
            //radio buttons 
            if(i !== 0) // 0 for sex label, 1 and 2 for M and F
            {
                let rbtn = document.createElement("input");
                rbtn.type = "radio";
                rbtn.name = "polRadio"
                rbtn.classList.add("polRadioBtn");
                kontejner.appendChild(rbtn);
            }
        }

    }

    static CreateButton(innerWord, kontejner)
    {
        // //button 
        let btn = document.createElement("button");
        btn.classList.add("regLogBtn");
        btn.classList.add("slova");
        btn.innerHTML = innerWord;
        kontejner.appendChild(btn);
        
    }
}