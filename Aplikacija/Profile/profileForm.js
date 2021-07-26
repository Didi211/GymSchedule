import { Helpers } from "../HelperFunctions.js";

export class ProfileForm
{
    constructor()
    {
        this.kontejner = document.querySelector(".mainWindow");
        this.putanja = "../../Resource/";
    }

    DrawForm()
    {
        //forming a grid panel 
        /* u 1 i 1 idu edit i delete
        u sredini idu podaci o klijentu 
        u main window ubaciti tabelu sa 3 kolone odnos da bude 1 2 1 
        ubaciti dodatni div da se centrira slika i edit photo dugme
        a u tom divu postaviti nekako sliku na sredini i dugme 
        u gornjem desnom uglu 
        mozda div i za to*/
        
        //drawing a gird
        this.DrawTable();
        
        //adding icnos for edit and delete 
        this.AddIcons();

        //adding profile picture and edit icon for picture
        this.AddProfilePicture();
        
        
        //adding form from registration
        this.AddRestInformation();
        
        // //restricting changes
        // this.ReadOnlyData(false); --problem with disabling all controls 
          
    }

    DrawTable()
    {
        let tabela = document.createElement("table");
        tabela.classList.add("formTable");
        let tableBody = document.createElement("tbody");
        tableBody.classList.add("formTbody");

        this.kontejner.appendChild(tabela);
        tabela.appendChild(tableBody);

        let kolone = ["col1","col2","col3"];
        let redovi = ["row1", "row2", "row3"];

        for(let i = 0; i < 3; i++)
        {
            let red = document.createElement("tr");
            red.classList.add(redovi[i]);
            for (let j = 0; j < 3; j++)
            {
                //adding cells to the current row
                let cell = document.createElement("td");
                cell.classList.add(redovi[i]);
                cell.classList.add(kolone[j]);
                red.appendChild(cell);
            }
            tableBody.appendChild(red);
        }
    }

    AddIcons()
    {
        //edit and delete icon for acc
        let ikone = ["editIcon", "deleteIcon"];
        let positions = ["col1", "col3"];
        for (let i = 0; i < 2; i++)
        {
            let img = document.createElement("img");
            img.src = `${this.putanja}${ikone[i]}.png`;
            img.className = "icon";

            let pozicija = document.querySelector(`.row1 .${positions[i]}`);
            pozicija.appendChild(img);
        }
    }

    AddProfilePicture()
    {
        let pozicija = document.querySelector(".row1 .col2");
        let div = document.createElement("div");
        div.className = "profileDiv";

        pozicija.appendChild(div);

        let profilePicture = document.createElement("img");
        profilePicture.className = "profilePicture";
        //ovde treba da se zove api koji povlaci sliku iz baze
        //ili se u objektu korisnik zapamti putanja pored ostalih 
        //podataka (usteda na pozivima)
        //i ovde samo iskoristi taj link
        profilePicture.src = `${this.putanja}profile.jpg`;

        let editIcon = document.createElement("img");
        editIcon.src = `${this.putanja}editIcon.png`;
        editIcon.className = "editPicIcon";
        div.appendChild(profilePicture);
        div.appendChild(editIcon);
    }

    AddRestInformation()
    {
        let pozicija = document.querySelector(".row2 .col2");

        Helpers.CreateInput("Ime", "text", pozicija);
        Helpers.CreateInput("Prezime", "text", pozicija);
        Helpers.CreateRadioButton(pozicija);

        //for gym picker i need label 
        let label = document.createElement("label");
        label.classList.add("slova");
        label.innerHTML = "Teretana:";

        let gymPickerDiv = document.createElement("div");
        gymPickerDiv.classList.add("regDiv");
        gymPickerDiv.appendChild(label);
        pozicija.appendChild(gymPickerDiv);

        Helpers.CreateGymPicker(gymPickerDiv);
        Helpers.CreateInput("Username", "text",pozicija);
        Helpers.CreateInput("Password", "password",pozicija);
        Helpers.CreateInput("Broj kartice", "number",pozicija);
        
        //button goes in 3rd row
        pozicija = document.querySelector(".row3 .col2");

        Helpers.CreateButton("Sacuvaj izmene",pozicija);
        



    }

    // ReadOnlyData(isReadOnly)
    // {
    //     let inputs = document.querySelectorAll(".regInputs");
    //     let radioBtns = document.querySelectorAll(".polRadioBtn");
    //     let gymPicker = document.querySelector(".gymListSelect");
        
    //     inputs.forEach(input => 
    //         {
    //             input.setAttribute('readonly',isReadOnly);   
    //         })
        
    //     radioBtns.forEach(btn => 
    //         {
    //             btn.setAttribute('readonly',isReadOnly);
    //         })
    //     gymPicker.setAttribute('readonly',isReadOnly);

    //     let button = document.querySelector(".regLogBtn");
    //     if(isReadOnly)
    //         button.setAttribute('disabled',"disabled");
    //     else
    //         button.removeAttribute('disabled');
    // }

}