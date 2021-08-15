import { ClientPageApi } from "../Api/ClientPageApi.js";
import { HomePageApi } from "../Api/HomePageApi.js";
import { COLORS } from "../boje.js";
import { Termin } from "../Classes/Termin.js";
import { Helpers } from "../HelperFunctions.js";
import { UserHelper } from "./UserHelper.js";

export class UserHomePageForm {
  constructor(user) {
    this.user = user;
    this.kontejner = document.querySelector(".mainWindow");
    this.putanja = "../../Resource/";
  }

  async DrawForm() {
    //drawing form
    //#region gornjiDiv  
    let div = document.createElement("div");
    div.classList.add("gornjiDiv");
    this.kontejner.appendChild(div);
    //#endregion gornjiDiv

    //adding greeting and weekly quote
    await this.CreateGreeting(div);
    //adding list of scheduled trainings
    await this.CreateListOfTrainings(div);
    //adding legend for grid of training terms
    this.CreateLegendu(div);

    //#region donjiDiv
    div = document.createElement("div");
    div.classList.add("donjiDiv");
    div.classList.add("haveBorder");
    this.kontejner.appendChild(div);
    //#endregion donjiDiv

    //adding grid of training terms
    await this.CreateZakaziTermine(div);

    //
  }

  //#region drawFormFunctions
  async CreateGreeting(kontejner) {
    //zdravo + motivational quote

    //#region greeting
    let div = document.createElement("div");
    div.classList.add("greetingQuoteDiv");
    div.classList.add("haveBorder");

    //heading for greeting
    let greetingHeader = document.createElement("h2");
    greetingHeader.classList.add("greetHeader");
    greetingHeader.classList.add("slova-smaller");
    greetingHeader.innerText = `Zdravo ${this.user.ime}`; //${user.ime}`;
    //#endregion greeting

    //#region quote
    let parFigure = document.createElement("figure");
    let quoteParagraph = document.createElement("blockquote");
    quoteParagraph.classList.add("quotePar");
    quoteParagraph.classList.add("slova-smaller");
    let api = new ClientPageApi();
    let citat = await api.GetQuote();
    if(citat == null) return;
    quoteParagraph.innerText = `${citat.content}`; 
    let quoteAuthor = document.createElement("figcaption");
    quoteAuthor.classList.add("slova-smaller");
    
    quoteAuthor.innerText = `-${citat.author}`;
    //#endregion quote

    //appending
    kontejner.appendChild(div);
    div.appendChild(greetingHeader);
    parFigure.appendChild(quoteParagraph);
    parFigure.appendChild(quoteAuthor);
    div.appendChild(parFigure);
  }
  async CreateListOfTrainings(kontejner) {
    //list of pre-scehuduled trainings
    //creating table first
    this.AddTableOfTrainings(kontejner);
    //then inserting data from db
    await this.InsertDataFromDB();
  }
  CreateLegendu(kontejner) {
    //upustvo za citanje tabele termina
    //#region legendaDiv
    let div = document.createElement("div");
    div.classList.add("legendaDiv");
    div.classList.add("haveBorder");
    kontejner.appendChild(div);
    //#endregion legendaDiv

    //#region legendaHeader
    let divHeader = document.createElement("div");
    divHeader.className = "divRow";
    div.appendChild(divHeader);
    let legendHeader = document.createElement("h2");
    legendHeader.classList.add("slova-smaller");
    legendHeader.classList.add("legendHeader");
    legendHeader.innerHTML = "Legenda (Upustvo za citanje termina)";
    divHeader.appendChild(legendHeader);

    //#endregion legendaHeader
    
    //#region upustva nad boje
    let upustva = [
      "Termin je prosao",
      "Nema mesta u terminu",
      "Slobodan termin",
      "Nije moguce rezervisati pre i posle zakaznog termina",
      "Termin uspesno zakazan",
    ];
    let boje = [
      "rgb(123, 123, 123)",
      "rgb(218, 233, 11)",
      "rgb(54, 92, 149)", 
      "rgb(233, 11, 11)",
       "rgb(18, 233, 11)",
    ]
    //#endregion upustva and boje 
    let divUpustva = document.createElement("div");
    divUpustva.classList.add("divUpustva");
    div.appendChild(divUpustva);
    //#region oneRule
    for (let i = 0; i < 5; i++) {
      let divRow = document.createElement("div");
      divRow.className = "divRow";
      let divCircle = document.createElement("div");
      divCircle.classList.add("divCircle");
      let userHelper = new UserHelper();
      
      userHelper.ObojiDiv(divCircle,boje[i]);

      let upustvoPar = document.createElement("p");
      upustvoPar.classList.add("upustvoPar");
      upustvoPar.classList.add("slova-smaller");
      upustvoPar.innerHTML = upustva[i];

      divRow.appendChild(divCircle);
      divRow.appendChild(upustvoPar);
      divUpustva.appendChild(divRow);
    }
    //#endregion oneRule
  }
  async CreateZakaziTermine(kontejner) {
    //header for zakazivanje treninga (dtp i dugmici )
    
    //#region zakaziHeader
    let zakaziHeading = document.createElement("h2");
    zakaziHeading.classList.add("zakaziH1");
    zakaziHeading.classList.add("slova-smaller");
    zakaziHeading.innerHTML = "Zakazi trening";
    kontejner.appendChild(zakaziHeading);
    //#endregion zakaziHeader

    //#region datumPicker&buttons
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
    //#endregion datumPicker&buttons

    let helper = new Helpers();
    let todayDate = new Date();
    datumPicker.defaultValue = helper.DateInString(todayDate);
    datumPicker.value = datumPicker.defaultValue;
    
    //#region datumPicker&buttons Events
    dugmePrevious.addEventListener("click", async () => {
      await change(false,null,"<",this.OsveziPrikazTermina);
      
    });
    
    dugmeNext.addEventListener("click", async () => {
      await change(false,null,">",this.OsveziPrikazTermina);
    });
    
    datumPicker.addEventListener('change', async () => {
      await change(true,datumPicker,"",this.OsveziPrikazTermina)
    })
    //#region changePrikazTermina
    async function change(isDtp,dtpEl,prevNextSign,func) {
      
      let api = new HomePageApi();
      let helper = new Helpers();
      let choosenDate;
      if(isDtp) {
        choosenDate = dtpEl.value;
      } else {
        //koristicu promenljivu iz parametara da ne pravim novu
        dtpEl = document.querySelector(".datumPicker");
        choosenDate = dtpEl.value;
        let tmpDate = new Date(choosenDate);
        let newDate;
        if(prevNextSign == ">") {
          newDate = new Date(+tmpDate + 1000 * 60 * 60 * 24);
          dtpEl.value = helper.DateInString(newDate);
        } else {
          newDate = new Date(+tmpDate - 1000 * 60 * 60 * 24);
          dtpEl.value = helper.DateInString(newDate);

        }
      }

      let gym = await api.GetGym(+helper.ExtractIDFromCookie("gymID"));
      if(gym == null) return;
      //regularni prikaz termina za taj dan
      await func(gym, dtpEl.value);
      //prikaz zakazanih termina tog usera za taj datum (ako nije iz proslosti) ako postoji + susedi u crveno 
      if(document.querySelector(".tBodyTraining").hasChildNodes) {
        
        
        let terminiRows = document.querySelector(".tBodyTraining").children;
        for(let oneTerminRow of terminiRows) { 
          let datumCell = oneTerminRow.querySelector(".cell-0");
          if(datumCell.innerText == dtpEl.value) { 
            //neki od termina u listi je iz dana koji je izabran da se prikaze u grid prikazu
            let vremeCell = oneTerminRow.querySelector(".cell-1");
            let btnID = vremeCell.innerText
              .substring(0,vremeCell.innerText.indexOf(":"));
            let btnZakazi = document.getElementById(+btnID);
            let userHelper = new UserHelper();
            userHelper.ObojiDiv(btnZakazi.parentElement,COLORS.Zelena);
            helper.ShowHideButton(btnZakazi,false);
            //zabrani okolne termine
            userHelper.ZabraniSusedneTermine(btnZakazi,gym); 


          }
        }
      }
      let terminiRows = document.querySelector(".tBodyTraining").chi;
      
      
    }
    //#endregion changePrikazTermina

    //#endregion datumPicker&buttons Events
    
    //appending
    divDatum.appendChild(dugmePrevious);
    divDatum.appendChild(datumPicker);
    divDatum.appendChild(dugmeNext);

    //adding terms
    await this.AddTermine(kontejner);

    //calling change function for loading this page 
    change(true,datumPicker,"",this.OsveziPrikazTermina);
  }
  //#endregion drawFormFunctions

  //#region AdditionalFunctions
  AddTableOfTrainings(kontejner) {

    //#region trainingDiv
    let div = document.createElement("div");
    div.classList.add("trainingDiv");
    div.classList.add("haveBorder");
    //#endregion trainingDiv

    //#region trainingParagraph
    let recenica = document.createElement("p");
    recenica.classList.add("trainingPar");
    recenica.classList.add("slova-smaller");
    recenica.innerHTML = "Lista zakazanih treninga";
    //#endregion trainingParagraph

    //#region tableDiv
    let tableDiv = document.createElement("div");
    tableDiv.classList.add("tableDiv");
    div.appendChild(tableDiv);
    //#endregion tableDiv

    //#region deleteAllButton
    let btnObrisiSve = document.createElement("button");
    btnObrisiSve.classList.add("obrisiSveBtn");
    btnObrisiSve.classList.add("slova-smaller");

    btnObrisiSve.innerText = "Obrisi sve";
    //#endregion deleteAllButton

    //#region trainingTable 
    let tabela = document.createElement("table");
    tabela.classList.add("trainingTable");
    let tableBody = document.createElement("tbody");
    tableBody.className = "tBodyTraining";
    tabela.appendChild(tableBody);
    let tHeader = tabela.createTHead();
    tHeader.classList.add("trainingTHead");
    let headRow = tHeader.insertRow(0);
    
    let kolone = ["Datum", "Vreme"];
    for (let i = 0; i < 3; i++ ) { 
      //tri kolone, datum, vreme, dugme za brisanje
        if (i != 2) {
          let cell = headRow.insertCell(i);
          cell.innerHTML = kolone[i];
        }
        if (i == 2) {
          let cell = headRow.insertCell(i);
        }
      }
      //#endregion trainingTable

    //#region appending
      tableDiv.appendChild(tabela);
      tableDiv.appendChild(btnObrisiSve);
      div.appendChild(recenica);
      div.appendChild(tableDiv);
      kontejner.appendChild(div);
      //#endregion appending

    //#region btnDeleteAllEvent
    btnObrisiSve.addEventListener('click', async () => {
      let result = confirm("Da li ste sigurni da zelite da otkazete sve zakazane treninge?");
      if(!result) { return; }
      let api = new ClientPageApi();
      let helper = new Helpers();
      if(await api.ObrisiSveTermine(helper.ExtractIDFromCookie("id"))) {
        //clear list 
        let tabela = document.querySelector(".tBodyTraining");
        let redovi = tabela.querySelectorAll("tr");
        for (let red of redovi) {
          red.remove();
        }
        helper.ShowHideButton(btnObrisiSve,false);
      }
      location.reload();
      return false;
    });
    //#endregion btnDeleteAllEvent
    
  }
    
  async InsertDataFromDB() {
    //termini iz baze za popunjavanje tabele zakazanih treninga
    let helper = new Helpers();
    let api = new ClientPageApi();
    //#region clearListuTreninga
    let tabela = document.querySelector(".tBodyTraining");
    let redovi = tabela.querySelectorAll("tr");
    for (let red of redovi) {
      red.remove();
    }
    //#endregion clearListuTreninga

    //#region TerminiObrada
    let termini = await api.GetSveTermine(this.user.id);
    if (termini == null) {
      helper.ShowHideButton(document.querySelector(".obrisiSveBtn"),false);
      return;
    }
    if (termini.length == 0) {
      helper.ShowHideButton(document.querySelector(".obrisiSveBtn"),false);
      return;
    }
    //#region terminiIteration

    for (let i = 0; i < termini.length; i++) {
      let red = tabela.insertRow(i);
      let datumVreme = termini[i].datum.split(" ");
      let indColl = datumVreme[1].indexOf(":", 0); //to je vreme
      indColl = datumVreme[1].indexOf(":", indColl + 1); // posto je vreme 20:00:00 a meni treba 20:00

      datumVreme[1] = datumVreme[1].slice(0, indColl);
      //#region rowPopulating
      for (let j = 0; j < 3; j++) {
        if (j != 2) {
          let cell = red.insertCell(j);
          cell.innerHTML = datumVreme[j];
          cell.classList.add(`cell-${j}`)
        } else {
          let cell = red.insertCell(j);
          let deleteBtn = document.createElement("button");
          deleteBtn.className = "deleteTrainingBtn";
          
          //#region deleteBtnEvent
          //adding event for btn 
          deleteBtn.addEventListener('click',async () => {
            let result = confirm("Da li ste sigurni da zelite da otkazete trening?");
            if(!result) return;
            let api = new ClientPageApi();
            let parentEl = deleteBtn.parentElement.parentElement;
            let childs =  parentEl.querySelectorAll("td[class*='cell-']");
            let datumString;
            datumString = childs[0].innerText;
            datumString+= ` ${childs[1].innerText}:00`;
            let id = helper.ExtractIDFromCookie("id");
            let gymid = helper.ExtractIDFromCookie("gymID");
            result = await api.DeleteTermin(new Termin(datumString,id,gymid));
            if(result) {
              alert("Trening uspesno otkazan.");
              this.InsertDataFromDB();
            }
            location.reload();
            return false;
          })
          //#endregion delteBtnEvent
          
          //#region deleteImage
          let slika = document.createElement("img");
          slika.className = "deleteSlika";
          slika.src = `${this.putanja}deleteIcon.png`; 
          deleteBtn.appendChild(slika);
          //#endregion deleteImage

          cell.appendChild(deleteBtn);
        }
        //#endregion rowPopulating
      }

    }
    //#endregion terminiIteration
    
    //#endregion TerminiObrada

    //showing delete button when there are rows
    helper.ShowHideButton(document.querySelector(".obrisiSveBtn"),true);
  }

  async OsveziPrikazTermina(gym, datum) {
    //refreshovanje tabele sa svim terminima
    //datum format yyyy-MM-dd
    //ovde se postavlja boja terminima i prikazuje dugme gde je moguce zakazti

    let api = new ClientPageApi();
    let helper = new Helpers();
    let todayDate = new Date();
    let today = helper.DateInString(todayDate);

    //sredjivanje promenljivih za datume
    //#region dateVariables
    let dateParam, dateToday;
    dateParam = new Object();
    dateParam.string = datum;

    dateToday = new Object();
    dateToday.string = today;

    let niz = today.split("-");
    dateToday.godina = +niz[0];
    dateToday.mesec = +niz[1];
    dateToday.dan = +niz[2];
    niz = datum.split("-");
    dateParam.godina = +niz[0];
    dateParam.mesec = +niz[1];
    dateParam.dan = +niz[2];
    //#endregion dateVariables

    //#region getSlobodneTermine
    let slobodniTermini;
    try {
      slobodniTermini = await api.GetSlobodneTermine(gym.gymID, datum);
    } catch (error) {
      alert(error);
      return;
    }
    //#endregion getSlobodneTermine
    
    //#region obradaTermina

    //#region pastDate
    if (slobodniTermini == null) {
      //datum iz proslosti
      allInPast();
      return;
    }
    //#endregion pastDate

    //#region postojeSlobodniTermini
    if (slobodniTermini.length == 0) {
      //ili je sve zauzeto danas ili u buducnosti  ili je datum iz proslosti
      //checking if datum iz proslosti
      if (dateParam.godina <= dateToday.godina) {
        if (dateParam.mesec <= dateToday.mesec) {
          if (dateParam.dan < dateToday.dan) {
            allInPast(); //datum iz proslosti, boji sve u sivo
          } else if (dateParam.dan == dateToday.dan) {
            //danasni je dan
            // //sve je zauzeto, jer je slobodniTermini.length == 0
            danasnjiTermini([], true, gym);
          } else {
            //sve zauzeto za datum iz buducnosti
            allInFuture([], gym);
          }
        } else {
          allInPast();
        }
      } else {
        allInPast();
      }
    } else {
      //ima nekih termina danas ili u buducnosti
      //checking if choosen date is in future or present
      if (dateParam.godina <= dateToday.godina) {
        if (dateParam.mesec <= dateToday.mesec) {
          if (dateParam.dan == dateToday.dan) {
            danasnjiTermini(slobodniTermini, true, gym);
          } else {
            allInFuture(slobodniTermini, gym);
          }
        } else {
          allInFuture(slobodniTermini, gym);
        }
      } else {
        allInFuture(slobodniTermini, gym);
      }
    }
    //#endregion postojeSlobodniTermini
    
    //#endregion ObradaTermina
    
    //#region pomocneFunkcije
    
    function allInFuture(termini, gym) {
      //koristi se da oboji sve termine u buducnosti kao zauzete ili slobodne
      let sviTermini = document.getElementsByClassName("terminDiv");
      let radnoVreme = gym.radnoVreme.split("-");
      let pocetak = +radnoVreme[0];
      if (termini.length != 0) {
        //postoje slobodni termini
        for (let terminDiv of sviTermini) {
          //iteriram kroz sve divove
          freeOrNot(terminDiv, termini);
          pocetak++;
        }
      } //svi termini  su zauzeti
      else {
        for (let termin of sviTermini) {
          let userHelper = new UserHelper();
          userHelper.ObojiDiv(terminDiv,COLORS.Zuta);
          let helper = new Helpers();
          helper.ShowHideButton(terminterminDiv.querySelector(".zakaziBtn"),false);

          pocetak++;
        }
      }
    }

    function allInPast() {
      //koristi se da oznaci sve termine iz proslosti u sivo
      let sviTermini = document.getElementsByClassName("terminDiv");
      for (let termin of sviTermini) {
        let userHelper = new UserHelper();
        userHelper.ObojiDiv(termin,COLORS.Siva);
        let helper = new Helpers();
        helper.ShowHideButton(termin.querySelector(".zakaziBtn"),false);
      }
    }
    function freeOrNot(terminDiv, termini) {
      //provera da li se termin koji sada sledi kroz iteraciju
      //nalazi u ovim slobodnim terminima

      //izvlacim sati iz labele

      let userHelper = new UserHelper();
      let helper = new Helpers();

      let satiIzLabele = terminDiv
        .querySelector(".radnoVremeLbl")
        .innerText.split("-");
      satiIzLabele = satiIzLabele[0];

      let satiString, nadjeno;
      nadjeno = false;
      for (let i = 0; i < termini.length; i++) {
        //ter "2021-08-05 21:00:00"
        //izvlacim vreme iz termina

        satiString = ExtractSatiFromTermin(termini[i]);
        if (satiIzLabele == satiString) {
          nadjeno = true;
          break;
        }
      }

      if (nadjeno) {

        userHelper.ObojiDiv(terminDiv,COLORS.Teget);
        let zakaziDugme = terminDiv.querySelector(".zakaziBtn");
        helper.ShowHideButton(zakaziDugme,true);
      } else {
        userHelper.ObojiDiv(terminDiv,COLORS.Zuta);
        helper.ShowHideButton(terminDiv.querySelector(".zakaziBtn"),false);

      }
    }
    function danasnjiTermini(termini, isPresent, gym) {
      //koristi se da oboji termine za danas
      let userHelper = new UserHelper();

      let sviTermini = document.getElementsByClassName("terminDiv");
      let trSati = new Date().getHours();
      let radnoVreme = gym.radnoVreme.split("-");
      let pocetak = +radnoVreme[0];

      if (termini.length != 0) {
        //postoje slobodni termini
        for (let terminDiv of sviTermini) {
          //iteriram kroz sve divove
          if (isPresent) {
            if (pocetak <= trSati) {
              //termini u proslosti za taj dan
              userHelper.ObojiDiv(terminDiv,COLORS.Siva);
              let btn = terminDiv.querySelector(".zakaziBtn").style.display = "none";
            } else {
              freeOrNot(terminDiv, termini);
            }
          } else {
            freeOrNot(terminDiv, termini);
          }
          pocetak++;
        }
      } //svi termini za danas su zauzeti
      else {
        for (let termin of sviTermini) {
          if (pocetak <= trSati) {
            //termini u proslosti za taj dan
            userHelper.ObojiDiv(termin,COLORS.Siva);
            let btn = (termin.querySelector(".zakaziBtn").style.display =
              "none");
          } else {
            userHelper.ObojiDiv(termin,COLORS.Zuta);
            let helper = new Helpers();
            helper.ShowHideButton(termin.querySelector(".zakaziBtn"),false)

          }
          pocetak++;
        }
      }
    }
    function ExtractSatiFromTermin(termin) {
      //termin 2021-09-15 18:00:00
      let niz = termin.split(" ");
      let satiString = niz[1];
      let indexCollon = satiString.search(":");
      satiString = satiString.slice(0, indexCollon + 3);
      return satiString;
    }
    //#endregion pomocneFunkcije
  }
  
  async AddTermine(kontejner) {
    /*ovde se prave termini za izabranu teretanu iz cookie-ja (termini su isti
            samo mora da se izmeni da li moze da se zakaze termin i da se menja boja itd*/

    let api = new HomePageApi();
    let helper = new Helpers();

    let gymid = helper.ExtractIDFromCookie("gymID");
    //teretana
    let gym = await api.GetGym(gymid);
    if(gym == null) return;

    //#region creating SveTermine
    let terminiDiv = document.createElement("div");
    terminiDiv.className = "sviTerminiDiv";
    kontejner.appendChild(terminiDiv);

    let rv = gym.radnoVreme.split("-");
    let pocetak = rv[0];
    let kraj = rv[1];
    //#region createTermin In ForLoop
    for (let i = +pocetak; i < +kraj; i++ ) {
      //creating termin div
      let oneTerminDiv = document.createElement("div");
      oneTerminDiv.classList.add("terminDiv");

      //#region prikazTermina
      let tmp = i;
      let terminString;
      if (tmp + 1 < 10) {
        //i jednocifren i tmp jednocifren
        terminString = `0${i}:00-0${++tmp}:00`;
      } else if (i < 10) {
        terminString = `0${i}:00-${++tmp}:00`;
      } else if (tmp + 1 == 24) {
        terminString = `${i}:00-00:00`;
      } else {
        terminString = `${i}:00-${++tmp}:00`;
      }
      //#endregion prikazTermina

      //#region radnoVremeLabel
      let radnoVremeLabela = document.createElement("label");
      radnoVremeLabela.classList.add("slova-smaller");
      radnoVremeLabela.classList.add("radnoVremeLbl");
      radnoVremeLabela.innerText = terminString;
      oneTerminDiv.appendChild(radnoVremeLabela);
      //#endregion radnoVremeLabel

      //#region zakaziDugme
      let zakaziBtn = document.createElement("button");
      zakaziBtn.innerText = "Zakazi";
      zakaziBtn.classList.add("zakaziBtn");
      zakaziBtn.id = i;
      helper.ShowHideButton(zakaziBtn,false);

      //#region zakaziDugmeEvent
      zakaziBtn.addEventListener("click", async () => {
        let result = confirm(
          "Da li ste sigurni da zelite da zakazete trening?"
        );
        if (result) {
          let helper = new Helpers();
          let userHelper = new UserHelper();
          let api = new ClientPageApi();
          let datum, userid, gymid;
          let dtpEl = document.querySelector(".datumPicker");
          datum = dtpEl.value;
          //prikupljanje value iz labele odakle je kliknuto dugme
          if(zakaziBtn.id < 10) {
            datum+= ` 0${zakaziBtn.id}:00:00`;
          } else {
            datum += ` ${zakaziBtn.id}:00:00`;
          }
          userid = helper.ExtractIDFromCookie("id");
          gymid = helper.ExtractIDFromCookie("gymID");
          let termin = new Termin(datum, userid, gymid);
          let response = await api.ZakaziTermin(termin);
          if (response) {
            alert("Trening uspesno zakazan.");
            this.InsertDataFromDB();
            let divParent = zakaziBtn.parentElement;

            //change color of that div
            userHelper.ObojiDiv(divParent,COLORS.Zelena);
            
            //pribavljanje radnoVremena iz baze
            helper.ShowHideButton(divParent.querySelector(".zakaziBtn"),false);
            
            api = new HomePageApi();
            let gym = await api.GetGym(gymid);
            if(gym == null) return;
            
            //promena boja susednim terminima jer nije moguce dva termina za redom 
            userHelper.ZabraniSusedneTermine(zakaziBtn,gym);
            
          }

        }
      });
      //#endregion zakaziDugmeEvent
      
      //#endregion zakaziDugme
     
      oneTerminDiv.appendChild(zakaziBtn);
      terminiDiv.appendChild(oneTerminDiv);
    }
    //#endregion creatingTermin In ForLoop

    //#endregion creating SveTermine
    
    //refreshing prikaz svih termina 
    let todayDate = new Date();
    let danas = helper.DateInString(todayDate);
    await this.OsveziPrikazTermina(gym, danas);
  }
  //#endregion AdditionalFunctions
}
