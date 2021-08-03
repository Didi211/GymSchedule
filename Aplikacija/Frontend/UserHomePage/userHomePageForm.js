import { ClientPageApi } from "../Api/ClientPageApi.js";

export class UserHomePageForm
{
    constructor(user)
    {
        this.user = user;
        this.kontejner = document.querySelector(".mainWindow");
        this.putanja = "../../Resource/"
        this.COLORS = 
        {
            Siva : "#7B7B7B",
            Zuta : "#DAE90B",
            Teget : "#365C95",
            Crvena : "#E90B0B",
            Zelena : "#12E90B"
        }
    }

    async DrawForm()
    {
        let div = document.createElement("div");
        div.classList.add("gornjiDiv");
        this.kontejner.appendChild(div);

        //adding greeting and weekly quote
        await this.CreateGreeting(div);
        //adding list of scheduled trainings
        this.CreateListOfTrainings(div);
        //adding legend for grid of training terms 
        this.CreateLegendu(div);

        div = document.createElement("div");
        div.classList.add("donjiDiv");
        this.kontejner.appendChild(div);

        //adding grid of training terms
        this.CreateZakaziTermine(div);

        //
        


    }
    async CreateGreeting(kontejner)
    {
        
        //div
        let div = document.createElement("div");
        div.classList.add("greetingQuoteDiv");
        
        //heading for greeting 
        let greetingHeader = document.createElement("h2");
        greetingHeader.classList.add("greetHeader");
        greetingHeader.innerText = `Zdravo ${this.user.ime}`;//${user.ime}`;
        
        //quote 
        let quoteParagraph = document.createElement("p");
        quoteParagraph.classList.add("quotePar");
        let api = new ClientPageApi();
        let citat = await api.GetQuote();
        quoteParagraph.innerText = `${citat.content}\n-${citat.author}`;//povlaciti od nekud citate koje cu ja da ubacim
        
        //appending 
        kontejner.appendChild(div);
        div.appendChild(greetingHeader);
        div.appendChild(quoteParagraph);
    }

    CreateListOfTrainings(kontejner)
    {
        //creating table first
        this.AddTableOfTrainings(kontejner);
        //then inserting data from db 
        this.InsertDataFromDB();
    }

    AddTableOfTrainings(kontejner)
    {
        
        //div 
        let div = document.createElement("div");
        div.classList.add("trainingDiv");
    
        //paragraph
        let recenica = document.createElement("p");
        recenica.classList.add("trainingPar");
        recenica.innerHTML = "Lista zakazanih treninga";
    
        //div for table 
        let tableDiv = document.createElement("div");
        tableDiv.classList.add("tableDiv");
        div.appendChild(tableDiv);
    
        //table for list with delete button
        let tabela = document.createElement("table");
        tabela.classList.add("trainingTable")
        let tableBody = document.createElement("tbody");
        tableBody.className = "tBodyTraining";
        tabela.appendChild(tableBody);
        let tHeader = tabela.createTHead();
        let headRow = tHeader.insertRow(0);
    
        let kolone = ["Datum","Vreme"];
        for (let i = 0; i < 3; i++ ) //tri kolone, datum, vreme, dugme za brisanje
        {
            if(i != 2)
            {
                let cell = headRow.insertCell(i);
                cell.innerHTML = kolone[i];
            }
            if(i == 2)
            {
                let cell = headRow.insertCell(i);
            } 
                
            
        }
    
        //appending 
        tableDiv.appendChild(tabela);
        div.appendChild(recenica);
        div.appendChild(tableDiv);
        kontejner.appendChild(div);
    }

    InsertDataFromDB()
    {
        //note: cells are not created, create them here, plus 3rd cell for delete button
        
        let tabela = document.querySelector(".tBodyTraining");
        let termin = ["27/8/2021","18:00"];
        let red = tabela.insertRow(0);
        for(let i = 0; i < 3; i++)
        {
            if(i != 2)
            {
                let cell = red.insertCell(i);
                cell.innerHTML = termin[i];
            }
            else 
            {
                console.log("deleteButton is being created")
                let cell = red.insertCell(i);
                let deleteBtn = document.createElement("button");
                deleteBtn.className = "deleteTrainingBtn";
                let slika = document.createElement("img");
                slika.className = "deleteSlika";
                slika.src = `${this.putanja}deleteIcon.png`;
                deleteBtn.appendChild(slika);
                cell.appendChild(deleteBtn);
                console.log("deleteBtn is created");
                
            }
        }
    }

    CreateLegendu(kontejner)
    {
        //div
        let div = document.createElement("div");
        div.classList.add("legendaDiv");
        kontejner.appendChild(div);

        //heading
        let legendHeader = document.createElement("h2");
        legendHeader.classList.add("slova");
        legendHeader.classList.add("legendHeader");
        legendHeader.innerHTML = "Legenda (Upustvo za citanje termina)";
        div.appendChild(legendHeader);
        //divs for every rule
        let colors = ["#7B7B7B", "#DAE90B","#365C95","#E90B0B","#12E90B"]
        let upustva = 
        [
            "Termin je prosao",
            "Nema mesta u terminu",
            "Slobodan termin",
            "Nije moguce rezervisati pre i posle zakaznog termina",
            "Termin uspesno zakazan"
        ]

        for (let i = 0; i < 5; i++)
        {
            let divRow = document.createElement("div");
            divRow.className = "divRow";
            let divCircle = document.createElement("div");
            divCircle.classList.add("divCircle");
            divCircle.style.backgroundColor = colors[i];

            let upustvoPar = document.createElement("p");
            upustvoPar.classList.add("upustvoPar");
            upustvoPar.innerHTML = upustva[i];

            divRow.appendChild(divCircle);
            divRow.appendChild(upustvoPar);
            div.appendChild(divRow);
        }
    }

    CreateZakaziTermine(kontejner)
    {
        //heading 
        let zakaziHeading = document.createElement("h2");
        zakaziHeading.classList.add("zakaziH1");
        zakaziHeading.innerHTML = "Zakazi trening";
        kontejner.appendChild(zakaziHeading);

        //datum plus dugmici za saltanje
        let divDatum = document.createElement("div");
        divDatum.classList.add("divDatum");
        kontejner.appendChild(divDatum);

        let dugmePrevious = document.createElement("button");
        dugmePrevious.innerHTML = "<";
        dugmePrevious.className = "datumBtn";

        let dugmeNext = document.createElement("button");
        dugmeNext.innerHTML = ">";
        dugmeNext.className = "datumBtn";

        let datumPicker = document.createElement("input");
        datumPicker.type = "date";
        datumPicker.className = "datumPicker";
        let today = new Date();
        let dan = today.getDate();
        if (dan < 10)
        {
            dan = "0" + dan;
        }
        let mesec = today.getMonth() + 1;
        if (mesec < 10)
        {
            mesec = "0" + mesec;
        }
        datumPicker.defaultValue = 
            `${today.getFullYear()}-${mesec}-${dan}`; 
        datumPicker.value = datumPicker.defaultValue;
        console.log(datumPicker.defaultValue);
        
        divDatum.appendChild(dugmePrevious);
        divDatum.appendChild(datumPicker);
        divDatum.appendChild(dugmeNext);

        //adding terms
        this.AddTermine(kontejner);

    }

    AddTermine(kontejner)
    {
        //ovde treba da se pokupe termini za datum koji je postavljen u 
        //dtp elementu, mozda ce ovde da se salje api
        //nacin prihvatanja podataka: 
        //za taj datum stignu svi datumi od prvog do zadnjeg i uz njega fleg
        //ima mesta ili nema mesta, ostalo moze da se sredi bez baze 
        //provera na bekendu da moze maks dva treninga na dan ili jedan 
        //proces iscrtavanja: vratice se x elemenata koji predstavljaju termine
        //i crtace se dinamicki i sa responsive dizajnom 

        //za sada samo staticki 

        //div 
        let terminiDiv = document.createElement("div");
        terminiDiv.className = "sviTerminiDiv";
        kontejner.appendChild(terminiDiv);

        //termini
        let startTermin = 6;
        for(let i =0 ;i < 24; i++)
        {
            let oneTerminDiv = document.createElement("div");
            oneTerminDiv.classList.add("terminDiv");
            let tmp = startTermin;
            let terminString;
            terminString = `0${startTermin} - 0${++tmp}`;
            startTermin++;
            oneTerminDiv.innerText = terminString;
            oneTerminDiv.style.backgroundColor = this.COLORS.Teget;
            console.log(oneTerminDiv.style.backgroundColor);
            terminiDiv.appendChild(oneTerminDiv);
        }

    }
}
