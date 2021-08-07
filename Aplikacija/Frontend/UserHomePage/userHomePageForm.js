import { ClientPageApi } from "../Api/ClientPageApi.js";
import { HomePageApi } from "../Api/HomePageApi.js";
import { COLORS } from "../boje.js";
import { Termin } from "../Classes/Termin.js";
import { Helpers } from "../HelperFunctions.js";

export class UserHomePageForm {
  constructor(user) {
    this.user = user;
    this.kontejner = document.querySelector(".mainWindow");
    this.putanja = "../../Resource/";
  }

  async DrawForm() {
    //drawing form
    let div = document.createElement("div");
    div.classList.add("gornjiDiv");
    this.kontejner.appendChild(div);

    //adding greeting and weekly quote
    await this.CreateGreeting(div);
    //adding list of scheduled trainings
    await this.CreateListOfTrainings(div);
    //adding legend for grid of training terms
    this.CreateLegendu(div);

    div = document.createElement("div");
    div.classList.add("donjiDiv");
    this.kontejner.appendChild(div);

    //adding grid of training terms
    await this.CreateZakaziTermine(div);

    //
  }
  async CreateGreeting(kontejner) {
    //zdravo + motivational quote
    //div
    let div = document.createElement("div");
    div.classList.add("greetingQuoteDiv");

    //heading for greeting
    let greetingHeader = document.createElement("h2");
    greetingHeader.classList.add("greetHeader");
    greetingHeader.innerText = `Zdravo ${this.user.ime}`; //${user.ime}`;

    //quote
    let quoteParagraph = document.createElement("p");
    quoteParagraph.classList.add("quotePar");
    let api = new ClientPageApi();
    let citat = await api.GetQuote();
    quoteParagraph.innerText = `${citat.content}\n-${citat.author}`; //povlaciti od nekud citate koje cu ja da ubacim

    //appending
    kontejner.appendChild(div);
    div.appendChild(greetingHeader);
    div.appendChild(quoteParagraph);
  }

  async CreateListOfTrainings(kontejner) {
    //list of pre-scehuduled trainings
    //creating table first
    this.AddTableOfTrainings(kontejner);
    //then inserting data from db
    await this.InsertDataFromDB();
  }

  AddTableOfTrainings(kontejner) {
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

    //button for deleting all terms at once 
    let btnObrisiSve = document.createElement("button");
    btnObrisiSve.classList.add("obrisiSveBtn");
    btnObrisiSve.innerText = "Obrisi sve";

    //table for list with delete button
    let tabela = document.createElement("table");
    tabela.classList.add("trainingTable");
    let tableBody = document.createElement("tbody");
    tableBody.className = "tBodyTraining";
    tabela.appendChild(tableBody);
    let tHeader = tabela.createTHead();
    let headRow = tHeader.insertRow(0);
    
    let kolone = ["Datum", "Vreme"];
    for (
      let i = 0;
      i < 3;
      i++ //tri kolone, datum, vreme, dugme za brisanje
      ) {
        if (i != 2) {
          let cell = headRow.insertCell(i);
          cell.innerHTML = kolone[i];
        }
        if (i == 2) {
          let cell = headRow.insertCell(i);
        }
      }
      
      //appending
      tableDiv.appendChild(tabela);
      tableDiv.appendChild(btnObrisiSve);
      div.appendChild(recenica);
      div.appendChild(tableDiv);
      kontejner.appendChild(div);

      
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
      })    
    }
    
  async InsertDataFromDB() {
    let helper = new Helpers();
      //termini iz baze za popunjavanje tabele zakazanih treninga
    let tabela = document.querySelector(".tBodyTraining");
    let redovi = tabela.querySelectorAll("tr");
    for (let red of redovi) {
      red.remove();
    }
    let api = new ClientPageApi();
    let termini = await api.GetSveTermine(this.user.id);
    //adding event for obrisiSveBtn
    if (termini == null) {
      helper.ShowHideButton(document.querySelector(".obrisiSveBtn"),false);
      return;
    }
    if (termini.length == 0) {
      helper.ShowHideButton(document.querySelector(".obrisiSveBtn"),false);
      return;
    }
    for (let i = 0; i < termini.length; i++) {
      //iteriram kroz termine
      let red = tabela.insertRow(i);
      let datumVreme = termini[i].datum.split(" ");
      let indColl = datumVreme[1].indexOf(":", 0); //to je vreme
      indColl = datumVreme[1].indexOf(":", indColl + 1); // posto je vreme 20:00:00 a meni treba 20:00

      datumVreme[1] = datumVreme[1].slice(0, indColl);
      for (let j = 0; j < 3; j++) {
        if (j != 2) {
          let cell = red.insertCell(j);
          cell.innerHTML = datumVreme[j];
          cell.classList.add(`cell-${j}`)
        } else {
          let cell = red.insertCell(j);
          let deleteBtn = document.createElement("button");
          deleteBtn.className = "deleteTrainingBtn";
          
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
          let slika = document.createElement("img");
          slika.className = "deleteSlika";
          slika.src = `${this.putanja}deleteIcon.png`; 
          deleteBtn.appendChild(slika);
          cell.appendChild(deleteBtn);
        }
      }

    }
    //showing delete button wher there are rows
    helper.ShowHideButton(document.querySelector(".obrisiSveBtn"),true);
  }

  CreateLegendu(kontejner) {
    //upustvo za citanje tabele termina
    //div
    let div = document.createElement("div");
    div.classList.add("legendaDiv");
    kontejner.appendChild(div);

    //heading
    let divHeader = document.createElement("div");
    divHeader.className = "divRow";
    div.appendChild(divHeader);
    let legendHeader = document.createElement("h2");
    legendHeader.classList.add("slova");
    legendHeader.classList.add("legendHeader");
    legendHeader.innerHTML = "Legenda (Upustvo za citanje termina)";
    divHeader.appendChild(legendHeader);
    //divs for every rule
    let colors = ["#7B7B7B", "#DAE90B", "#365C95", "#E90B0B", "#12E90B"];
    let upustva = [
      "Termin je prosao",
      "Nema mesta u terminu",
      "Slobodan termin",
      "Nije moguce rezervisati pre i posle zakaznog termina",
      "Termin uspesno zakazan",
    ];

    for (let i = 0; i < 5; i++) {
      let divRow = document.createElement("div");
      divRow.className = "divRow";
      let divCircle = document.createElement("div");
      divCircle.classList.add("divCircle");
      this.ObojiDiv(divCircle,colors[i]);

      let upustvoPar = document.createElement("p");
      upustvoPar.classList.add("upustvoPar");
      upustvoPar.innerHTML = upustva[i];

      divRow.appendChild(divCircle);
      divRow.appendChild(upustvoPar);
      div.appendChild(divRow);
    }
  }

  async CreateZakaziTermine(kontejner) {
    //header for zakazivanje treninga (dtp i dugmici )
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

    let helper = new Helpers();
    let todayDate = new Date();
    datumPicker.defaultValue = helper.DateInString(todayDate);
    datumPicker.value = datumPicker.defaultValue;
    
    //events for dtp and buttons
    dugmePrevious.addEventListener("click", async () => {
      await change(false,null,"<",this.OsveziPrikazTermina,this.ObojiDiv);
      
    });
    
    dugmeNext.addEventListener("click", async () => {
      await change(false,null,">",this.OsveziPrikazTermina,this.ObojiDiv);
    });
    
    datumPicker.addEventListener('change', async () => {
      await change(true,datumPicker,"",this.OsveziPrikazTermina,this.ObojiDiv)
    })

    async function change(isDtp,dtpEl,prevNextSign,func,obojiDivFunc) {
      
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
      //regularni prikaz termina za taj dan
      await func(gym, dtpEl.value,obojiDivFunc);
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
            obojiDivFunc(btnZakazi.parentElement,COLORS.Zelena);
            helper.ShowHideButton(btnZakazi,false);
            //zabrani okolne termine
            helper.ZabraniSusedneTermine(btnZakazi,gym); 


          }
        }
      }
      let terminiRows = document.querySelector(".tBodyTraining").chi;
      
      
    }
    
    divDatum.appendChild(dugmePrevious);
    divDatum.appendChild(datumPicker);
    divDatum.appendChild(dugmeNext);

    //adding terms
    await this.AddTermine(kontejner,this.ObojiDiv);
  }

  async OsveziPrikazTermina(gym, datum,obojiDivFunc) {
    //refreshovanje tabele sa svim terminima
    //datum format yyyy-MM-dd
    //ovde se postavlja boja terminima i prikazuje dugme gde je moguce zakazti
    let api = new ClientPageApi();
    let helper = new Helpers();
    let todayDate = new Date();
    let today = helper.DateInString(todayDate);

    //sredjivanje promenljivih za datume
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
    let slobodniTermini;
    try {
      slobodniTermini = await api.GetSlobodneTermine(gym.gymID, datum);
    } catch (error) {
      alert(error);
      return;
    }

    if (slobodniTermini == null) {
      //datum iz proslosti
      allInPast(obojiDivFunc);
      return;
    }

    if (slobodniTermini.length == 0) {
      //ili je sve zauzeto danas ili u buducnosti  ili je datum iz proslosti
      //checking if datum iz proslosti
      if (dateParam.godina <= dateToday.godina) {
        if (dateParam.mesec <= dateToday.mesec) {
          if (dateParam.dan < dateToday.dan) {
            allInPast(obojiDivFunc); //datum iz proslosti, boji sve u sivo
          } else if (dateParam.dan == dateToday.dan) {
            //danasni je dan
            // //sve je zauzeto, jer je slobodniTermini.length == 0
            danasnjiTermini([], true, gym,obojiDivFunc);
          } else {
            //sve zauzeto za datum iz buducnosti
            allInFuture([], gym,obojiDivFunc);
          }
        } else {
          allInPast(obojiDivFunc);
        }
      } else {
        allInPast(obojiDivFunc);
      }
    } else {
      //ima nekih termina danas ili u buducnosti
      //checking if choosen date is in future or present
      if (dateParam.godina <= dateToday.godina) {
        if (dateParam.mesec <= dateToday.mesec) {
          if (dateParam.dan == dateToday.dan) {
            danasnjiTermini(slobodniTermini, true, gym, obojiDivFunc);
          } else {
            allInFuture(slobodniTermini, gym,obojiDivFunc);
          }
        } else {
          allInFuture(slobodniTermini, gym,obojiDivFunc);
        }
      } else {
        allInFuture(slobodniTermini, gym, obojiDivFunc);
      }
    }
    function allInFuture(termini, gym, obojiDivFunc) {
      //koristi se da oboji sve termine u buducnosti kao zauzete ili slobodne
      let sviTermini = document.getElementsByClassName("terminDiv");
      let radnoVreme = gym.radnoVreme.split("-");
      let pocetak = +radnoVreme[0];
      if (termini.length != 0) {
        //postoje slobodni termini
        for (let terminDiv of sviTermini) {
          //iteriram kroz sve divove
          freeOrNot(terminDiv, termini, obojiDivFunc);
          pocetak++;
        }
      } //svi termini  su zauzeti
      else {
        for (let termin of sviTermini) {
          obojiDivFunc(terminDiv,COLORS.Zuta);
          let helper = new Helpers();
          helper.ShowHideButton(terminterminDiv.querySelector(".zakaziBtn"),false);

          pocetak++;
        }
      }
    }

    function allInPast(obojiDivFunc) {
      //koristi se da oznaci sve termine iz proslosti u sivo
      let sviTermini = document.getElementsByClassName("terminDiv");
      for (let termin of sviTermini) {
        obojiDivFunc(termin,COLORS.Siva);
        let helper = new Helpers();
        helper.ShowHideButton(termin.querySelector(".zakaziBtn"),false);
      }
    }
    function freeOrNot(terminDiv, termini,obojiDivFunc) {
      //provera da li se termin koji sada sledi kroz iteraciju
      //nalazi u ovim slobodnim terminima

      //izvlacim sati iz labele

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
        obojiDivFunc(terminDiv,COLORS.Teget);
        let zakaziDugme = terminDiv.querySelector(".zakaziBtn");
        helper.ShowHideButton(zakaziDugme,true);
      } else {
        obojiDivFunc(terminDiv,COLORS.Zuta);
        helper.ShowHideButton(terminDiv.querySelector(".zakaziBtn"),false);

      }
    }
    function danasnjiTermini(termini, isPresent, gym,obojiDivFunc) {
      //koristi se da oboji termine za danas
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
              obojiDivFunc(terminDiv,COLORS.Siva);
              let btn = (terminDiv.querySelector(".zakaziBtn").style.display =
                "none");
            } else {
              freeOrNot(terminDiv, termini,obojiDivFunc);
            }
          } else {
            freeOrNot(terminDiv, termini, obojiDivFunc);
          }
          pocetak++;
        }
      } //svi termini za danas su zauzeti
      else {
        for (let termin of sviTermini) {
          if (pocetak <= trSati) {
            //termini u proslosti za taj dan
            obojiDivFunc(termin,COLORS.Siva);
            let btn = (termin.querySelector(".zakaziBtn").style.display =
              "none");
          } else {
            termin.style.backgroundColor = COLORS.Zuta;
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
  }
  async AddTermine(kontejner) {
    /*ovde se prave termini za izabranu teretanu iz cookie-ja (termini su isti
            samo mora da se izmeni da li moze da se zakaze termin i da se menja boja itd*/

    let api = new HomePageApi();
    let helper = new Helpers();

    let gymid = helper.ExtractIDFromCookie("gymID");
    //teretana
    let gym = await api.GetGym(gymid);

    //div
    let terminiDiv = document.createElement("div");
    terminiDiv.className = "sviTerminiDiv";
    kontejner.appendChild(terminiDiv);

    let rv = gym.radnoVreme.split("-");
    let pocetak = rv[0];
    let kraj = rv[1];
    for (
      let i = +pocetak;
      i < +kraj;
      i++ //creating termin div
    ) {
      let oneTerminDiv = document.createElement("div");
      oneTerminDiv.classList.add("terminDiv");

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

      //label for radnoVreme
      let radnoVremeLabela = document.createElement("label");
      radnoVremeLabela.classList.add("slova");
      radnoVremeLabela.classList.add("radnoVremeLbl");
      radnoVremeLabela.innerText = terminString;
      oneTerminDiv.appendChild(radnoVremeLabela);

      //zakaziDugme
      let zakaziBtn = document.createElement("button");
      zakaziBtn.innerText = "Zakazi trening";
      zakaziBtn.classList.add("zakaziBtn");
      zakaziBtn.classList.add("slova");
      zakaziBtn.id = i;
      helper.ShowHideButton(zakaziBtn,false);
      //adding event za zakazivanje termina
      zakaziBtn.addEventListener("click", async () => {
        let result = confirm(
          "Da li ste sigurni da zelite da zakazete trening?"
        );
        if (result) {
          let helper = new Helpers();
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

            

            divParent.style.backgroundColor = COLORS.Zelena;
            
            //promena boja susednim terminima jer nije moguce dva termina za redom 
            //pribavljanje radnoVremena iz baze
            helper.ShowHideButton(divParent.querySelector(".zakaziBtn"),false);

            api = new HomePageApi();
            let gym = await api.GetGym(gymid);
            helper.ZabraniSusedneTermine(zakaziBtn,gym);
            

            
          }
          //oboji termine

          //call refresh listu zakazanih termina 
        }
      });
      oneTerminDiv.appendChild(zakaziBtn);
      terminiDiv.appendChild(oneTerminDiv);
    }

    let todayDate = new Date();
    let danas = helper.DateInString(todayDate);
    await this.OsveziPrikazTermina(gym, danas,this.ObojiDiv);
  }

  ZabraniTermin(indeks) {
    let restrictDiv = document.getElementById(`${indeks}`).parentElement;
    if(restrictDiv.style.backgroundColor != COLORS.Siva 
        && restrictDiv.style.backgroundColor != COLORS.Zuta) {
      this.ObojiDiv(restrictDiv,COLORS.Crvena);
      let zakaziBtn = restrictDiv.querySelector(".zakaziBtn");
      let helper = new Helpers();
      helper.ShowHideButton(zakaziBtn,false);
    }
  }

  

  ObojiDiv(div,boja) {
    div.style.backgroundColor = boja;
  }
}
