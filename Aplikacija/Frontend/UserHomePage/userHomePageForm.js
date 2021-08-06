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
        let api = new ClientPageApi();
        let helper = new Helpers();
        if(await api.ObrisiSveTermine(helper.ExtractIDFromCookie("id"))) {
          //clear list 
          let tabela = document.querySelector(".tBodyTraining");
          let redovi = tabela.querySelectorAll("tr");
          for (let red of redovi) {
            red.remove();
          }
          btnObrisiSve.style.display = "none";
        }
          
      })    
    }
    
  async InsertDataFromDB() {
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
      document.querySelector(".obrisiSveBtn").style.display = "none";
      return;
    }
    if (termini.length == 0) {
      document.querySelector(".obrisiSveBtn").style.display = "none";
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
            let helper = new Helpers();
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
     document.querySelector(".obrisiSveBtn").style.display = "block";
  }

  CreateLegendu(kontejner) {
    //upustvo za citanje tabele termina
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
      divCircle.style.backgroundColor = colors[i];

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
      await change(false,null,"<",this.OsveziPrikazTermina);
      
    });
    
    dugmeNext.addEventListener("click", async () => {
      await change(false,null,">",this.OsveziPrikazTermina);
    });
    
    datumPicker.addEventListener('change', async () => {
      await change(true,datumPicker,"",this.OsveziPrikazTermina)
    })
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
      await func(gym, dtpEl.value);
      
    }
    
    divDatum.appendChild(dugmePrevious);
    divDatum.appendChild(datumPicker);
    divDatum.appendChild(dugmeNext);

    //adding terms
    await this.AddTermine(kontejner);
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
      allInPast();
      return;
    }

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
          termini.style.backgroundColor = COLORS.Zuta;
          let btn = (termin.querySelector(".zakaziBtn").style.display = "none");

          pocetak++;
        }
      }
    }

    function allInPast() {
      //koristi se da oznaci sve termine iz proslosti u sivo
      let sviTermini = document.getElementsByClassName("terminDiv");
      for (let termin of sviTermini) {
        termin.style.backgroundColor = COLORS.Siva;
        let btn = (termin.querySelector(".zakaziBtn").style.display = "none");
      }
    }
    function freeOrNot(terminDiv, termini) {
      //provera da li se termin koji sada sledi kroz iteraciju
      //nalazi u ovim slobodnim terminima

      //izvlacim sati iz labele
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
        terminDiv.style.backgroundColor = COLORS.Teget;
        let zakaziDugme = terminDiv.querySelector(".zakaziBtn");
        zakaziDugme.style.display = "block";
      } else {
        terminDiv.style.backgroundColor = COLORS.Zuta;
        let btn = (termin.querySelector(".zakaziBtn").style.display = "none");

      }
    }
    function danasnjiTermini(termini, isPresent, gym) {
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
              terminDiv.style.backgroundColor = COLORS.Siva;
              let btn = (terminDiv.querySelector(".zakaziBtn").style.display =
                "none");
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
            termin.style.backgroundColor = COLORS.Siva;
            let btn = (termin.querySelector(".zakaziBtn").style.display =
              "none");
          } else {
            termin.style.backgroundColor = COLORS.Zuta;
            let btn = (termin.querySelector(".zakaziBtn").style.display = "none");

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
      zakaziBtn.style.display = "none";
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
            let btn = divParent.querySelector(".zakaziBtn").style.display = "none";

            api = new HomePageApi();
            let gym = await api.GetGym(gymid);
            let niz = gym.radnoVreme.split('-');
            let pocetak = +niz[0];
            let kraj = +niz[1];
            
            let divInd = +zakaziBtn.id;
            if(pocetak == divInd) {
              //prvi termin za taj dan nema prethodni, radimo samo next termin
              zabraniTermin(++divInd)
            } else if(--kraj == divInd) {
              //zadnji termin za taj dan nema sledeci, radimo samo prev termin
              zabraniTermin(--divInd);
            }
            else {
              divInd = +zakaziBtn.id;
              zabraniTermin(++divInd);
              divInd = +zakaziBtn.id;
              zabraniTermin(--divInd);
            }

            function zabraniTermin(indeks) {
              let restrictDiv = document.getElementById(`${indeks}`).parentElement;
              restrictDiv.style.backgroundColor = COLORS.Crvena;
              restrictDiv.querySelector(".zakaziBtn").style.display = "none";
            }
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
    await this.OsveziPrikazTermina(gym, danas);
  }
}
